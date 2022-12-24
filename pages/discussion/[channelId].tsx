import { Box, Center, CloseButton, Group, Loader, Text } from "@mantine/core";
import dynamic from "next/dynamic";
import router, { useRouter } from "next/router";
import { ReactNode } from "react";

import { DiscussionLayout } from "../../components/discussion/DiscussionLayout";

import { navLinkData, NavLinkData } from "../../data/navlinkData";

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

const VoiceRoomView = dynamic(
  () =>
    import("../../components/voiceRoom/VoiceRoomView").then(
      (mod) => mod.VoiceRoomView
    ),
  { ssr: false, loading: loader }
);

const DrawBoardView = dynamic(
  () =>
    import("../../components/drawBoard/DrawBoardView").then(
      (mod) => mod.DrawBoardView
    ),
  { ssr: false, loading: loader }
);

const KanbanView = dynamic(
  () =>
    import("../../components/kanban/KanbanView").then((mod) => mod.KanbanView),
  { ssr: false, loading: loader }
);

const RichDocView = dynamic(
  () =>
    import("../../components/richdoc/RichDocView").then(
      (mod) => mod.RichDocView
    ),
  { ssr: false, loading: loader }
);

export const Channel = () => {
  const channelId = useRouter().query.channelId as string | undefined;

  const viewByNavLink: Record<NavLinkData["type"], ReactNode> = {
    textRoom: <TextRoomView />,
    voiceRoom: <VoiceRoomView />,
    drawBoard: <DrawBoardView />,
    document: <RichDocView />,
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
            router.push(`/discussion/${channelId}`);
          }}
        />
        <Text fw="bold">Thread</Text>
      </Group>
    </Box>
  );
};

export default Channel;
