import { Flex, ScrollArea } from "@mantine/core";
import { useRouter } from "next/router";
import { ChannelHeader } from "../common/ChannelHeader";
import { KanbanTrashable } from "./KanbanTrashable";

export const KanbanView = () => {
  const router = useRouter();
  const channelId = router.query.channelId as string;

  return (
    <Flex h="100%" direction="column">
      <ChannelHeader />
      <ScrollArea
        sx={{
          flex: 1,
        }}
      >
        <KanbanTrashable confirmDrop={false} />
      </ScrollArea>
    </Flex>
  );
};
