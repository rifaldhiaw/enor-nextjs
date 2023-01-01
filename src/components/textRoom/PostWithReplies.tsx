import { Box, Flex, Stack } from "@mantine/core";
import { FC } from "react";
import { Descendant } from "slate";
import { MessagesResponse, UsersRecord } from "~/../pocketbase.types";
import { emptySlateContent } from "~/components/slate/SlateComponent";
import {
  useAllRepliesToMessage,
  useRealtimeRepliesToMessage,
} from "~/domains/message/messageData";
import { PostDetail } from "./Post";

export const PostWithReplies: FC<{
  message: MessagesResponse<Descendant[]>;
}> = ({ message }) => {
  const replies = useAllRepliesToMessage(message.id);

  useRealtimeRepliesToMessage(message);

  return (
    <Flex direction="column" gap="md" bg="white">
      <Box px="md" pt="md">
        <PostDetail
          postedAt={message.created}
          body={message.body ?? emptySlateContent}
          author={{
            name: message.expand?.user.name, //TODO: get user name
            image: (message.expand?.user as UsersRecord).avatar ?? "",
          }}
        />
      </Box>
      <Box h="12px" bg="gray.1" />
      <Stack spacing={0} px="md" pb="md">
        {replies.data?.map((reply) => (
          <PostDetail
            key={reply.id}
            postedAt={reply.created}
            body={reply.body ?? emptySlateContent}
            author={{
              name: reply.expand?.user.name, //TODO: get user name
              image: (reply.expand?.user as UsersRecord).avatar ?? "",
            }}
          />
        ))}
      </Stack>
    </Flex>
  );
};
