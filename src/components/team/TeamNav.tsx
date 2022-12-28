import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  Button,
  createStyles,
  Flex,
  Menu,
  NavLink,
  Paper,
  ScrollArea,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { openModal } from "@mantine/modals";
import {
  IconChalkboard,
  IconDots,
  IconFileDescription,
  IconHash,
  IconLayoutKanban,
  IconNote,
  IconPencil,
  IconPlus,
  IconReportAnalytics,
  IconSettings,
  IconTrash,
  IconVolume,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import {
  ChannelsRecord,
  ChannelsResponse,
  ChannelsTypeOptions,
  TeamsRecord,
} from "~/../pocketbase.types";
import { getAuthModel } from "~/data/pocketbase";
import {
  useAddChannel,
  useAllChannels,
  useUpdateChannel,
} from "~/domains/channel/channelData";
import { groupChannelsByTeam } from "~/domains/channel/channelDataUtils";
import {
  useAddTeam,
  useAllTeams,
  useUpdateTeam,
} from "~/domains/team/teamData";
import { ChannelType, channelTypes, NavLinkData } from "../../data/navlinkData";
import {
  discussionStoreActions,
  useDiscussionStore,
} from "../../stores/discussionStore";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
  },

  item: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
    border: "1px solid transparent",
    transition: "margin 150ms ease",
    margin: theme.spacing.sm,

    "&[data-active]": {
      margin: "0",
      marginTop: theme.spacing.xs,
      marginBottom: theme.spacing.xs,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },

  chevron: {
    "&[data-rotate]": {
      transform: "rotate(-90deg)",
    },
  },
}));

