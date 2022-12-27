import { Flex, Text } from "@mantine/core";
import {
  IconChalkboard,
  IconFileDescription,
  IconHash,
  IconLayoutKanban,
  IconVolume,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { NavLinkData } from "~/data/navlinkData";
import { getChannels } from "~/domains/channels/channelData";

export const ChannelHeader = () => {
  const router = useRouter();
  const channelId = router.query.channelId as string;

  const channels = getChannels();
  const channel = channels.data?.find((c) => c.id === channelId);

  const iconByType: Record<NavLinkData["type"], ReactNode> = {
    textRoom: <IconHash />,
    voiceRoom: <IconVolume />,
    document: <IconFileDescription />,
    drawBoard: <IconChalkboard />,
    kanban: <IconLayoutKanban />,
  };

  return (
    <Flex
      align="center"
      gap={8}
      h="60px"
      bg="gray.0"
      p="md"
      sx={(theme) => ({
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[4]
        }`,
      })}
    >
      {iconByType[channel?.type ?? "textRoom"]}
      <Text
        sx={{
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        {channel?.name}
      </Text>
    </Flex>
  );
};
