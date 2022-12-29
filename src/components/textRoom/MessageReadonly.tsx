import { Link, RichTextEditor } from "@mantine/tiptap";
import { JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export const MessageReadonly = (props: { content: JSONContent }) => {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit, Link],
    content: props.content,
  });

  useEffect(() => {
    editor?.commands.setContent(props.content);
  }, [props.content]);

  return (
    <RichTextEditor editor={editor} sx={{ border: "0" }}>
      <RichTextEditor.Content p={0} />
    </RichTextEditor>
  );
};
