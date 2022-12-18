import {
  Box,
  CloseButton,
  Flex,
  Group,
  LoadingOverlay,
  ScrollArea,
  Text,
} from "@mantine/core";
import { IconHash } from "@tabler/icons";
import router, { useRouter } from "next/router";
import { useEffect } from "react";
import { PostList } from "../../components/discussion/PostList";
import { PostWithReplies } from "../../components/discussion/PostWithReplies";
import { DiscussionLayout } from "../../components/layouts/DiscussionLayout";
import { post100 } from "../../domains/discussion/discussion";
import {
  discussionStoreActions,
  useDiscussionStore,
} from "../../domains/discussion/discussionStore";

const Channel = () => {
  const channelId = useRouter().query.channelId as string | undefined;
  const postId = useRouter().query.postId as string | undefined;

  const showOverlay = useDiscussionStore((state) => state.showPostOverlay);

  // hide overlay after 500ms
  useEffect(() => {
    if (showOverlay) {
      const timeout = setTimeout(() => {
        discussionStoreActions.setShowPostOverlay(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [showOverlay]);

  const selectedPost = post100.find((post) => post.id.toString() === postId);

  return (
    <DiscussionLayout navTitle="Discussion">
      <Group align="stretch" spacing={0} h="100%">
        <Box
          h="100%"
          sx={{
            flex: 1,
          }}
        >
          <ChannelHeader title={channelId ?? ""} />
          <Box h="calc(100% - 60px)" pos="relative">
            <LoadingOverlay
              visible={showOverlay}
              overlayBlur={5}
              transitionDuration={0}
            />
            <PostList focusPost={postId} />
          </Box>
        </Box>

        {selectedPost && (
          <Box h="100%" w="400px">
            <PostHeader />
            <ScrollArea h="calc(100% - 60px)">
              <PostWithReplies post={selectedPost} />
            </ScrollArea>
          </Box>
        )}
      </Group>
    </DiscussionLayout>
  );
};

export const PostHeader = () => {
  const channelId = useRouter().query.channelId;

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
      <Group spacing="sm">
        <CloseButton
          size="lg"
          onClick={() => {
            discussionStoreActions.setShowPostOverlay(true);
            router.push(`/discussion/${channelId}`);
          }}
        />
        <Text fw="bold">Thread</Text>
      </Group>
    </Box>
  );
};

export const ChannelHeader = (props: { title: string }) => {
  return (
    <Box
      sx={(theme) => ({
        height: 60,
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "white",
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2]
        }`,
        borderRight: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2]
        }`,
      })}
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
          {props.title}
        </Text>
      </Flex>
    </Box>
  );
};

export default Channel;
