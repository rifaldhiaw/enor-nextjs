import { Box } from "@mantine/core";
import { ChannelHeader } from "../common/ChannelHeader";
import DrawBoard from "./DrawBoard";

export const DrawBoardView = () => {
  return (
    <Box h="100%">
      <ChannelHeader />
      <Box h="calc(100% - 60px)">
        <DrawBoard />
      </Box>
    </Box>
  );
};
