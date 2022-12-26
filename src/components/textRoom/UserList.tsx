import { Avatar, Box, Flex, Group, Indicator, Text } from "@mantine/core";

// 100 users
const users = new Array(8).fill(0).map((_, i) => ({
  name: `User ${i}`,
  status: "In a meeting",
  image:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  isOnline: true,
}));

export const UserList = () => {
  return (
    <Flex direction="column" p="16px 0" gap="lg">
      {users.map((user) => (
        <UserSingle
          key={user.name}
          name={user.name}
          status={user.status}
          image={user.image}
          isOnline={user.isOnline}
        />
      ))}
    </Flex>
  );
};

export const UserSingle = (props: {
  name: string;
  status: string;
  image: string;
  isOnline: boolean;
}) => {
  return (
    <Group spacing="sm">
      <Indicator
        dot
        inline
        size={12}
        offset={7}
        position="bottom-end"
        color="green"
        withBorder
      >
        <Avatar
          size="md"
          radius="xl"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        />
      </Indicator>
      <Box>
        <Text size="sm" weight={500}>
          {props.name}
        </Text>
        <Text size={12} color="gray.7">
          {props.status}
        </Text>
      </Box>
    </Group>
  );
};
