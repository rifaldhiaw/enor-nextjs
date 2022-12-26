import { useMantineTheme } from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { makeFakePost } from "~/data/discussion";
import { textRoomStoreActions } from "~/stores/textRoomStore";

export const PostInput = () => {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: "",
  });

  const theme = useMantineTheme();

  return (
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
          padding: "8px 16px",
          backgroundColor: theme.white,
        }}
        placeholder="Write a message..."
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
  );
};
