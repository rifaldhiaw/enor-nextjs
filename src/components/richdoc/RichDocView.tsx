import { Box } from "@mantine/core";
import { ChannelHeader } from "../common/ChannelHeader";
import RichDoc from "./RichDoc";

export const RichDocView = () => {
  return (
    <Box h="100%">
      <ChannelHeader />
      <Box h="calc(100% - 60px)">
        <RichDoc />
      </Box>
    </Box>
  );
};
