import { Flex, Text } from "@mantine/core";
import { ReactNode } from "react";

export const ChannelHeader = (props: {
  title: string;
  icon: ReactNode;
  children?: ReactNode;
}) => {
  return (
    <Flex
      align="center"
      gap={4}
      h="60px"
      bg="white"
      p="md"
      sx={(theme) => ({
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2]
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
