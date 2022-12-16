import {
  Avatar,
  Box,
  Button,
  createStyles,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";

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
    <Box>
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
      <Group pl={40}>
        <Button size="xs" variant="subtle">
          36 Comments
        </Button>
      </Group>
    </Box>
  );
}
