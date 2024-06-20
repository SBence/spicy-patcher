import { TextInput } from "@mantine/core";
import { useAtom } from "jotai";
import { patcherUrlAtom } from "@state";

function PatcherUrlField() {
  const [patcherUrl, setPatcherUrl] = useAtom(patcherUrlAtom);

  return (
    <TextInput
      type="url"
      value={patcherUrl}
      onChange={(event) => {
        setPatcherUrl(event.currentTarget.value);
      }}
      style={{ cursor: "initial" }}
    />
  );
}

export default PatcherUrlField;
