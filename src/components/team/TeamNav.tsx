import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  Button,
  Flex,
  Menu,
  NavLink,
  Paper,
  ScrollArea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import {
  IconChalkboard,
  IconCheck,
  IconDots,
  IconFileDescription,
  IconHash,
  IconLayoutKanban,
  IconMessages,
  IconNote,
  IconPlus,
  IconReportAnalytics,
  IconSettings,
  IconTrash,
  IconVolume,
  IconX,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { ChannelsResponse, Collections } from "~/../pocketbase.types";
import { pb } from "~/data/pocketbase";
import {
  getChannels,
  groupChannelsByTeam,
} from "~/domains/channels/channelData";
import { getAllTeams } from "~/domains/team/teamData";
import { NavLinkData } from "../../data/navlinkData";
import {
  discussionStoreActions,
  useDiscussionStore,
} from "../../stores/discussionStore";

export const TeamNav = (props: { title: string }) => {
  const activeAccordion = useDiscussionStore((state) => state.activeAccordion);
  const router = useRouter();
  const channelId = router.query.channelId;

  const teams = getAllTeams();
  const channels = getChannels();

  const channelsByTeam = groupChannelsByTeam(channels.data ?? []);

  return (
    <Paper
      w="100%"
      h="100vh"
      bg="gray.1"
      sx={(theme) => ({
        flex: "none",
        borderRight: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <Flex
        align="center"
        justify="space-between"
        sx={(theme) => ({
          borderBottom: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[4]
          }`,
        })}
      >
        <Title order={4} p="md">
          {props.title}
        </Title>
        <NavHeaderMenu />
      </Flex>

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
          {teams.data?.map((item) => {
            const channels = channelsByTeam[item.id];

            return (
              <Accordion.Item key={item.id} value={item.name}>
                <AccordionControl py="xs">{item.name}</AccordionControl>
                <Accordion.Panel>
                  {channels?.map((channel: ChannelsResponse) => {
                    const iconByType: Record<NavLinkData["type"], ReactNode> = {
                      textRoom: <IconHash size={16} stroke={1.5} />,
                      voiceRoom: <IconVolume size={16} stroke={1.5} />,
                      document: <IconFileDescription size={16} stroke={1.5} />,
                      drawBoard: <IconChalkboard size={16} stroke={1.5} />,
                      kanban: <IconLayoutKanban size={16} stroke={1.5} />,
                    };

                    return (
                      <NavLink
                        key={channel.id}
                        h={32}
                        icon={iconByType[channel.type]}
                        label={channel.name}
                        active={channel.name.toLowerCase() === channelId}
                        onClick={() => {
                          router.push(`/team/${channel.id}`);
                        }}
                      />
                    );
                  })}
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}
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

const NavHeaderMenu = () => {
  const onClickAdd = () => {
    openModal({
      title: "Add Team",
      children: <AddTeamForm />,
    });
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon size="lg">
          <IconDots size={16} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Team</Menu.Label>
        <Menu.Item icon={<IconPlus size={14} />} onClick={onClickAdd}>
          Add Team
        </Menu.Item>
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const AddTeamForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({ initialValues: { teamName: "" } });

  const onSubmitAddTeam = async (values: any) => {
    setIsLoading(true);

    try {
      await pb.collection(Collections.Teams).create({
        name: values.teamName,
      });

      showNotification({
        title: "Team added",
        message: `Team ${values.teamName} has been added`,
        icon: <IconCheck size={20} />,
        color: "green",
      });
      closeAllModals();
    } catch (error) {
      showNotification({
        title: "Failed to add team",
        message: (error as Error).message,
        icon: <IconX size={20} />,
        color: "red",
      });
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={form.onSubmit(onSubmitAddTeam)}>
      <TextInput
        label="New Team"
        placeholder="e.g. Release Team"
        data-autofocus
        required
        {...form.getInputProps("teamName")}
      />
      <Button fullWidth type="submit" mt="md" loading={isLoading}>
        Submit
      </Button>
    </form>
  );
};
