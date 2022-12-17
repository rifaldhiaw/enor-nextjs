import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  createStyles,
  Flex,
  Menu,
  Navbar,
  NavLink,
  ScrollArea,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconDots,
  IconFingerprint,
  IconGauge,
  IconHash,
  IconHome2,
  IconMessages,
  IconNote,
  IconReportAnalytics,
  IconSettings,
  IconTrash,
  IconUser,
} from "@tabler/icons";
import { useState } from "react";
import { navLinkData } from "../../data/navlinkData";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    height: "100%",
  },

  aside: {
    flex: "0 0 60px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
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
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
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
  { icon: IconHome2, label: "Home" },
  { icon: IconGauge, label: "Dashboard" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics" },
  { icon: IconCalendarStats, label: "Releases" },
  { icon: IconUser, label: "Account" },
  { icon: IconFingerprint, label: "Security" },
  { icon: IconSettings, label: "Settings" },
];

function AccordionControl(props: AccordionControlProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Accordion.Control {...props} />
      <Menu transition="pop" withArrow position="bottom-end">
        <Menu.Target>
          <ActionIcon size="lg">
            <IconDots size={16} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconMessages size={16} stroke={1.5} />}>
            Send message
          </Menu.Item>
          <Menu.Item icon={<IconNote size={16} stroke={1.5} />}>
            Add note
          </Menu.Item>
          <Menu.Item icon={<IconReportAnalytics size={16} stroke={1.5} />}>
            Analytics
          </Menu.Item>
          <Menu.Item icon={<IconTrash size={16} stroke={1.5} />} color="red">
            Terminate contract
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}

export function AppNavbar(props: { opened: boolean }) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Releases");

  const [activeAccordion, setActiveAccordion] = useState<string[]>([
    navLinkData[0].title,
  ]);

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionDuration={0}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={cx(classes.mainLink, {
          [classes.mainLinkActive]: link.label === active,
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
      width={{ sm: 200, lg: 320 }}
    >
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            <MantineLogo type="mark" size={30} />
          </div>
          {mainLinks}
        </div>
        <Flex direction="column" sx={{ flex: 1 }}>
          <Title order={4} className={classes.title}>
            {active}
          </Title>

          <ScrollArea
            sx={{
              flex: 1,
            }}
          >
            <Accordion
              multiple={true}
              chevronPosition="left"
              mx="auto"
              value={activeAccordion}
              onChange={(value) => setActiveAccordion(value)}
            >
              {navLinkData.map((item) => (
                <Accordion.Item key={item.title} value={item.title}>
                  <AccordionControl>{item.title}</AccordionControl>
                  <Accordion.Panel>
                    {item.links.map((child) => (
                      <NavLink
                        key={child.label}
                        icon={<IconHash size={16} stroke={1.5} />}
                        label={child.label}
                        active={child.current}
                      />
                    ))}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </ScrollArea>
        </Flex>
      </Navbar.Section>
    </Navbar>
  );
}
