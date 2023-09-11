import { useRecoilValue } from "recoil";
import { ActionBlock } from "./ActionBlock";
import { TreeNode, treeFamily, Node } from "../store/data";
import { useMemo } from "react";
import { Box } from "@mui/material";

type Props = { nodeId: TreeNode["id"] };

export const TreeNodeComponent = ({ nodeId }: Props) => {
  const { actions, id, name } =
    useRecoilValue(treeFamily(nodeId)) || ({} as Node);
  const isBranch = Boolean(actions.length);
  const childrenHash = actions?.join() || "";

  console.log("RENDER", childrenHash, id, name);

  const nodeElement = useMemo(
    () => (
      <Box sx={{ fontWeight: isBranch ? 600 : 400 }}>
        [{id}]: {name}
      </Box>
    ),
    [id, name]
  );

  const childElement = useMemo(
    () =>
      actions.map((childNodeId) => (
        <TreeNodeComponent key={childNodeId} nodeId={childNodeId} />
      )),
    [childrenHash]
  );

  return (
    <ActionBlock {...{ isBranch, nodeElement }}>{childElement}</ActionBlock>
  );
};
