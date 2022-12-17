import { AppShell, useMantineTheme } from "@mantine/core";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AppNavbar } from "../components/layouts/AppNavbar";

const PostContainer = dynamic(
  () => import("../components/Post").then((v) => v.PostContainer),
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
    >
      <PostContainer />
    </AppShell>
  );
}
