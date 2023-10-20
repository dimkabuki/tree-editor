import _get from "lodash/get";
import _set from "lodash/set";
import { atomFamily, selectorFamily } from "recoil";
import type { TreeNode, TreeNodeValue } from "./data";

export const treeFamily = atomFamily<TreeNode | undefined, string>({
  key: "treeFamily",
  default: undefined,
  effects: [({ onSet }) => onSet(console.info)],
});

export const nodeFeildSelector = selectorFamily<
  TreeNodeValue,
  { path: string; id: string }
>({
  key: "nodeFeildSelector",
  get:
    ({ id, path }) =>
    ({ get }) =>
      _get(get(treeFamily(id)), path),
  set:
    ({ id, path }) =>
    ({ set, get }, fieldValue) => {
      const current = get(treeFamily(id));
      if (!current) return;
      const newValue = _set(current, path, fieldValue);
      set(treeFamily(id), newValue);
    },
});
