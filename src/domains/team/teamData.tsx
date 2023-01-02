import { closeAllModals } from "@mantine/modals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChannelsTypeOptions,
  Collections,
  TeamsRecord,
  TeamsResponse,
} from "~/../pocketbase.types";
import { pb } from "~/data/pocketbase";
import { useAddChannel } from "~/domains/channel/channelData";
import {
  showErrorNotification,
  showSuccessNotification,
} from "~/utils/notificationUtils";

export const useAllTeams = () => {
  const orgId = pb.authStore.model?.organization;

  return useQuery({
    queryKey: ["useAllTeams", orgId],
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
      showErrorNotification("Failed to get teams", (error as Error).message);
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
      showSuccessNotification(
        "Team added",
        `Team ${newTeam.name} has been added`
      );
      closeAllModals();
      queryClient.invalidateQueries({
        queryKey: ["useAllTeams"],
      });

      addChannel.mutate({
        name: "general",
        team: newTeam.id,
        type: ChannelsTypeOptions["textRoom"],
      });
    },
    onError: (error) => {
      showErrorNotification("Failed to add team", (error as Error).message);
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
      showSuccessNotification(
        "Team updated",
        `Team ${newTeam.name} has been updated`
      );

      closeAllModals();
      queryClient.invalidateQueries({
        queryKey: ["useAllTeams"],
      });
    },
    onError: (error) => {
      showErrorNotification("Failed to update team", (error as Error).message);
    },
  });
};
