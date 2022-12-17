import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AppNavbar } from "../components/layouts/AppNavbar";

const PostList = dynamic(
  () => import("../components/Post").then((v) => v.PostList),
  { ssr: false }
);

export default function Home() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          paddingTop: "calc(var(--mantine-header-height, 0px))",
          paddingRight: "calc(var(--mantine-aside-width, 0px))",
          paddingLeft: "calc(var(--mantine-navbar-width, 0px))",
          paddingBottom: 0,
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
      <PostList />
    </AppShell>
  );
}
