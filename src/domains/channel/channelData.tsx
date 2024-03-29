import { closeAllModals } from "@mantine/modals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  ChannelsRecord,
  ChannelsResponse,
  Collections,
} from "~/../pocketbase.types";
import { pb } from "~/data/pocketbase";
import { useAllTeams } from "~/domains/team/teamData";
import {
  showErrorNotification,
  showSuccessNotification,
} from "~/utils/notificationUtils";

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
      showErrorNotification("Failed to get channels", (error as Error).message);
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
      showSuccessNotification("Channel added", `Channel has been added`);
      closeAllModals();
      queryClient.invalidateQueries({
        queryKey: ["useAllChannels"],
      });
    },
    onError: (error) => {
      showErrorNotification("Failed to add channel", (error as Error).message);
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
      showSuccessNotification("Channel updated", `Channel has been updated`);
      closeAllModals();
      queryClient.invalidateQueries({ queryKey: ["useAllChannels"] });
    },
    onError: (error) => {
      showErrorNotification(
        "Failed to update channel",
        (error as Error).message
      );
    },
  });
};
