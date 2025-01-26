import { Patcher } from "../classes/Patcher.js";
import { data } from "../data.js";
import { BasicPatch } from "../types/Patch.js";
import { SpiceMemoryPatch } from "../types/SpicePatch.js";

export function basicTransformer(
  gameCode: string,
  patcher: Patcher,
  patch: BasicPatch,
): SpiceMemoryPatch {
  if (!patcher.version)
    throw new Error("Transformer called with invalid patcher version");

  return {
    name: patch.name,
    patches: patch.patches.map((p) => ({
      dllName: patcher.dllName,
      dataDisabled: data(p.off),
      dataEnabled: data(p.on),
      dataOffset: Number(p.offset),
    })),
    gameCode,
    dateCode: patcher.version,
    description: patch.tooltip ?? "",
    type: "memory" as const,
  };
}
