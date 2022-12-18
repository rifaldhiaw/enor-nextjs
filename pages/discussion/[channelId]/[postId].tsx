import { Box, CloseButton, Group, ScrollArea } from "@mantine/core";
import router, { useRouter } from "next/router";
import { DiscussionLayout } from "../../../components/layouts/DiscussionLayout";
import { PostList, PostWithReply } from "../../../components/Post";
import { post100 } from "../../../data/discussion";
import { ChannelHeader } from "../[channelId]";

const Channel = () => {
  const channelId = useRouter().query.channelId;
  const postId = useRouter().query.postId;

  if (typeof channelId !== "string" || typeof postId !== "string") {
    return null;
  }

  const selectedPost = post100.find((post) => post.id.toString() === postId);

  return (
    <DiscussionLayout navTitle="Discussion">
      <Group grow align="stretch" spacing={0} h="100%">
        <Box h="100%">
          <ChannelHeader title={channelId} />
          <Box h="calc(100% - 60px)">
            <PostList />
          </Box>
        </Box>

        <Box h="100%">
          <PostHeader />
          <ScrollArea h="calc(100% - 60px)">
            {selectedPost && <PostWithReply post={selectedPost} />}
          </ScrollArea>
        </Box>
      </Group>
    </DiscussionLayout>
  );
};

export const PostHeader = () => {
  return (
    <Box
      sx={{
        height: 60,
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "white",
        borderBottom: "1px solid #dee2e6",
      }}
      p="md"
    >
      <CloseButton
        size="lg"
        onClick={() => {
          router.push("/discussion/channel");
        }}
      />
    </Box>
  );
};

export default Channel;
