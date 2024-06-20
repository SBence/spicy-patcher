import { Group, Radio, Stack, Text } from "@mantine/core";
import PatcherUrlField from "./sources/PatcherUrlField";
import HtmlDropzone from "./sources/HtmlDropzone";
import classes from "./SourceSelector.module.css";
import { useAtom } from "jotai";
import { patchSourceAtom } from "@state";

function SourceSelector() {
  const [patchSource, setPatchSource] = useAtom(patchSourceAtom);

  return (
    <Radio.Group
      value={patchSource}
      onChange={setPatchSource}
      label="Source"
      description="Select a source to get patches from"
    >
      <Stack pt="md" gap="xs">
        <Radio.Card className={classes.root} radius="md" value="url" key="url">
          <Group wrap="nowrap" align="flex-start">
            <Radio.Indicator />
            <div className={classes.content}>
              <Text className={classes.label}>Patcher URL</Text>
              <PatcherUrlField />
            </div>
          </Group>
        </Radio.Card>
        <Radio.Card
          className={classes.root}
          radius="md"
          value="file"
          key="file"
        >
          <Group wrap="nowrap" align="flex-start">
            <Radio.Indicator />
            <div>
              <Text className={classes.label}>Patcher HTML file</Text>
              <HtmlDropzone
                selectSelf={() => {
                  setPatchSource("file");
                }}
              />
            </div>
          </Group>
        </Radio.Card>
      </Stack>
    </Radio.Group>
  );
}

export default SourceSelector;