export const TeamNav = (props: { title: string }) => {
  const activeAccordion = useDiscussionStore((state) => state.activeAccordion);
  const router = useRouter();
  const channelId = router.query.channelId;

  const teams = useAllTeams();
  const channels = useAllChannels();

  const channelsByTeam = groupChannelsByTeam(channels.data ?? []);

  const { classes } = useStyles();

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
          variant="filled"
          classNames={classes}
          className={classes.root}
        >
          {teams.data?.map((item) => {
            const channels = channelsByTeam[item.id];

            return (
              <Accordion.Item my="sm" key={item.id} value={item.id}>
                <AccordionControl py="xs" teamId={item.id}>
                  <Text fz="xs" color="gray.7">
                    {item.name}
                  </Text>
                </AccordionControl>
                <Accordion.Panel>
                  {channels?.map((channel: ChannelsResponse) => {
                    return (
                      <ChannelItem
                        key={channel.id}
                        channel={channel}
                        teamId={item.id}
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

const ChannelItem = (props: { channel: ChannelsResponse; teamId: string }) => {
  const router = useRouter();
  const activeChannelId = router.query.channelId;

  const { channel, teamId } = props;
  const [visible, setVisible] = useState(false);

  const iconByType: Record<NavLinkData["type"], ReactNode> = {
    textRoom: <IconHash size={16} stroke={1.5} />,
    voiceRoom: <IconVolume size={16} stroke={1.5} />,
    document: <IconFileDescription size={16} stroke={1.5} />,
    drawBoard: <IconChalkboard size={16} stroke={1.5} />,
    kanban: <IconLayoutKanban size={16} stroke={1.5} />,
  };

  const onClickEditChannel = () => {
    setVisible(false);
    openModal({
      title: "Edit Channel",
      children: <ChannelForm teamId={teamId} channel={channel} />,
    });
  };

  return (
    <Flex
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <NavLink
        key={channel.id}
        h={32}
        icon={iconByType[channel.type]}
        label={channel.name}
        active={channel.id === activeChannelId}
        onClick={() => {
          router.push(`/team/${channel.id}`);
        }}
      />
      <Menu transition="pop" withArrow position="bottom-end">
        {visible && (
          <Menu.Target>
            <ActionIcon size="md">
              <IconDots size={14} />
            </ActionIcon>
          </Menu.Target>
        )}
        <Menu.Dropdown>
          <Menu.Item
            icon={<IconPencil size={14} />}
            onClick={onClickEditChannel}
          >
            Edit Channel
          </Menu.Item>
          <Menu.Item icon={<IconTrash size={16} stroke={1.5} />} color="red">
            Archive Team
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

function AccordionControl(props: AccordionControlProps & { teamId: string }) {
  // menu button visible state
  const [visible, setVisible] = useState(false);

  const onClickAddChannel = () => {
    setVisible(false);
    openModal({
      title: "Add Channel",
      children: <ChannelForm teamId={props.teamId} />,
    });
  };

  const team = useAllTeams().data?.find((item) => item.id === props.teamId);

  const onClickEditTeam = () => {
    setVisible(false);
    openModal({
      title: "Edit Team",
      children: <TeamForm team={team} />,
    });
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Accordion.Control {...props} />
      <Menu transition="pop" withArrow position="bottom-end">
        {visible && (
          <Menu.Target>
            <ActionIcon size="md">
              <IconDots size={14} />
            </ActionIcon>
          </Menu.Target>
        )}
        <Menu.Dropdown>
          <Menu.Item icon={<IconPlus size={14} />} onClick={onClickAddChannel}>
            Add Channel
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item icon={<IconPencil size={14} />} onClick={onClickEditTeam}>
            Edit Team
          </Menu.Item>
          <Menu.Item icon={<IconNote size={16} stroke={1.5} />}>
            Add note
          </Menu.Item>
          <Menu.Item icon={<IconReportAnalytics size={16} stroke={1.5} />}>
            Analytics
          </Menu.Item>
          <Menu.Item icon={<IconTrash size={16} stroke={1.5} />} color="red">
            Archive Team
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}

const NavHeaderMenu = () => {
  const onClickAddTeam = () => {
    openModal({
      title: "Add Team",
      children: <TeamForm />,
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
        <Menu.Item icon={<IconPlus size={14} />} onClick={onClickAddTeam}>
          Add Team
        </Menu.Item>
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const TeamForm = (props: { team?: TeamsRecord & { id: string } }) => {
  const form = useForm({
    initialValues: props.team ?? {
      name: "",
      organization: getAuthModel()?.organization ?? "",
    },
  });

  const addTeam = useAddTeam();
  const updateTeam = useUpdateTeam();

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        if (props.team) {
          return updateTeam.mutate({
            id: props.team.id,
            name: values.name,
            organization: values.organization,
          });
        } else {
          addTeam.mutate({
            name: values.name,
            organization: values.organization,
          });
        }
      })}
    >
      <TextInput
        label="New Team"
        placeholder="e.g. Release Team"
        data-autofocus
        required
        {...form.getInputProps("name")}
      />
      <Button fullWidth type="submit" mt="md" loading={addTeam.isLoading}>
        Submit
      </Button>
    </form>
  );
};

const ChannelForm = (props: {
  teamId: string;
  channel?: ChannelsRecord & { id: string };
}) => {
  const form = useForm({
    initialValues: props.channel ?? {
      name: "",
      type: "textRoom" as ChannelType,
    },
  });

  const addChannel = useAddChannel();
  const updateChannel = useUpdateChannel();

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        if (props.channel) {
          return updateChannel.mutate({
            id: props.channel.id,
            team: props.teamId,
            name: values.name,
            type: ChannelsTypeOptions[values.type],
          });
        } else {
          addChannel.mutate({
            team: props.teamId,
            name: values.name,
            type: ChannelsTypeOptions[values.type],
          });
        }
      })}
    >
      <TextInput
        label="New Team"
        placeholder="e.g. Release Team"
        data-autofocus
        required
        {...form.getInputProps("name")}
      />
      <Select
        label="Channel Type"
        placeholder="Pick one"
        mt="sm"
        data={channelTypes.map((item) => ({
          label: item,
          value: item,
        }))}
        {...form.getInputProps("type")}
      />
      <Button fullWidth type="submit" mt="lg" loading={addChannel.isLoading}>
        Submit
      </Button>
    </form>
  );
};
