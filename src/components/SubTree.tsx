import { Stack } from "@mui/material";
import { FC, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { nodeFeildSelector } from "../model/store";
import { RecurciveNode } from "./RecurciveNode";

export const SubTree: FC<{ rootId: string }> = ({ rootId }) => {
  const nodeActions = useRecoilValue(
    nodeFeildSelector({ path: "actions", id: rootId })
  ) as string[];
  if (!nodeActions?.length) return null;

  const childrenHash = nodeActions.join();

  const childElement = useMemo(
    () => nodeActions.map((id) => <RecurciveNode key={id} nodeId={id} />),
    [childrenHash]
  );

  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      {childElement}
    </Stack>
  );
};
