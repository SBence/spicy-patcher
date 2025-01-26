import { Patcher } from "../classes/Patcher.js";
import { data } from "../data.js";
import { UnionPatch } from "../types/Patch.js";
import { SpiceUnionPatch } from "../types/SpicePatch.js";

export function unionTransformer(
  gameCode: string,
  patcher: Patcher,
  patch: UnionPatch,
): SpiceUnionPatch {
  if (!patcher.version)
    throw new Error("Transformer called with invalid patcher version");

  return {
    type: "union" as const,
    name: patch.name,
    patches: patch.patches.map((option) => ({
      name: option.name,
      patch: {
        dllName: patcher.dllName,
        data: data(option.patch),
        offset: Number(patch.offset),
      },
    })),
    gameCode,
    dateCode: patcher.version,
    description: patch.tooltip ?? "",
  };
}
