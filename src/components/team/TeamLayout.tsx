import { Box, Flex } from "@mantine/core";
import dynamic from "next/dynamic";
import { AppLayout } from "../app/AppLayout";
import Loading from "../common/Loading";

const TeamNav = dynamic(() => import("./TeamNav").then((mod) => mod.TeamNav), {
  ssr: false,
  loading: () => <Loading />,
});

export const DiscussionLayout = (props: {
  children: React.ReactNode;
  navTitle: string;
}) => {
  return (
    <AppLayout activeNav={"Team"}>
      <Flex h="100vh" w="100%" id="layout">
        <Box
          id="nav"
          w="260px"
          sx={{
            flex: "none",
          }}
        >
          <TeamNav title={props.navTitle} />
        </Box>
        <Box
          id="content"
          sx={{
            flex: 1,
            overflow: "auto",
          }}
        >
          {props.children}
        </Box>
      </Flex>
    </AppLayout>
  );
};
