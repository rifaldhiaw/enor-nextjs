import { Box, Flex, Stack } from "@mantine/core";
import { FC } from "react";
import { MessagesResponse, UsersRecord } from "~/../pocketbase.types";
import { useAllRepliesToMessage } from "~/domains/message/messageData";
import { PostDetail } from "./Post";

export const PostWithReplies: FC<{ message: MessagesResponse }> = ({
  message,
}) => {
  const replies = useAllRepliesToMessage(message.id);

  return (
    <Flex direction="column" gap="md" bg="white">
      <Box px="md" pt="md">
        <PostDetail
          postedAt={message.created}
          body={message.body as JSON}
          author={{
            name: message.expand?.user.name, //TODO: get user name
            image: (message.expand?.user as UsersRecord).avatar ?? "",
          }}
        />
      </Box>
      <Box h="12px" bg="gray.1" />
      <Stack spacing={0} px="md">
        {replies.data?.map((reply) => (
          <PostDetail
            key={reply.id}
            postedAt={reply.created}
            body={reply.body as JSON}
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
