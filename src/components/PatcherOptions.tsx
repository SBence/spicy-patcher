import { Checkbox, Stack } from "@mantine/core";
import { latestOnlyAtom, minifyJsonAtom } from "@state";
import { useAtom } from "jotai";

function PatcherOptions() {
  const [latestOnly, setLatestOnly] = useAtom(latestOnlyAtom);
  const [minifyJson, setMinifyJson] = useAtom(minifyJsonAtom);

  return (
    <Stack>
      <Checkbox
        label="Latest version only"
        checked={latestOnly}
        onChange={(event) => {
          setLatestOnly(event.currentTarget.checked);
        }}
      />
      <Checkbox
        label="Minify file"
        checked={minifyJson}
        onChange={(event) => {
          setMinifyJson(event.currentTarget.checked);
        }}
      />
    </Stack>
  );
}

export default PatcherOptions;
