import { Box } from "@mantine/core";
import { IconChalkboard } from "@tabler/icons";
import { useRouter } from "next/router";
import { ChannelHeader } from "../common/ChannelHeader";
import DrawBoard from "./DrawBoard";

export const DrawBoardView = () => {
  const router = useRouter();
  const channelId = router.query.channelId as string;

  return (
    <Box h="100%">
      <ChannelHeader title={channelId} icon={<IconChalkboard />} />
      <Box h="calc(100% - 60px)">
        <DrawBoard />
      </Box>
    </Box>
  );
};
