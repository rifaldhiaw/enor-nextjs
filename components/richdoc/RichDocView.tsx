import { Box } from "@mantine/core";
import { IconFileDescription } from "@tabler/icons";
import { useRouter } from "next/router";
import { ChannelHeader } from "../common/ChannelHeader";
import RichDoc from "./RichDoc";

export const RichDocView = () => {
  const router = useRouter();
  const channelId = router.query.channelId as string;

  return (
    <Box h="100%">
      <ChannelHeader title={channelId} icon={<IconFileDescription />} />
      <Box h="calc(100% - 60px)">
        <RichDoc />
      </Box>
    </Box>
  );
};
