import { Patcher } from "./classes/Patcher.js";

export function extractPatchersFromHtml(patcherHtml: string) {
  if (!patcherHtml) throw new Error("No patcher HTML specified");

  // Match the array inside "new PatchContainer", with brackets included.
  const patchersString =
    /(?<=new PatchContainer\([^]*)\[[^]*](?=\);\s*}\);)/.exec(patcherHtml);
  if (!patchersString) throw new Error("PatchContainer not found");

  const patchers = eval(
    `const Patcher=${Patcher.toString()};${patchersString[0]}`,
  ) as Patcher[] | undefined;
  if (!patchers) throw new Error("Failed to parse patches");
  if (!patchers.length) throw new Error("No patches found");

  return patchers;
}
