import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { ChannelsResponse, Collections } from "~/../pocketbase.types";
import { pb } from "~/data/pocketbase";
import { getAllTeams } from "~/domains/team/teamData";

export const getChannels = () => {
  const teams = getAllTeams();
  const teamIds = teams.data?.map((team) => team.id) ?? [];

  const filter = teamIds.map((teamId) => `team = '${teamId}'`).join(" || ");

  return useQuery({
    queryKey: [filter],
    enabled: teamIds.length > 0,
    queryFn: () => {
      return pb
        .collection(Collections.Channels)
        .getFullList<ChannelsResponse>(200, {
          filter: filter,
        });
    },
    onError: (error) => {
      showNotification({
        color: "red",
        title: "Failed to get channels",
        message: (error as Error).message,
        icon: <IconX size={16} />,
      });
    },
  });
};

export const groupChannelsByTeam = (channels: ChannelsResponse[]) => {
  const teams: Record<string, ChannelsResponse[]> = {};

  channels.forEach((channel) => {
    if (!teams[channel.team]) {
      teams[channel.team] = [];
    }

    teams[channel.team].push(channel);
  });

  return teams;
};
