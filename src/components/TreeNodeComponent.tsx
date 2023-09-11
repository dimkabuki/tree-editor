import { useRecoilValue } from 'recoil';
import { ActionBlock } from './ActionBlock';
import { TreeNode, treeFamily } from '../store/data';
import { memo } from 'react';
import { Box } from '@mui/material';

type Props = { nodeId: TreeNode['id'] };

type NodeElementProps = {
  name: string;
  isBranch: boolean;
  id: string;
};

const NodeElement = memo(({ name, id, isBranch }: NodeElementProps) => (
  <Box sx={{ fontWeight: isBranch ? 600 : 400 }}>
    [{id}]: {name}
  </Box>
));

export const TreeNodeComponent = ({ nodeId }: Props) => {
  const currentNode = useRecoilValue(treeFamily(nodeId));
  const isBranch = Boolean(currentNode?.actions.length);

  return currentNode ? (
    <ActionBlock
      childrenHash={currentNode?.actions.join() || ''}
      {...{ isBranch }}
      nodeElement={
        <NodeElement {...{ isBranch }} name={currentNode.name} id={nodeId} />
      }
    >
      {currentNode.actions.map((childNodeId) => (
        <TreeNodeComponent key={childNodeId} nodeId={childNodeId} />
      ))}
    </ActionBlock>
  ) : null;
};
