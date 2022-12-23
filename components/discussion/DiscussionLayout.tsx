import { Box, Flex } from "@mantine/core";
import dynamic from "next/dynamic";

import React from "react";
import { AppLayout } from "../app/AppLayout";

const DiscussionLayoutNav = dynamic(
  () => import("./DiscussionLayoutNav").then((mod) => mod.DiscussionLayoutNav),
  { ssr: false }
);

export const DiscussionLayout = (props: {
  children: React.ReactNode;
  navTitle: string;
}) => {
  return (
    <AppLayout activeNav={"Discussion"}>
      <Flex h="100vh" w="100%" id="layout">
        <Box
          id="nav"
          w="240px"
          sx={{
            flex: "none",
          }}
        >
          <DiscussionLayoutNav title={props.navTitle} />
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
