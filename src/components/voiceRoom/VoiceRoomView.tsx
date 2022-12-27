import { Box, Center, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { ChannelHeader } from "../common/ChannelHeader";

export const VoiceRoomView = () => {
  const router = useRouter();
  const channelId = router.query.channelId as string;

  return (
    <Box h="100%">
      <ChannelHeader />
      <Box h="calc(100% - 60px)">
        <Center h="100%">
          <Text color="gray.4" fz={48} fw="bold">
            Audio
          </Text>
        </Center>
      </Box>
    </Box>
  );
};
