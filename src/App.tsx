import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Container, MantineProvider, Stack, Title } from "@mantine/core";
import MainForm from "./components/MainForm";
import { Notifications } from "@mantine/notifications";

function App() {
  return (
    <MantineProvider defaultColorScheme="auto">
      <Notifications />
      <Container size="xs">
        <Stack h="100vh " justify="center">
          <div>
            <Title order={1}>Spicy Patcher</Title>
            <Title order={2} style={{ color: "var(--mantine-color-dimmed)" }}>
              Convert web patchers into Spice patches
            </Title>
          </div>
          <MainForm />
        </Stack>
      </Container>
    </MantineProvider>
  );
}

export default App;
