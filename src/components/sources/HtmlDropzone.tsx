import { Group, Kbd, Text, rem } from "@mantine/core";
import {
  IconFileTypeHtml,
  IconFileCheck,
  IconFileAlert,
  IconFileUpload,
} from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import { useAtom } from "jotai";
import { patcherFilesAtom } from "@state";

export function HtmlDropzone({ selectSelf }: { selectSelf: () => void }) {
  const [patcherFiles, setPatcherFiles] = useAtom(patcherFilesAtom);

  return (
    <Dropzone
      onDrop={(files) => {
        setPatcherFiles(files);
        selectSelf();
      }}
      accept={["text/html"]}
      multiple={false}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconFileUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-blue-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconFileAlert
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          {patcherFiles ? (
            <IconFileCheck
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-green-6)",
              }}
              stroke={1.5}
            />
          ) : (
            <IconFileTypeHtml
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          )}
        </Dropzone.Idle>
        <Dropzone.Accept>
          <div>
            <Text size="xl" inline>
              Drag HTML here or click to select file
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Press <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd> on a patcher page to get its
              HTML file
            </Text>
          </div>
        </Dropzone.Accept>
        <Dropzone.Reject>
          <div>
            <Text size="xl" inline>
              Invalid file format
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Please upload a patcher HTML file
            </Text>
          </div>
        </Dropzone.Reject>
        <Dropzone.Idle>
          {patcherFiles ? (
            <div>
              <Text size="xl" inline>
                {patcherFiles[0].name} uploaded
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Drag HTML here or click to select another file
              </Text>
            </div>
          ) : (
            <div>
              <Text size="xl" inline>
                Drag HTML here or click to select file
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Press <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd> on a patcher page to get
                its HTML file
              </Text>
            </div>
          )}
        </Dropzone.Idle>
      </Group>
    </Dropzone>
  );
}

export default HtmlDropzone;
