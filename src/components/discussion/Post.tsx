import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconMoodSmile,
  IconPencil,
  IconShare,
} from "@tabler/icons";
import { useState } from "react";

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
      <Text
        sx={{
          paddingLeft: 54,
        }}
        size="sm"
      >
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
