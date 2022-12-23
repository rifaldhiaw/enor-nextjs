import { Box, Center, CloseButton, Group, Loader, Text } from "@mantine/core";
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

const loader = () => (
  <Center h="100%">
    <Loader variant="dots" />
  </Center>
);

const TextRoomView = dynamic(
  () =>
    import("../../components/textRoom/TextRoomView").then(
      (mod) => mod.TextRoomView
    ),
  { ssr: false, loading: loader }
);

const DrawBoard = dynamic(
  () =>
    import("../../components/whiteboard/Whiteboard").then((mod) => mod.default),
  { ssr: false, loading: loader }
);

const KanbanView = dynamic(
  () =>
    import("../../components/kanban/KanbanView").then((mod) => mod.KanbanView),
  { ssr: false, loading: loader }
);

const RichDoc = dynamic(
  () => import("../../components/richdoc/RichDoc").then((mod) => mod.default),
  { ssr: false, loading: loader }
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
    textRoom: <TextRoomView />,
    voiceRoom: <Text>Voice Room</Text>,
    drawBoard: <DrawBoard />,
    document: <RichDoc />,
    kanban: <KanbanView />,
  };

  const getView = () => {
    const selectedNavLink = navLinkData.find(
      (navLink) => navLink.href === channelId
    );
    return viewByNavLink[selectedNavLink?.type ?? "textRoom"];
  };

  return (
    <DiscussionLayout navTitle="Discussion">
      <Box h="100%" bg="white">
        {getView()}
      </Box>
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

export default Channel;
