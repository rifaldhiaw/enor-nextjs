import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  createStyles,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { usePrevious } from "@mantine/hooks";
import {
  IconDotsVertical,
  IconMoodSmile,
  IconPencil,
  IconShare,
} from "@tabler/icons";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import { Post, post100 } from "../data/discussion";
import { discussionStoreActions } from "../stores/discussionStore";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
  },
}));

interface PostDetailProps {
  postedAt: string;
  body: string;
  selected?: boolean;
  onCommentClick: () => void;
  author: {
    name: string;
    image: string;
  };
}

export function PostDetail({
  postedAt,
  body,
  author,
  selected,
  onCommentClick,
}: PostDetailProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  // show actions on hover
  const [showAcitons, setShowActions] = useState(false);

  return (
    <Box
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      mb="sm"
      sx={{
        padding: "8px 16px",
        position: "relative",
        boxShadow: selected
          ? "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px"
          : "none",
      }}
    >
      <Group>
        <Avatar src={author.image} alt={author.name} radius="xl" />
        <div>
          <Text size="sm">{author.name}</Text>
          <Text size="xs" color="dimmed">
            {postedAt}
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {body}
      </Text>
      <Flex pl={40} align="center">
        <Button size="xs" variant="subtle" onClick={onCommentClick}>
          36 Comments
        </Button>
        <ActionIcon
          color="blue"
          variant="subtle"
          sx={{
            borderRadius: "50%",
          }}
        >
          <em-emoji id="+1"></em-emoji>
        </ActionIcon>
        {/* action icon to add new emoji */}
        {showAcitons && (
          <ActionIcon
            sx={{
              borderRadius: "50%",
            }}
          >
            <IconMoodSmile size="16" />
          </ActionIcon>
        )}
      </Flex>

      {/* post actions section */}
      {showAcitons && (
        <Flex
          right={32}
          top={-8}
          sx={{
            position: "absolute",
            borderRadius: "16px",
            padding: "2px 8px",
            boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : "white",
          }}
        >
          {/* emoji reaction button */}
          <ActionIcon
            sx={{
              borderRadius: "50%",
            }}
          >
            <IconMoodSmile size="16" />
          </ActionIcon>
          <ActionIcon
            sx={{
              borderRadius: "50%",
            }}
          >
            <IconPencil size="16" />
          </ActionIcon>
          <ActionIcon
            sx={{
              borderRadius: "50%",
            }}
          >
            <IconShare size="16" />
          </ActionIcon>
          <ActionIcon
            sx={{
              borderRadius: "50%",
            }}
          >
            <IconDotsVertical size="16" />
          </ActionIcon>
        </Flex>
      )}
    </Box>
  );
}

export const PostList = (props: { focusPost?: string }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const channelId = router.query.channelId as string;

  // previous post id with usePrevious hook
  const prevPostId = usePrevious(props.focusPost);

  const virtualizer = useVirtualizer({
    count: post100.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 10,
  });

  useEffect(() => {
    if (!props.focusPost) return;

    const targetId = props.focusPost ? props.focusPost : prevPostId;
    const index = post100.findIndex((post) => post.id === targetId);
    if (index === -1) return;

    // timeout for the virtualizer to render the post
    const id = setTimeout(() => {
      virtualizer.scrollToIndex(index, {
        align: "start",
      });
    }, 50);

    return () => clearTimeout(id);
  }, [!!props.focusPost]);

  return (
    <Box
      ref={parentRef}
      bg="white"
      w="100%"
      h="100%"
      py="lg"
      style={{
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const post = post100[virtualItem.index];

          return (
            <Box
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              sx={(theme) => ({
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              })}
            >
              <PostDetail
                {...post100[virtualItem.index]}
                selected={post.id === props.focusPost}
                onCommentClick={() => {
                  if (!props.focusPost) {
                    discussionStoreActions.setShowPostOverlay(true);
                  }
                  return router.push({
                    pathname: "/discussion/[channelId]",
                    query: {
                      channelId,
                      postId: post100[virtualItem.index].id,
                    },
                  });
                }}
              />
            </Box>
          );
        })}
      </div>
    </Box>
  );
};

// Detail post with reply section
export const PostWithReply: FC<{ post: Post }> = (props) => {
  return (
    <Stack p="16px 0" bg={"white"} spacing={0}>
      <PostDetail {...props.post} onCommentClick={() => {}} />
      <Divider py="md" />
      <PostDetail {...props.post} onCommentClick={() => {}} />
      <PostDetail {...props.post} onCommentClick={() => {}} />
    </Stack>
  );
};
