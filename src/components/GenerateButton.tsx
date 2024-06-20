import { Button } from "@mantine/core";
import { extractPatchersFromHtml } from "../utils/extractPatchersFromHtml";
import { webPatchersToSpice } from "../utils/webPatchersToSpice";
import downloadJson from "../utils/downloadJson";
import { useAtomValue } from "jotai";
import {
  gameCodeAtom,
  latestOnlyAtom,
  minifyJsonAtom,
  patchSourceAtom,
  patcherFilesAtom,
  patcherUrlAtom,
} from "@state";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

function GenerateButton() {
  const gameCode = useAtomValue(gameCodeAtom);
  const patchSource = useAtomValue(patchSourceAtom);
  const patcherUrl = useAtomValue(patcherUrlAtom);
  const patcherFiles = useAtomValue(patcherFilesAtom);
  const latestOnly = useAtomValue(latestOnlyAtom);
  const minifyJson = useAtomValue(minifyJsonAtom);

  const [isGenerating, setIsGenerating] = useState(false);

  function generateButtonEnabled() {
    const validUrl = patchSource == "url" && patcherUrl;
    const validFile = patchSource == "file" && patcherFiles?.[0];
    return !!(gameCode && (validUrl || validFile));
  }

  return (
    <Button
      disabled={!generateButtonEnabled()}
      loading={isGenerating}
      onClick={async () => {
        setIsGenerating(true);

        let patcherHtml: string | null = null;

        switch (patchSource) {
          case "url": {
            const patcherHtmlRequest = await fetch(patcherUrl);
            patcherHtml = await patcherHtmlRequest.text();
            break;
          }

          case "file":
            if (!patcherFiles?.[0]) throw new Error("No file uploaded");
            patcherHtml = await patcherFiles[0].text();
            break;

          default:
            throw new Error("Invalid patch source");
        }

        try {
          const patchers = extractPatchersFromHtml(patcherHtml);
          const patches = webPatchersToSpice(gameCode, patchers, latestOnly);
          downloadJson("patches.json", patches, minifyJson);
        } catch (error) {
          notifications.show({
            message:
              error instanceof Error ? error.message : "An error has occurred",
            color: "red",
          });
        }

        setIsGenerating(false);
      }}
    >
      Generate
    </Button>
  );
}

export default GenerateButton;
