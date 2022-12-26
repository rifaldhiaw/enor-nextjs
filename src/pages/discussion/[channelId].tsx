import { Box, CloseButton, Group, Text } from "@mantine/core";
import dynamic from "next/dynamic";
import router, { useRouter } from "next/router";
import { ReactNode } from "react";

import Loading from "~/components/common/Loading";
import { DiscussionLayout } from "~/components/discussion/DiscussionLayout";
import { navLinkData, NavLinkData } from "~/data/navlinkData";

const TextRoomView = dynamic(
  () =>
    import("~/components/textRoom/TextRoomView").then(
      (mod) => mod.TextRoomView
    ),
  { ssr: false, loading: () => <Loading /> }
);

const VoiceRoomView = dynamic(
  () =>
    import("~/components/voiceRoom/VoiceRoomView").then(
      (mod) => mod.VoiceRoomView
    ),
  { ssr: false, loading: () => <Loading /> }
);

const DrawBoardView = dynamic(
  () =>
    import("~/components/drawBoard/DrawBoardView").then(
      (mod) => mod.DrawBoardView
    ),
  { ssr: false, loading: () => <Loading /> }
);

const KanbanView = dynamic(
  () => import("~/components/kanban/KanbanView").then((mod) => mod.KanbanView),
  { ssr: false, loading: () => <Loading /> }
);

const RichDocView = dynamic(
  () =>
    import("~/components/richdoc/RichDocView").then((mod) => mod.RichDocView),
  { ssr: false, loading: () => <Loading /> }
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
