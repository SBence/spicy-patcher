interface SpicePatchCommon {
  name: string;
  description: string;
  gameCode: string;
  dateCode: number;
}

interface SpiceMemoryPatchData {
  dllName: string;
  dataDisabled: string;
  dataEnabled: string;
  dataOffset: number;
}

export interface SpiceMemoryPatch extends SpicePatchCommon {
  type: "memory";
  patches: SpiceMemoryPatchData[];
}

interface SpiceUnionPatchOptionData {
  dllName: string;
  offset: number;
  data: string;
}

export interface SpiceUnionPatchData {
  name: string; // Option name
  patch: SpiceUnionPatchOptionData;
}

export interface SpiceUnionPatch extends SpicePatchCommon {
  type: "union";
  patches: SpiceUnionPatchData[];
}

interface SpiceNumberPatchData {
  dllName: string;
  offset: number;
  size: number;
  min: number;
  max: number;
}

export interface SpiceNumberPatch extends SpicePatchCommon {
  type: "number";
  patch: SpiceNumberPatchData;
}

export type SpicePatch = SpiceMemoryPatch | SpiceUnionPatch | SpiceNumberPatch;
