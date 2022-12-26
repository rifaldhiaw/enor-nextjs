import { Flex, Text } from "@mantine/core";
import { ReactNode } from "react";

export const ChannelHeader = (props: {
  title: string;
  icon: ReactNode;
  bg?: string;
  children?: ReactNode;
}) => {
  const selectedMenu = "Posts";

  return (
    <Flex
      align="center"
      gap={8}
      h="60px"
      bg={props.bg ?? "white"}
      p="md"
      sx={(theme) => ({
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[4]
        }`,
      })}
    >
      {props.icon}
      <Text
        sx={{
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        {props.title}
      </Text>
      {props.children}
    </Flex>
  );
};
