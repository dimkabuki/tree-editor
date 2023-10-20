import { Button, Paper, Stack } from "@mui/material";
import { FC, PropsWithChildren, useState } from "react";
import { useRecoilValue } from "recoil";
import { nodeFeildSelector } from "../model/store";
import { SubTree } from "./SubTree";

const getRandom = () => Math.ceil(Math.random() * 100);

const FlowBlock: FC<PropsWithChildren> = ({ children }) => (
  <Paper sx={{ alignSelf: "center", px: 2, py: 1 }}>{children}</Paper>
);

export const DynamicWrap: FC = () => {
  const [seed, setSeed] = useState(getRandom());
  const testCaseName = useRecoilValue(
    nodeFeildSelector({ path: "name", id: "root" })
  );

  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      <h3>{testCaseName || "N/A"}</h3>
      <FlowBlock>START</FlowBlock>
      {/* Main recurcive component, others is for testing purposes  */}
      <SubTree rootId="root" />
      {/*  */}
      <FlowBlock>END</FlowBlock>

      <Button variant="outlined" onClick={() => setSeed(getRandom())}>
        Random: {seed}
      </Button>
    </Stack>
  );
};
