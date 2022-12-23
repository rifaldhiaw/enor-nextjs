import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  Menu,
  NavLink,
  Paper,
  ScrollArea,
  Title,
} from "@mantine/core";
import {
  IconChalkboard,
  IconDots,
  IconFileDescription,
  IconHash,
  IconLayoutKanban,
  IconMessages,
  IconNote,
  IconReportAnalytics,
  IconTrash,
  IconVolume,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { NavLinkData, navLinkGroups } from "../../data/navlinkData";
import {
  discussionStoreActions,
  useDiscussionStore,
} from "../../stores/discussionStore";

export const DiscussionLayoutNav = (props: { title: string }) => {
  const activeAccordion = useDiscussionStore((state) => state.activeAccordion);
  const router = useRouter();
  const channelId = router.query.channelId;

  return (
    <Paper
      w="100%"
      h="100vh"
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        flex: "none",
        borderRight: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <Title
        order={4}
        p="md"
        sx={(theme) => ({
          position: "sticky",
          borderBottom: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[2]
          }`,
        })}
      >
        {props.title}
      </Title>

      <ScrollArea
        sx={{
          height: "calc(100vh - var(--mantine-header-height, 60px))",
          flex: 1,
        }}
      >
        <Accordion
          multiple={true}
          chevronPosition="left"
          mx="auto"
          value={activeAccordion}
          onChange={discussionStoreActions.setActiveAccordion}
        >
          {navLinkGroups.map((item) => (
            <Accordion.Item key={item.title} value={item.title}>
              <AccordionControl py="xs">{item.title}</AccordionControl>
              <Accordion.Panel>
                {item.links.map((child) => {
                  const iconByType: Record<NavLinkData["type"], ReactNode> = {
                    textRoom: <IconHash size={16} stroke={1.5} />,
                    voiceRoom: <IconVolume size={16} stroke={1.5} />,
                    document: <IconFileDescription size={16} stroke={1.5} />,
                    drawBoard: <IconChalkboard size={16} stroke={1.5} />,
                    kanban: <IconLayoutKanban size={16} stroke={1.5} />,
                  };

                  return (
                    <NavLink
                      key={child.label}
                      h={32}
                      icon={iconByType[child.type]}
                      label={child.label}
                      active={child.label.toLowerCase() === channelId}
                      onClick={() => {
                        router.push(`/discussion/${child.href}`);
                      }}
                    />
                  );
                })}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </ScrollArea>
    </Paper>
  );
};

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
