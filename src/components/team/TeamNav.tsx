import {
  ActionIcon,
  Button,
  Flex,
  Menu,
  Paper,
  ScrollArea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { openModal } from "@mantine/modals";
import { IconDots, IconPlus, IconSettings } from "@tabler/icons";
import { TeamsRecord } from "~/../pocketbase.types";
import { TeamAccordion } from "~/components/team/TeamAccordion";
import { getAuthModel } from "~/data/pocketbase";
import { useAddTeam, useUpdateTeam } from "~/domains/team/teamData";

export const TeamNav = (props: { title: string }) => {
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
        <TeamAccordion />
      </ScrollArea>
    </Paper>
  );
};

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
