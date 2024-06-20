import { Patcher } from "../classes/Patcher.js";
import { BasicPatch } from "../types/Patch.js";
import { SpicePatch } from "../types/SpicePatch.js";
import { data } from "../data.js";

export function basicTransformer(
  gameCode: string,
  patcher: Patcher,
  patch: BasicPatch,
): SpicePatch {
  if (!patcher.version)
    throw new Error("Transformer called with invalid patcher version");

  return {
    name: patch.name,
    patches: patch.patches.map((p) => {
      return {
        dllName: patcher.dllName,
        dataDisabled: data(p.off),
        dataEnabled: data(p.on),
        dataOffset: Number(p.offset),
      };
    }),
    gameCode,
    dateCode: patcher.version,
    description: patch.tooltip ?? "",
    type: "memory" as const,
  };
}
