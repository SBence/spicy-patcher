import { Patcher } from "../classes/Patcher.js";
import { NumberPatch } from "../types/Patch.js";
import { SpiceNumberPatch } from "../types/SpicePatch.js";

export function numberTransformer(
  gameCode: string,
  patcher: Patcher,
  patch: NumberPatch,
): SpiceNumberPatch {
  if (!patcher.version)
    throw new Error("Transformer called with invalid patcher version");

  return {
    name: patch.name,
    patch: {
      dllName: patcher.dllName,
      offset: patch.offset,
      size: patch.size,
      min: patch.min,
      max: patch.max,
    },
    gameCode,
    dateCode: patcher.version,
    description: patch.tooltip ?? "",
    type: "number" as const,
  };
}
