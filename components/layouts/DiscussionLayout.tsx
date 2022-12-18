import { Flex } from "@mantine/core";
import dynamic from "next/dynamic";

import React from "react";
import { Expanded } from "../utils/Expanded";
import { AppLayout } from "./AppLayout";

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
      <Flex h="100vh">
        <DiscussionLayoutNav title={props.navTitle} />
        <Expanded>{props.children}</Expanded>
      </Flex>
    </AppLayout>
  );
};
