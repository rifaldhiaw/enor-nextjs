import { closeAllModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  ChannelsRecord,
  ChannelsResponse,
  Collections,
} from "~/../pocketbase.types";
import { pb } from "~/data/pocketbase";
import { useAllTeams } from "~/domains/team/teamData";

export const useAllChannels = () => {
  const teams = useAllTeams();
  const teamIds = teams.data?.map((team) => team.id) ?? [];

  const filter = teamIds.map((teamId) => `team = '${teamId}'`).join(" || ");

  return useQuery({
    queryKey: ["useAllChannels", filter],
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

export const useCurrentChannel = () => {
  const channelId = useRouter().query.channelId;
  const channels = useAllChannels();
  return channels.data?.find((channel) => channel.id === channelId);
};

export const useAddChannel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (channel: ChannelsRecord) => {
      return pb.collection(Collections.Channels).create(channel);
    },
    onSuccess: () => {
      showNotification({
        title: "Channel added",
        message: `Channel has been added`,
        icon: <IconCheck size={20} />,
        color: "green",
      });
      closeAllModals();
      queryClient.invalidateQueries({
        queryKey: ["useAllChannels"],
      });
    },
    onError: (error) => {
      showNotification({
        title: "Failed to add channel",
        message: (error as Error).message,
        icon: <IconX size={20} />,
        color: "red",
      });
    },
  });
};

export const useUpdateChannel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      channel: ChannelsRecord & { id: string }
    ): Promise<ChannelsRecord> => {
      return pb.collection(Collections.Channels).update(channel.id, channel);
    },
    onSuccess: () => {
      showNotification({
        title: "Channel updated",
        message: `Channel has been updated`,
        icon: <IconCheck size={20} />,
        color: "green",
      });
      closeAllModals();
      queryClient.invalidateQueries({ queryKey: ["useAllChannels"] });
    },
    onError: (error) => {
      showNotification({
        title: "Failed to update channel",
        message: (error as Error).message,
        icon: <IconX size={20} />,
        color: "red",
      });
    },
  });
};
