interface BasicPatchData {
  offset: number;
  off: number[];
  on: number[];
}

interface UnionPatchData {
  name: string;
  patch: number[];
}

interface PatchCommon {
  name: string;
  tooltip?: string;
}

export interface BasicPatch extends PatchCommon {
  patches: BasicPatchData[];
}

export interface NumberPatch extends PatchCommon {
  type: "number";
  offset: number;
  size: number;
  min: number;
  max: number;
}

export interface UnionPatch extends PatchCommon {
  type: "union";
  offset: number;
  patches: UnionPatchData[];
}

export type Patch = BasicPatch | NumberPatch | UnionPatch;
