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
  Select,
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
import { ReactNode } from "react";
import {
  ChannelsResponse,
  ChannelsTypeOptions,
  TeamsRecord,
} from "~/../pocketbase.types";
import { getAuthModel } from "~/data/pocketbase";
import { useAddChannel, useAllChannels } from "~/domains/channels/channelData";
import { groupChannelsByTeam } from "~/domains/channels/channelDataUtils";
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

export const TeamNav = (props: { title: string }) => {
  const activeAccordion = useDiscussionStore((state) => state.activeAccordion);
  const router = useRouter();
  const channelId = router.query.channelId;

  const teams = useAllTeams();
  const channels = useAllChannels();

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
        offsetScrollbars
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
                <AccordionControl py="xs" teamId={item.id}>
                  {item.name}
                </AccordionControl>
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
                        active={channel.id === channelId}
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

function AccordionControl(props: AccordionControlProps & { teamId: string }) {
  const onClickAddChannel = () => {
    openModal({
      title: "Add Channel",
      children: <AddChannelForm teamId={props.teamId} />,
    });
  };

  const team = useAllTeams().data?.find((item) => item.id === props.teamId);

  const onClickEditTeam = () => {
    openModal({
      title: "Edit Team",
      children: <TeamForm team={team} />,
    });
  };

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

const AddChannelForm = (props: { teamId: string }) => {
  const form = useForm({
    initialValues: { channelName: "", type: "textRoom" as ChannelType },
  });
  const adder = useAddChannel();

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        adder.mutate({
          name: values.channelName,
          type: ChannelsTypeOptions[values.type],
          team: props.teamId,
        })
      )}
    >
      <TextInput
        label="New Team"
        placeholder="e.g. Release Team"
        data-autofocus
        required
        {...form.getInputProps("channelName")}
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
      <Button fullWidth type="submit" mt="lg" loading={adder.isLoading}>
        Submit
      </Button>
    </form>
  );
};
