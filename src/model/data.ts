import { flatMapDeep } from "lodash";
import { defer } from "react-router-dom";
import { rawTestCase } from "./apiData";

export type ApiDataNode = {
  actions: ApiDataNode[];
  id: string;
  name: string;
  control?: {
    controlId: string;
    moduleId: string;
  };
};

export type TreeNode = {
  id: string;
  name: string;
  parentId?: string;
  actions: string[];
};

export type TreeNodeValue = TreeNode[keyof TreeNode];

const flattenTree = (tree: ApiDataNode[], parentId = "root"): TreeNode[] =>
  flatMapDeep<ApiDataNode, TreeNode>(tree, ({ id, name, actions }) => [
    { id, name, parentId, actions: actions.map(({ id }) => id) },
    ...flattenTree(actions, id),
  ]);

export const flatTestCase = new Map(
  flattenTree([rawTestCase]).map((item) => [item.id, item])
);

export const getNodesFromFakeApi = () =>
  defer({
    nodes: Promise.all([
      Promise.resolve(flattenTree([rawTestCase])),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]).then(([nodes]) => nodes),
  });

// export const deleteNode = useRecoilCallback(() => () => {});

// export const treeFeSelector = selector({
//   key: 'itemsSelector',
//   get: async ({ get }) => {
//     try {
//       // Fetch data from the API
//       const response = await fetch('your-api-endpoint');
//       const data = await response.json();

//       // Create a dictionary of items where item ID is the key
//       const itemsDictionary = {};
//       data.forEach((item) => {
//         itemsDictionary[item.id] = item;
//       });

//       return itemsDictionary;
//     } catch (error) {
//       console.error('Error fetching items:', error);
//       return {};
//     }
//   },
// });

// export const setTreeNodes = useRecoilCallback(({ set }) => (nodes: Node[]) => {
//   console.log("SET NODE", nodes);
//   (nodes || []).forEach((node) => set(treeFamily(node.id), node));
// });

// export const treeFamilySelector = selectorFamily<Node | undefined, string>({
//   key: "treeFamilySelector",
//   set:
//     (nodeId) =>
//     ({ set }, newNode) => {
//       console.log("SET", nodeId, newNode);
//       set(treeFamily(nodeId), newNode);
//     },
// });

// export const treeFamilyAction = selectorFamily<Node | undefined, string>({
//   key: "treeFamilyAction",
//   get:
//     (nodeId) =>
//     ({ get }) =>
//       // get(treeFamily(nodeId)),
//   set:
//     (nodeId) =>
//     ({ set, get }, payload) => {
//       console.log("SET", payload);
//       return undefined;
//     },
// });

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
