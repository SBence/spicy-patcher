import { FileWithPath } from "@mantine/dropzone";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const gameCodeAtom = atomWithStorage("gameCode", "", undefined, {
  getOnInit: true,
});

export const patchSourceAtom = atom("url");
export const patcherUrlAtom = atomWithStorage("patcherUrl", "", undefined, {
  getOnInit: true,
});
export const patcherFilesAtom = atom<FileWithPath[] | null>(null);

export const latestOnlyAtom = atomWithStorage("latestOnly", false, undefined, {
  getOnInit: true,
});
export const minifyJsonAtom = atomWithStorage("minifyJson", true, undefined, {
  getOnInit: true,
});
