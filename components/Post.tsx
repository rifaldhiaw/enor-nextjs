import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  CloseButton,
  createStyles,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconMoodSmile,
  IconPencil,
  IconPlus,
  IconShare,
} from "@tabler/icons";
import { useVirtualizer } from "@tanstack/react-virtual";
import { FC, useRef, useState } from "react";
import { Post, post100 } from "../data/discussion";
import {
  discussionActions,
  useDiscussionStore,
} from "../stores/discussionStore";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
}));

interface PostDetailProps {
  postedAt: string;
  body: string;
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
      sx={{
        padding: "8px 16px",
        position: "relative",
        ":hover": {
          backgroundColor:
            theme.colors.gray[theme.colorScheme === "dark" ? 7 : 1],
        },
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
        <ActionIcon
          size="sm"
          variant="light"
          sx={{
            borderRadius: "50%",
          }}
        >
          <IconPlus size={16} />
        </ActionIcon>
      </Flex>

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

export const PostList = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: post100.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    overscan: 10,
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: "calc(100vh - var(--mantine-header-height, 0px))",
        overflow: "auto",
        width: "100%",
        padding: "16px 0",
      }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <PostDetail
              {...post100[virtualItem.index]}
              onCommentClick={() =>
                discussionActions.selectPost(post100[virtualItem.index])
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Detail post with reply section
export const PostWithReply: FC<{ post: Post }> = (props) => {
  return (
    <Stack>
      <PostDetail {...props.post} onCommentClick={() => {}} />
      <Divider />
      <PostDetail {...props.post} onCommentClick={() => {}} />
      <PostDetail {...props.post} onCommentClick={() => {}} />
    </Stack>
  );
};

export const PostContainer = () => {
  const showPostWithReply = useDiscussionStore(
    (state) => state.selectedPost !== null
  );

  return (
    <Flex
      direction="row"
      sx={{
        height: "calc(100vh - var(--mantine-header-height, 0px))",
        overflow: "auto",
      }}
    >
      <Flex
        sx={{
          flex: 1,
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Box
          sx={{
            height: 60,
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white",
            borderBottom: "1px solid #dee2e6",
            borderRight: "1px solid #dee2e6",
          }}
          p="md"
        >
          <CloseButton />
        </Box>
        <PostList />
      </Flex>
      {showPostWithReply && (
        <Flex
          sx={{
            flex: 1,
            height: "100%",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Box
            sx={{
              height: 60,
              position: "sticky",
              top: 0,
              zIndex: 10,
              backgroundColor: "white",
              borderBottom: "1px solid #dee2e6",
            }}
            p="md"
          >
            <CloseButton
              onClick={() => {
                discussionActions.unselectPost();
              }}
            />
          </Box>

          <PostWithReply post={post100[0]} />
        </Flex>
      )}
    </Flex>
  );
};
