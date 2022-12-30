import { Box, Center, Text } from "@mantine/core";
import { ChannelHeader } from "../common/ChannelHeader";

export const VoiceRoomView = () => {
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
