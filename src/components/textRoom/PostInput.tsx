import { ActionIcon, Box, Flex, useMantineTheme } from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { IconSend } from "@tabler/icons";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { makeFakePost } from "~/data/discussion";
import { textRoomStoreActions } from "~/stores/textRoomStore";

export const PostInput = () => {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: "<p>Select some text to see bubble menu</p>",
  });

  const theme = useMantineTheme();

  return (
    <Box px="md" mb="lg" mt="sm">
      <Flex align="end" gap="md">
        <Box sx={{ flex: 1 }}>
          <RichTextEditor editor={editor}>
            {editor && (
              <BubbleMenu editor={editor}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Link />
                </RichTextEditor.ControlsGroup>
              </BubbleMenu>
            )}
            <RichTextEditor.Content
              sx={{
                padding: "8px 24px",
                backgroundColor: theme.colors.gray[0],
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();

                  // TODO: should use json instead of text
                  const textValue = editor?.getText();

                  const newPost = makeFakePost(Date.now(), textValue);
                  textRoomStoreActions.addNewPost(newPost);

                  // reset editor
                  editor?.chain().focus().setContent("").run();
                }
              }}
            />
          </RichTextEditor>
        </Box>

        <ActionIcon size="xl" variant="light">
          <IconSend />
        </ActionIcon>
      </Flex>
    </Box>
  );
};
