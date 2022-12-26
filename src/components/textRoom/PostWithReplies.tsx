import { Divider, Flex, Stack } from "@mantine/core";
import { FC } from "react";
import { Post } from "../../data/discussion";
import { PostDetail } from "./Post";

const arr = new Array(20).fill(0);

export const PostWithReplies: FC<{ post: Post }> = (props) => {
  return (
    <Flex direction="column" p="16px 0" gap="md" bg="gray.1">
      <PostDetail {...props.post} />
      <Divider />
      <Stack spacing={0}>
        {arr.map((_, i) => (
          <PostDetail key={i} {...props.post} />
        ))}
      </Stack>
    </Flex>
  );
};
