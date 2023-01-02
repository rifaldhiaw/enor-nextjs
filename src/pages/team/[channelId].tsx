import { Box, CloseButton, Group, Text } from "@mantine/core";
import dynamic from "next/dynamic";
import router, { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";

import Loading from "~/components/common/Loading";
import { DiscussionLayout } from "~/components/team/TeamLayout";
import { NavLinkData } from "~/data/navlinkData";
import { useCurrentChannel } from "~/domains/channel/channelData";

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
  const channel = useCurrentChannel();

  // useMemo of code above
  const view = useMemo(() => {
    if (!channel) return null;
    const viewByNavLink: Record<NavLinkData["type"], ReactNode> = {
      textRoom: <TextRoomView />,
      voiceRoom: <VoiceRoomView />,
      drawBoard: <DrawBoardView />,
      document: <RichDocView />,
      kanban: <KanbanView />,
    };

    return viewByNavLink[channel.type];
  }, [channel]);

  return (
    <DiscussionLayout navTitle="Discussion">
      <Box h="100%" bg="white">
        {view}
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
            router.push(`/team/${channelId}`);
          }}
        />
        <Text fw="bold">Thread</Text>
      </Group>
    </Box>
  );
};

export default Channel;
