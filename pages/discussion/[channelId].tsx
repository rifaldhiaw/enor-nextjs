import { Box, Flex, Text } from "@mantine/core";
import { IconHash } from "@tabler/icons";
import { useRouter } from "next/router";
import { AppLayout } from "../../components/layouts/AppLayout";
import { PostList } from "../../components/Post";

const Channel = () => {
  const channelId = useRouter().query.channelId;

  if (typeof channelId !== "string") {
    return null;
  }

  return (
    <AppLayout activeNav="Discussion">
      <Flex
        direction="row"
        sx={{
          height: "calc(100vh - var(--mantine-header-height, 0px))",
          overflow: "auto",
        }}
      >
        <Flex
          sx={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              height: 60,
              position: "sticky",
              top: 0,
              zIndex: 10,
              backgroundColor: "white",
              borderBottom: "1px solid #dee2e6",
              borderRight: "1px solid #dee2e6",
            }}
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
                {channelId}
              </Text>
            </Flex>
          </Box>
          <PostList />
        </Flex>
      </Flex>
    </AppLayout>
  );
};

export default Channel;
