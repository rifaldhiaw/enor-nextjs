import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import dayjs from "dayjs";
import { useState } from "react";
import { AppNavbar } from "../components/layouts/AppNavbar";
import { Post } from "../components/Post";

export default function Home() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const post = {
    postedAt: dayjs().format("MMMM D, YYYY HH:mm"),
    body: "This Pokémon likes to lick its palms that are sweetened by being soaked in honey. Teddiursa concocts its own honey by blending fruits and pollen collected by Beedrill. Blastoise has water spouts that protrude from its shell. The water spouts are very accurate.",
    author: {
      name: "Jacob Warnhalter",
      image:
        "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    },
  };
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      layout="alt"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<AppNavbar opened={opened} />}
      header={
        <Header height={60} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </div>
        </Header>
      }
    >
      <Stack>
        <Post {...post} />
        <Post {...post} />
        <Post {...post} />
        <Post {...post} />
        <Post {...post} />
        <Post {...post} />
      </Stack>
    </AppShell>
  );
}
