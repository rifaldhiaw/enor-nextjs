import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Paper,
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

interface PostDetailProps {
  postedAt: string;
  body: string;
  selected?: boolean;
  onCommentClick?: () => void;
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
      }}
    >
      <Flex gap="md">
        <Avatar src={author.image} alt={author.name} radius="xl" mt="md" />

        <Paper
          bg="white"
          w="100%"
          px="md"
          pt="md"
          pb="sm"
          shadow={selected ? "md" : "undefined"}
          sx={{
            border: `1px solid ${theme.colors.gray[2]}`,
            borderLeft: `3px solid ${
              selected
                ? theme.colors.blue[5]
                : theme.colorScheme === "dark"
                ? theme.colors.gray[5]
                : theme.colors.gray[2]
            }`,
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
          <Text size="sm">{body}</Text>

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
