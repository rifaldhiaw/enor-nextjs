import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Sx,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconMessage,
  IconMoodSmile,
  IconShare,
} from "@tabler/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { Descendant } from "slate";
import { MessageReadonly } from "~/components/textRoom/MessageReadonly";

interface PostDetailProps {
  postedAt: string;
  body: Descendant[];
  selected?: boolean;
  onCommentClick?: () => void;
  withBorder?: boolean;
  author: {
    name: string;
    image: string;
  };
  sx?: Sx;
}

export function PostDetail({
  postedAt,
  body,
  author,
  selected,
  onCommentClick,
  withBorder,
  sx,
}: PostDetailProps) {
  const theme = useMantineTheme();

  // show actions on hover
  const [showAcitons, setShowActions] = useState(false);

  return (
    <Box
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      pos="relative"
      sx={sx}
    >
      <Flex gap="md">
        <Avatar src={author.image} alt={author.name} radius="xl" mt="md" />

        <Paper
          bg="white"
          w="100%"
          px="md"
          pt="sm"
          pb={withBorder ? "sm" : undefined}
          shadow={selected ? "md" : undefined}
          sx={{
            border: withBorder
              ? `1px solid ${theme.colors.gray[3]}`
              : "transparent",
            transform: selected ? "scale(1.01) translateX(-4px)" : "scale(1)",
            transition: "transform 0.1s",
            borderLeft: withBorder
              ? `3px solid ${
                  selected
                    ? theme.colors.blue[5]
                    : theme.colorScheme === "dark"
                    ? theme.colors.gray[5]
                    : theme.colors.gray[2]
                }`
              : "transparent",
          }}
        >
          <Group spacing="sm">
            <Text fw="bold" size="sm">
              {author.name}
            </Text>
            <Text size="xs" color="dimmed">
              {dayjs(postedAt).format("MMM D, YYYY")}
            </Text>
          </Group>

          {/* body */}
          <MessageReadonly body={body} />

          {/* comment button */}
          <Flex>
            {onCommentClick && (
              <Button size="xs" variant="subtle" onClick={onCommentClick}>
                36 Comments
              </Button>
            )}

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
        </Paper>
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
          <ActionIcon
            sx={{
              borderRadius: "50%",
            }}
          >
            <IconMessage size="16" />
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
