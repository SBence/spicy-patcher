import { Patcher } from "./classes/Patcher.js";
import { SpicePatch } from "./types/SpicePatch.js";
import { basicTransformer } from "./transformers/basicTransformer.js";
import { unionTransformer } from "./transformers/unionTransformer.js";
import { numberTransformer } from "./transformers/numberTransformer.js";

export function webPatchersToSpice(
  gameCode: string,
  patchers: Patcher[],
  latestOnly: boolean | null = false,
) {
  if (!gameCode) throw new Error("No game code specified");
  if (!patchers.length) throw new Error("Patcher array is empty");

  const spicePatches: SpicePatch[] = [];

  function addPatcherToSpicePatches(patcher: Patcher) {
    for (const patch of patcher.patches) {
      try {
        if ("type" in patch) {
          switch (patch.type) {
            case "union":
              spicePatches.push(unionTransformer(gameCode, patcher, patch));
              break;
            case "number":
              spicePatches.push(numberTransformer(gameCode, patcher, patch));
              break;

            default:
              console.warn(`Skipping unsupported patch`);
              break;
          }
        } else {
          spicePatches.push(basicTransformer(gameCode, patcher, patch));
        }
      } catch (error) {
        // Catching here as well, just in case
        if (error instanceof Error) {
          console.warn(error.message);
        } else {
          console.warn(
            `Failed to convert patch to Spice format: ${patch.name}`,
          );
        }
      }
    }
  }

  if (latestOnly) {
    const patcher = patchers[patchers.length - 1];
    if (!patcher.version) throw new Error("Invalid date code"); // Throwing here so addPatcherToSpicePatches wouldn't have to deal with this
    addPatcherToSpicePatches(patcher);
  } else {
    for (const patcher of patchers) {
      if (!patcher.version) {
        // Error thrown in transformers as well, warning in classes/Patcher.ts
        console.warn(`Skipping patcher with invalid date code`);
        continue;
      }
      addPatcherToSpicePatches(patcher);
    }
  }

  return spicePatches;
}
