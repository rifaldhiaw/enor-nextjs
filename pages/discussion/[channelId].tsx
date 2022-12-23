import {
  Box,
  Center,
  CloseButton,
  Flex,
  Group,
  Loader,
  Text,
} from "@mantine/core";
import { IconHash } from "@tabler/icons";
import dynamic from "next/dynamic";
import router, { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import { DiscussionLayout } from "../../components/discussion/DiscussionLayout";

import { post100 } from "../../data/discussion";
import { navLinkData, NavLinkData } from "../../data/navlinkData";
import {
  discussionStoreActions,
  useDiscussionStore,
} from "../../stores/discussionStore";

const PostList = dynamic(
  () =>
    import("../../components/discussion/PostList").then((mod) => mod.PostList),
  { ssr: false }
);
const PostWithReplies = dynamic(
  () =>
    import("../../components/discussion/PostWithReplies").then(
      (mod) => mod.PostWithReplies
    ),
  { ssr: false }
);

const DrawBoard = dynamic(
  () =>
    import("../../components/whiteboard/Whiteboard").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <Center h="100%">
        <Loader variant="dots" />
      </Center>
    ),
  }
);

const KanbanTrashable = dynamic(
  () =>
    import("../../components/kanban/KanbanTrashable").then(
      (mod) => mod.KanbanTrashable
    ),
  {
    ssr: false,
    loading: () => (
      <Center h="100%">
        <Loader variant="dots" />
      </Center>
    ),
  }
);

const RichDoc = dynamic(
  () => import("../../components/richdoc/RichDoc").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <Center h="100%">
        <Loader variant="dots" />
      </Center>
    ),
  }
);

export const Channel = () => {
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

  const viewByNavLink: Record<NavLinkData["type"], ReactNode> = {
    textRoom: <PostList focusPost={selectedPost?.id} />,
    voiceRoom: <Text>Voice Room</Text>,
    drawBoard: <DrawBoard />,
    document: <RichDoc />,
    kanban: <KanbanTrashable confirmDrop={false} />,
  };

  const getView = () => {
    const selectedNavLink = navLinkData.find(
      (navLink) => navLink.href === channelId
    );
    return viewByNavLink[selectedNavLink?.type ?? "textRoom"];
  };

  return (
    <DiscussionLayout navTitle="Discussion">
      <Box h="100%">
        <Box
          h="60px"
          bg="white"
          sx={(theme) => ({
            borderBottom: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[2]
            }`,
          })}
        >
          <ChannelHeader title={channelId ?? ""} />
        </Box>
        <Box h="calc(100% - 60px)" bg="white">
          {getView()}
        </Box>
      </Box>
    </DiscussionLayout>
  );
};

// {selectedPost && (
//   <Box h="100%" w="400px">
//     <PostHeader />
//     <ScrollArea h="calc(100% - 60px)">
//       <PostWithReplies post={selectedPost} />
//     </ScrollArea>
//   </Box>
// )}

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
    <Box p="md">
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
