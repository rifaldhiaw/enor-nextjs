import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Descendant } from "slate";
import {
  Collections,
  MessagesRecord,
  MessagesResponse,
} from "~/../pocketbase.types";
import { pb } from "~/data/pocketbase";

export const useAllMessagesInChannel = (channelId: string) => {
  return useQuery({
    queryKey: [channelId],
    enabled: !!channelId,
    queryFn: () => {
      return pb
        .collection(Collections.Messages)
        .getFullList<MessagesResponse<Descendant[], unknown>>(200, {
          filter: `channel.id = '${channelId}' && parent.id = ''`,
          expand: "user",
          sort: "created",
        });
    },
    onError: (error) => {
      showNotification({
        color: "red",
        title: "Failed to get messages",
        message: (error as Error).message,
        icon: <IconX size={16} />,
      });
    },
  });
};

export const useAllRepliesToMessage = (messageId: string) => {
  return useQuery({
    queryKey: [messageId],
    enabled: !!messageId,
    queryFn: () => {
      return pb
        .collection(Collections.Messages)
        .getFullList<MessagesResponse<Descendant[], unknown>>(200, {
          filter: `parent.id = '${messageId}'`,
          expand: "user",
          sort: "created",
        });
    },
    onError: (error) => {
      showNotification({
        color: "red",
        title: "Failed to get replies",
        message: (error as Error).message,
        icon: <IconX size={16} />,
      });
    },
  });
};

export const useAddMessage = (parentMessageId?: string) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const channelId = router.query.channelId as string;

  return useMutation({
    mutationFn: (message: MessagesRecord) => {
      return pb.collection(Collections.Messages).create(message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes(channelId) ||
          query.queryKey.includes(parentMessageId),
      });
    },
    onError: (error) => {
      showNotification({
        color: "red",
        title: "Failed to add message",
        message: (error as Error).message,
        icon: <IconX size={16} />,
      });
    },
  });
};
