interface SpicePatchData {
  dllName: string;
  dataDisabled: string;
  dataEnabled: string;
  dataOffset: number;
}

export interface SpicePatch {
  type: "memory";
  name: string;
  patches: SpicePatchData[];
  gameCode: string;
  dateCode: number;
  description: string;
}
