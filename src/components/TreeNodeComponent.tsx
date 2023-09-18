import { useRecoilState } from "recoil";
import { ActionBlock } from "./ActionBlock";
import { TreeNode, treeFamilyAction } from "../store/data";
import { useMemo } from "react";
import { Box } from "@mui/material";

type Props = { nodeId: TreeNode["id"] };

export const TreeNodeComponent = ({ nodeId }: Props) => {
  const [node, dispatchNodeAction] = useRecoilState(treeFamilyAction(nodeId));
  const isBranch = Boolean(node?.actions.length);
  const childrenHash = node?.actions.join() || "";

  console.log("RENDER", node, childrenHash);

  if (!node?.id) return null;

  const { id, name, actions } = node;

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
    <ActionBlock
      {...{
        isBranch,
        nodeElement,
        onDeleteClick: () => dispatchNodeAction(node, "delete"),
      }}
    >
      {childElement}
    </ActionBlock>
  );
};
