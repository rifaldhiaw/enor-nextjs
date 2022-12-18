import { Box, Flex, Text } from "@mantine/core";
import { IconHash } from "@tabler/icons";
import { useRouter } from "next/router";
import { DiscussionLayout } from "../../components/layouts/DiscussionLayout";
import { PostList } from "../../components/Post";

const Channel = () => {
  const channelId = useRouter().query.channelId;

  if (typeof channelId !== "string") {
    return null;
  }

  return (
    <DiscussionLayout navTitle="Discussion">
      <ChannelHeader title={channelId} />
      <Box h="calc(100% - 60px)">
        <PostList />
      </Box>
    </DiscussionLayout>
  );
};

export const ChannelHeader = (props: { title: string }) => {
  return (
    <Box
      sx={(theme) => ({
        height: 60,
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "white",
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2]
        }`,
        borderRight: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2]
        }`,
      })}
      p="md"
    >
      <Flex align="center" gap={4}>
        <IconHash />
        <Text
          sx={{
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          {props.title}
        </Text>
      </Flex>
    </Box>
  );
};

export default Channel;
