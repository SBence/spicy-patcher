import { Patcher } from "../classes/Patcher.js";
import { UnionPatch } from "../types/Patch.js";
import { SpicePatch } from "../types/SpicePatch.js";
import { data } from "../data.js";

export function unionTransformer(
  gameCode: string,
  patcher: Patcher,
  patch: UnionPatch,
) {
  const spicePatches: SpicePatch[] = [];

  if (!patcher.version)
    throw new Error("Transformer called with invalid patcher version");

  for (const option of patch.patches) {
    spicePatches.push({
      type: "memory" as const,
      name: `${patch.name}: ${option.name}`,
      patches: [
        {
          dllName: patcher.dllName,
          dataDisabled: "",
          dataEnabled: data(option.patch),
          dataOffset: Number(patch.offset),
        },
      ],
      gameCode,
      dateCode: patcher.version,
      description: patch.tooltip ?? "",
    });
  }
  return spicePatches;
}
