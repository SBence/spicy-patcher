import { Text, TextInput } from "@mantine/core";
import SourceSelector from "./SourceSelector";
import PatcherOptions from "./PatcherOptions";
import { useAtom } from "jotai";
import { gameCodeAtom } from "@state";
import GenerateButton from "./GenerateButton";

function MainForm() {
  const [gameCode, setGameCode] = useAtom(gameCodeAtom);

  return (
    <>
      <TextInput
        label="Game code"
        value={gameCode}
        onChange={(event) => {
          setGameCode(event.currentTarget.value);
        }}
      />
      <SourceSelector />
      <Text size="sm">Options</Text>
      <PatcherOptions />
      <GenerateButton />
    </>
  );
}

export default MainForm;
