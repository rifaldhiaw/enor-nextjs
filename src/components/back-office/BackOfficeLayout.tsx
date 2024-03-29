import { Box, Flex } from "@mantine/core";

import React from "react";
import { AppLayout } from "../app/AppLayout";
import { BackOfficeLayoutNav } from "./BackOfficeLayoutNav";

export const BackOfficeLayout = (props: {
  children: React.ReactNode;
  navTitle: string;
}) => {
  return (
    <AppLayout activeNav={"Back Office"}>
      <Flex h="100vh">
        <BackOfficeLayoutNav title={props.navTitle} />
        <Box
          p="md"
          bg="white"
          sx={{
            flex: 1,
          }}
        >
          {props.children}
        </Box>
      </Flex>
    </AppLayout>
  );
};
