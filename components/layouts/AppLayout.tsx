import { AppShell, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";
import { AppNavbar } from "./AppNavbar";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const theme = useMantineTheme();
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
      navbar={<AppNavbar opened={true} />}
    >
      {children}
    </AppShell>
  );
};
