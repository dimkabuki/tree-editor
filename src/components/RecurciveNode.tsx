import { Box } from "@mui/material";
import { FC, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { treeFamily } from "../model/store";
import { NodeBlock } from "./NodeBlock";

type Props = { nodeId: string };

export const RecurciveNode: FC<Props> = ({ nodeId }) => {
  const node = useRecoilValue(treeFamily(nodeId));
  if (!node?.id) return null;

  const childrenHash = node.actions.join();
  const isBranch = Boolean(node.actions.length);

  const { id, name, actions } = node;

  const nodeContent = useMemo(
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
        <RecurciveNode key={childNodeId} nodeId={childNodeId} />
      )),
    [childrenHash]
  );

  console.log("RENDER NODE", node.id, node.name);

  return (
    <NodeBlock
      {...{
        isBranch,
        nodeContent,
      }}
    >
      {childElement}
    </NodeBlock>
  );
};
