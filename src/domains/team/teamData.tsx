import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { Collections, TeamsResponse } from "~/../pocketbase.types";
import { pb } from "~/data/pocketbase";

export const getAllTeams = () => {
  const orgId = pb.authStore.model?.organization;

  return useQuery({
    queryKey: [orgId],
    queryFn: () => {
      return pb.collection(Collections.Teams).getFullList<TeamsResponse>(100, {
        filter: `organization.id = '${orgId}'`,
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
