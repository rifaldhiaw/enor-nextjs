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
import { useAddChannel } from "~/domains/channels/channelData";

export const getAllTeams = () => {
  const orgId = pb.authStore.model?.organization;

  return useQuery({
    queryKey: [Collections.Teams, orgId],
    queryFn: () => {
      return pb.collection(Collections.Teams).getFullList<TeamsResponse>(100, {
        filter: `organization.id = '${orgId}'`,
        sort: "name",
      });
    },
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
    mutationFn: async (
      team: Omit<TeamsRecord, "organization">
    ): Promise<TeamsResponse> => {
      return pb.collection(Collections.Teams).create({
        name: team.name,
        organization: pb.authStore.model?.organization,
      });
    },
    onSuccess: (newTeam) => {
      showNotification({
        title: "Team added",
        message: `Team has been added`,
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
