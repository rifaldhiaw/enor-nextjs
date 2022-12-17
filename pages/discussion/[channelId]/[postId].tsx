import {
  AppShell,
  Box,
  CloseButton,
  Flex,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconHash } from "@tabler/icons";
import router, { useRouter } from "next/router";
import { AppNavbar } from "../../../components/layouts/AppNavbar";
import { PostList, PostWithReply } from "../../../components/Post";
import { post100 } from "../../../data/discussion";

const Channel = () => {
  const channelId = useRouter().query.channelId;
  const theme = useMantineTheme();

  if (typeof channelId !== "string") {
    return null;
  }

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          paddingTop: "calc(var(--mantine-header-height, 0px))",
          paddingRight: "calc(var(--mantine-aside-width, 0px))",
          paddingLeft: "calc(var(--mantine-navbar-width, 0px))",
          paddingBottom: 0,
        },
      }}
      layout="alt"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<AppNavbar opened={true} />}
    >
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
            gap: "16px",
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

        <Flex
          sx={{
            flex: 1,
            height: "100%",
            flexDirection: "column",
            gap: "16px",
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
            }}
            p="md"
          >
            <CloseButton
              onClick={() => {
                router.push("/discussion/channel");
              }}
            />
          </Box>

          <PostWithReply post={post100[0]} />
        </Flex>
      </Flex>
    </AppShell>
  );
};

export default Channel;
