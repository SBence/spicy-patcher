import { Patch } from "../types/Patch.js";

export class Patcher {
  dllName;
  version;
  patches;

  constructor(dllName: string, version: string, patches: Patch[]) {
    this.dllName = dllName;
    this.patches = patches;

    try {
      const dateCodeString = /\d{4}-\d{2}-\d{2}/.exec(version)?.[0];
      if (!dateCodeString)
        throw new Error(`Found patcher with invalid date code: ${version}`); // Skipped in utils/webPatchersToSpice.ts
      const preparedDateCodeString = dateCodeString.replaceAll("-", "");
      const validDateCode = /^\d{8}$/.test(preparedDateCodeString);
      if (!validDateCode) throw new Error(`Invalid date code: ${version}`);
      const dateCode = Number(preparedDateCodeString + "00");

      this.version = dateCode;
    } catch (error) {
      if (error instanceof Error) {
        console.warn(error.message);
      } else {
        console.warn(`Failed to format patcher date code: ${version}`);
      }
    }
  }
}
