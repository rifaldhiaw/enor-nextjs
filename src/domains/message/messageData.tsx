import { usePrevious } from "@dnd-kit/utilities";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ChannelsRecord,
  Collections,
  MessagesRecord,
  MessagesResponse,
} from "~/../pocketbase.types";
import { pb } from "~/data/pocketbase";

export const useAllMessagesInChannel = (channelId: string) => {
  return useQuery({
    queryKey: ["useAllMessagesInChannel", channelId],
    enabled: !!channelId,
    queryFn: () => {
      return pb
        .collection(Collections.Messages)
        .getFullList<MessagesResponse>(200, {
          filter: `channel.id = '${channelId}' && parent.id = ''`,
          expand: "user",
          sort: "created",
          $cancelKey: "useAllMessagesInChannel",
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
    queryKey: ["useAllRepliesToMessage", messageId],
    enabled: !!messageId,
    queryFn: () => {
      return pb
        .collection(Collections.Messages)
        .getFullList<MessagesResponse>(200, {
          filter: `parent.id = '${messageId}'`,
          expand: "user",
          sort: "created",
          $cancelKey: "useAllRepliesToMessage",
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

export const useAddMessage = () => {
  return useMutation({
    mutationFn: (message: MessagesRecord) => {
      return pb.collection(Collections.Messages).create(message);
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

export const useRealtimeRepliesToMessage = (message: MessagesResponse) => {
  const initialReplyCount = message.replySummary?.count ?? 0;
  const [replyCount, setReplyCount] = useState(initialReplyCount);
  const prevReplyCount = usePrevious(replyCount);

  /**
   * If the message id changes, reset the reply count
   */
  useEffect(() => {
    setReplyCount(0);
  }, [message.id]);

  const queryClient = useQueryClient();

  /**
   * If the reply count is updated, invalidate the replies query
   */
  useEffect(() => {
    if (prevReplyCount === undefined) return;
    if (replyCount <= prevReplyCount) return;

    queryClient.invalidateQueries({
      queryKey: ["useAllMessagesInChannel", message.channel],
    });
    queryClient.invalidateQueries({
      queryKey: ["useAllRepliesToMessage", message.id],
    });
  }, [message.channel, message.id, prevReplyCount, queryClient, replyCount]);

  /**
   * Subscribe to message updates
   */
  useEffect(() => {
    pb.collection(Collections.Messages).subscribe<MessagesResponse>(
      message.id,
      (e) => {
        const count = e.record.replySummary?.count ?? 0;
        setReplyCount(count);
      }
    );

    return () => {
      pb.collection(Collections.Messages).unsubscribe(message.id);
    };
  }, [message.id, queryClient]);
};

export const useRealtimeMessagesInChannel = (channelId: string) => {
  const [msgClock, setMsgClock] = useState(0);
  const prevClock = usePrevious(msgClock);

  const queryClient = useQueryClient();

  /**
   * If the clock is updated, invalidate the messages query
   */
  useEffect(() => {
    if (prevClock === undefined) return;
    if (msgClock > prevClock) {
      queryClient.invalidateQueries({
        queryKey: ["useAllMessagesInChannel", channelId],
      });
    }
  }, [channelId, msgClock, prevClock, queryClient]);

  /**
   * Subscribe to channel updates
   */
  useEffect(() => {
    if (!channelId) return;

    pb.collection(Collections.Channels).subscribe<ChannelsRecord>(
      channelId,
      (e) => {
        const newClock = e.record.lastMessageClock ?? 0;
        setMsgClock(newClock);
      }
    );

    return () => {
      pb.collection(Collections.Channels).unsubscribe(channelId);
    };
  }, [channelId]);
};
