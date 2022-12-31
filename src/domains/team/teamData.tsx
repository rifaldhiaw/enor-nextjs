import { closeAllModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChannelsTypeOptions,
  Collections,
  TeamsRecord,
  TeamsResponse,
} from "~/../pocketbase.types";
import { pb } from "~/data/pocketbase";
import { useAddChannel } from "~/domains/channel/channelData";

export const useAllTeams = () => {
  const orgId = pb.authStore.model?.organization;

  return useQuery({
    queryKey: [Collections.Teams, orgId],
    queryFn: () => {
      return pb.collection(Collections.Teams).getFullList<TeamsResponse>(100, {
        filter: `organization.id = '${orgId}'`,
        sort: "name",
      });
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    networkMode: "offlineFirst",
    onError: (error) => {
      showNotification({
        color: "red",
        title: "Failed to get teams",
        message: (error as Error).message,
        icon: <IconX size={16} />,
      });
    },
  });
};

export const useAddTeam = () => {
  const queryClient = useQueryClient();
  const addChannel = useAddChannel();

  return useMutation({
    mutationFn: async (team: TeamsRecord): Promise<TeamsResponse> => {
      return pb.collection(Collections.Teams).create(team);
    },
    onSuccess: (newTeam) => {
      showNotification({
        title: `Team ${newTeam.name} added`,
        message: `Team ${newTeam.name} has been added`,
        icon: <IconCheck size={20} />,
        color: "green",
      });
      closeAllModals();
      queryClient.invalidateQueries({
        queryKey: [Collections.Teams],
      });

      addChannel.mutate({
        name: "general",
        team: newTeam.id,
        type: ChannelsTypeOptions["textRoom"],
      });
    },
    onError: (error) => {
      showNotification({
        title: "Failed to add team",
        message: (error as Error).message,
        icon: <IconX size={20} />,
        color: "red",
      });
    },
  });
};

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      team: TeamsRecord & { id: string }
    ): Promise<TeamsResponse> => {
      return pb.collection(Collections.Teams).update(team.id, team);
    },
    onSuccess: (newTeam) => {
      showNotification({
        title: `Team ${newTeam.name} updated`,
        message: `Team ${newTeam.name} has been updated`,
        icon: <IconCheck size={20} />,
        color: "green",
      });
      closeAllModals();
      queryClient.invalidateQueries({
        queryKey: [Collections.Teams],
      });
    },
    onError: (error) => {
      showNotification({
        title: "Failed to update team",
        message: (error as Error).message,
        icon: <IconX size={20} />,
        color: "red",
      });
    },
  });
};
