import { Flex, ScrollArea } from "@mantine/core";
import { ChannelHeader } from "../common/ChannelHeader";
import { KanbanTrashable } from "./KanbanTrashable";

export const KanbanView = () => {
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
