import { Divider, Stack } from "@mantine/core";
import { FC } from "react";
import { Post } from "../../data/discussion";
import { PostDetail } from "./Post";

export const PostWithReplies: FC<{ post: Post }> = (props) => {
  return (
    <Stack p="16px 0" bg={"white"} spacing={0}>
      <PostDetail {...props.post} onCommentClick={() => {}} />
      <Divider py="md" />
      <PostDetail {...props.post} onCommentClick={() => {}} />
      <PostDetail {...props.post} onCommentClick={() => {}} />
    </Stack>
  );
};
