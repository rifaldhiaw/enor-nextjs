import {
  createStyles,
  Flex,
  Navbar,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import {
  IconBuilding,
  IconCalendarStats,
  IconHome2,
  IconLogout,
  IconMessages,
  IconSettings,
  IconUsers,
} from "@tabler/icons";
import Link from "next/link";
import { pb } from "../../data/pocketbase";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    height: "100%",
  },

  aside: {
    backgroundColor: theme.colors.blue[9],

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  main: {
    flex: 1,
    backgroundColor: theme.colors.gray[0],
  },

  mainLink: {
    width: 44,
    height: 44,
    marginInline: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.gray[0],

    "&:hover": {
      backgroundColor: theme.colors.blue[5],
    },
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.colors.blue[6],
      color: theme.white,
    },
  },

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: 18,
    height: 60,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  logo: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: 60,
    paddingTop: theme.spacing.md,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    marginBottom: theme.spacing.xl,
  },
}));

const mainLinksMockdata = [
  { icon: IconHome2, label: "Home", url: "/" },
  { icon: IconMessages, label: "Chat", url: "/chat" },
  { icon: IconUsers, label: "Team", url: "/team" },
  { icon: IconBuilding, label: "Back Office", url: "/back-office" },
  { icon: IconCalendarStats, label: "Releases", url: "/releases" },
  { icon: IconSettings, label: "Settings", url: "/settings" },
] as const;

export type MainLink = typeof mainLinksMockdata[number]["label"];

export function AppNavbar(props: {
  opened: boolean;
  onClose: () => void;
  active: MainLink;
}) {
  const { classes, cx } = useStyles();

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip label={link.label} position="right" withArrow key={link.label}>
      <UnstyledButton
        href={link.url}
        component={Link}
        className={cx(classes.mainLink, {
          [classes.mainLinkActive]: link.label === props.active,
        })}
      >
        <link.icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  return (
    <Navbar
      hiddenBreakpoint="sm"
      hidden={!props.opened}
      width={{ sm: 76 }}
      bg="blue.8"
    >
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            <MantineLogo type="mark" size={30} />
          </div>
          <Flex direction="column" justify="space-between" sx={{ flex: 1 }}>
            <Flex direction="column">{mainLinks}</Flex>

            <Tooltip label={"Logout"} position="right" withArrow>
              <UnstyledButton
                onClick={() => {
                  pb.authStore.clear();
                }}
                className={classes.mainLink}
              >
                <IconLogout />
              </UnstyledButton>
            </Tooltip>
          </Flex>
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
