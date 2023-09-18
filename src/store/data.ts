import { flatMapDeep } from "lodash";
import { atomFamily, selectorFamily } from "recoil";

export type TreeNode = {
  actions: TreeNode[];
  id: string;
  name: string;
};

export type Node = {
  id: string;
  name: string;
  parentId: string;
  actions: string[];
};

export const rawTestCase: TreeNode = {
  id: "root",
  name: "Test Case example",
  actions: [
    {
      id: "d2d61080",
      name: "Module Folder",
      actions: [
        {
          id: "492e3d14",
          name: "Control 1",
          actions: [],
        },
        {
          id: "9edd73a1",
          name: "Inner Folder",
          actions: [
            {
              id: "3800b121",
              name: "Control 2",
              actions: [],
            },
          ],
        },
      ],
    },
    {
      id: "6f3635d1",
      name: "Shared Actions",
      actions: [],
    },
    {
      id: "aa2f03b7",
      name: "Predefined Action",
      actions: [],
    },
    {
      id: "86cd7c9d",
      name: "TABLE",
      actions: [],
    },
    {
      id: "7b7138d1",
      name: "Condition",
      actions: [],
    },
  ],
};

const flattenTree = (
  tree: TreeNode[],
  parentId: Node["parentId"] = "root"
): Node[] =>
  flatMapDeep<TreeNode, Node>(tree, ({ id, name, actions }) => [
    { id, name, parentId, actions: actions.map(({ id }) => id) },
    ...flattenTree(actions, id),
  ]);

export const flatTestCase = new Map(
  flattenTree([rawTestCase]).map((item) => [item.id, item])
);

export const treeFamily = atomFamily({
  key: "treeFamily",
  default: (id: string) => flatTestCase.get(id),
});

export const treeFamilyAction = selectorFamily<Node | undefined, string>({
  key: "treeFamilyAction",
  get:
    (nodeId) =>
    ({ get }) =>
      get(treeFamily(nodeId)),
  set:
    (nodeId) =>
    ({ set, get }, payload) => {
      console.log("SET", payload);
      return undefined;
    },
});

// const updateNode = useSetRecoilState(
//   treeFamily('9edd73a1') // Inner Folder
// );

// const deleteNode = useResetRecoilState(
//   treeFamily('492e3d14') // Control 1
// );
// const updateDeleteNodeParent = useSetRecoilState(
//   treeFamily('d2d61080') // Module Folder
// );

// const handleNodeUpdate = useCallback(() => {
//   updateNode((current) => {
//     console.log('UPDATE', current);
//     if (!current) return;
//     return { ...current, name: 'My New Awesome Node' };
//   });
// }, []);

// const handleNodeDelete = useCallback(() => {
//   updateDeleteNodeParent((current) => {
//     console.log('UPDATE DELETED', current);
//     if (!current) return;
//     return {
//       ...current,
//       actions: current.actions.filter(
//         (id) => id !== '492e3d14' // Control 1
//       ),
//     };
//   });
//   deleteNode();
// }, []);

// const handleNodeAdd = useRecoilCallback(({ set }) => () => {
//   const newId = `${new Date().getTime()}`;
//   const parentId = '6f3635d1'; // Shared Actions
//   set(treeFamily(newId), {
//     id: newId,
//     name: `My new Node ${newId}`,
//     parentId,
//     actions: [],
//   });
//   // update parent (target)
//   set(treeFamily(parentId), (current) => {
//     if (!current) return;
//     return { ...current, actions: uniq([...current.actions, newId]) };
//   });
// });
