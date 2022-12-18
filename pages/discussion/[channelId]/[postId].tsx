import { Box, CloseButton, Flex, Group, Text } from "@mantine/core";
import { IconHash } from "@tabler/icons";
import router, { useRouter } from "next/router";
import { AppLayout } from "../../../components/layouts/AppLayout";
import { PostList, PostWithReply } from "../../../components/Post";
import { post100 } from "../../../data/discussion";

const Channel = () => {
  const channelId = useRouter().query.channelId;
  const postId = useRouter().query.postId;

  if (typeof channelId !== "string" || typeof postId !== "string") {
    return null;
  }

  const selectedPost = post100.find((post) => post.id.toString() === postId);

  return (
    <AppLayout>
      <Group
        grow
        align="stretch"
        spacing={0}
        sx={{
          height: "calc(100vh - var(--mantine-header-height, 0px))",
        }}
      >
        <Flex direction="column">
          <Box
            sx={{
              height: 60,
              position: "sticky",
              top: 0,
              zIndex: 10,
              backgroundColor: "white",
              borderBottom: "1px solid #dee2e6",
              borderRight: "1px solid #dee2e6",
            }}
            p="md"
          >
            <Flex align="center" gap={4}>
              <IconHash />
              <Text
                sx={{
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                {channelId}
              </Text>
            </Flex>
          </Box>
          <PostList />
        </Flex>

        <Flex direction="column">
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

          {selectedPost && <PostWithReply post={selectedPost} />}
        </Flex>
      </Group>
    </AppLayout>
  );
};

export default Channel;
