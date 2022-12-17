import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  createStyles,
  Flex,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useRef } from "react";
import { post100 } from "../data/discussion";
import { IconPlus } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
}));

interface PostProps {
  postedAt: string;
  body: string;
  author: {
    name: string;
    image: string;
  };
}

export function Post({ postedAt, body, author }: PostProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        margin: "8px 0",
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
        <Button size="xs" variant="subtle">
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
        padding: "16px",
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
              gap: 20,
            }}
          >
            <Post {...post100[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
};
