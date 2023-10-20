import { CircularProgress, Container } from "@mui/material";
import { FC, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { useRecoilCallback } from "recoil";

import type { TreeNode } from "../model/data";
import { treeFamily } from "../model/store";
import { DynamicWrap } from "./DynamicWrap";

let count = 0;

export const Home: FC = () => {
  const setTreeNodes = useRecoilCallback(
    ({ transact_UNSTABLE: transact }) =>
      (nodes: TreeNode[]) => {
        transact(({ set }) => {
          (nodes || []).forEach((node) => {
            set(treeFamily(node.id), node);
            count++;
          });
        });
      }
  );

  const data = useLoaderData() as { nodes: Promise<TreeNode[]> };
  data?.nodes.then(setTreeNodes);

  return (
    <Container maxWidth="md" sx={{ p: 4, textAlign: "center" }}>
      <Suspense fallback={<CircularProgress />}>
        <Await
          resolve={data.nodes}
          errorElement={<div>Could not load data</div>}
          children={<DynamicWrap />}
        />
      </Suspense>
    </Container>
  );
};
