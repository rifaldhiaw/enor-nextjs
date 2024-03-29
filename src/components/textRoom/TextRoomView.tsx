import { Box, Flex, ScrollArea } from "@mantine/core";
import { useRouter } from "next/router";
import { PostInput } from "~/components/textRoom/PostInput";
import { PostReplyInput } from "~/components/textRoom/PostReplyInput";
import { UserList } from "~/components/textRoom/UserList";
import {
  useAllMessagesInChannel,
  useRealtimeMessagesInChannel,
} from "~/domains/message/messageData";
import { PostHeader } from "../../pages/team/[channelId]";
import { ChannelHeader } from "../common/ChannelHeader";
import { PostList } from "./PostList";
import { PostWithReplies } from "./PostWithReplies";

export const TextRoomView = () => {
  const router = useRouter();
  const channelId = router.query.channelId as string;
  const postId = router.query.postId as string;
  const posts = useAllMessagesInChannel(channelId);
  const selectedPost = posts.data?.find((p) => p.id === postId);

  useRealtimeMessagesInChannel(channelId);

  return (
    <Flex h="100%" bg="gray.0">
      <Box h="100%" sx={{ flex: 1 }}>
        <ChannelHeader />
        <Flex h="calc(100% - 60px)" direction="column">
          <Flex align="center" justify="center" h="0" sx={{ flex: 1 }}>
            <PostList focusPost={selectedPost?.id} />
          </Flex>
          <Box pl="48px" mb="lg" mt="sm" w="100%" maw="670px" mx="auto">
            <PostInput />
          </Box>
        </Flex>
      </Box>
      {selectedPost ? (
        <Box
          h="100%"
          w="400px"
          sx={{
            borderLeft: "1px solid #eaeaea",
          }}
        >
          <PostHeader />
          <Flex direction="column" h="calc(100% - 60px)">
            <ScrollArea h="0" sx={{ flex: 1 }}>
              <PostWithReplies message={selectedPost} />
            </ScrollArea>
            <Box px="md" mb="lg" mt="sm" w="100%" maw="650px" mx="auto">
              <PostReplyInput />
            </Box>
          </Flex>
        </Box>
      ) : (
        <Box
          h="100%"
          w="280px"
          sx={{
            borderLeft: "1px solid #eaeaea",
          }}
        >
          <PostHeader />
          <ScrollArea h="calc(100% - 60px)" p="md">
            <UserList />
          </ScrollArea>
        </Box>
      )}
    </Flex>
  );
};
