import Container from "@mui/material/Container";
import { Button, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { TreeNodeComponent } from "./TreeNodeComponent";
import { uniq } from "lodash";
import {
  useSetRecoilState,
  useResetRecoilState,
  useRecoilCallback,
} from "recoil";
import { treeFamily } from "../store/data";

const getRandom = () => Math.ceil(Math.random() * 100);

export const App = () => {
  const [seed, setSeed] = useState(getRandom());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeed(getRandom());
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  const updateNode = useSetRecoilState(
    treeFamily("9edd73a1") // Inner Folder
  );

  const deleteNode = useResetRecoilState(
    treeFamily("492e3d14") // Control 1
  );
  const updateDeleteNodeParent = useSetRecoilState(
    treeFamily("d2d61080") // Module Folder
  );

  const handleNodeUpdate = useCallback(() => {
    updateNode((current) => {
      console.log("UPDATE", current);
      if (!current) return;
      return { ...current, name: "My New Awesome Node" };
    });
  }, []);

  const handleNodeDelete = useCallback(() => {
    updateDeleteNodeParent((current) => {
      console.log("DELETE", current);
      if (!current) return;
      return {
        ...current,
        actions: current.actions.filter(
          (id) => id !== "492e3d14" // Control 1
        ),
      };
    });
    deleteNode();
  }, []);

  const handleNodeAdd = useRecoilCallback(({ set }) => () => {
    const newId = `${new Date().getTime()}`;
    const parentId = "6f3635d1"; // Shared Actions
    set(treeFamily(newId), {
      id: newId,
      name: `My new Node ${newId}`,
      parentId,
      actions: [],
    });
    console.log("ADD", newId);
    // update parent (target)
    set(treeFamily(parentId), (current) => {
      if (!current) return;
      return { ...current, actions: uniq([...current.actions, newId]) };
    });
  });

  return (
    <Container maxWidth="sm" sx={{ p: 4 }}>
      <TreeNodeComponent nodeId="root" />

      <Stack spacing={1} sx={{ mt: 1 }}>
        <Button variant="outlined" onClick={() => setSeed(getRandom())}>
          Random: {seed}
        </Button>
        <Button variant="outlined" onClick={handleNodeUpdate}>
          Update
        </Button>
        <Button variant="outlined" onClick={handleNodeDelete}>
          Delete
        </Button>
        <Button variant="outlined" onClick={handleNodeAdd}>
          Add
        </Button>
      </Stack>
    </Container>
  );
};
