import { useMantineTheme } from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/router";
import invariant from "tiny-invariant";
import { DisableEnter } from "~/components/utils/tiptapUtils";
import { getAuthModel } from "~/data/pocketbase";
import { useAddMessage } from "~/domains/message/messageData";

export const PostInput = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      DisableEnter,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    content: "",
  });

  const router = useRouter();
  const channelId = router.query.channelId as string;

  const theme = useMantineTheme();
  const addMessage = useAddMessage();

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

            console.log(editor?.getText());

            const body = editor?.getJSON();
            const userData = getAuthModel();

            invariant(channelId, "channelId is required");
            invariant(userData, "userData is required");

            addMessage.mutate({
              channel: channelId,
              body,
              user: userData.id,
              reaction: [],
            });

            // reset editor
            editor?.chain().focus().setContent("").run();
          }
        }}
      />
    </RichTextEditor>
  );
};
