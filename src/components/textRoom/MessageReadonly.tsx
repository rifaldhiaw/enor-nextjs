import { useCallback, useEffect, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import {
  SlateElement as SlateElementComp,
  SlateLeaf,
} from "~/components/slate/SlateComponent";

export const MessageReadonly = (props: { body: Descendant[] }) => {
  const [editor] = useState(() => withReact(createEditor()));

  useEffect(() => {
    editor.children = props.body;
  }, [props.body, editor]);

  const renderElement = useCallback(
    (props: any) => <SlateElementComp {...props} />,
    []
  );
  const renderLeaf = useCallback((props: any) => <SlateLeaf {...props} />, []);

  return (
    <Slate editor={editor} value={props.body as Descendant[]}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        disabled
        readOnly
      />
    </Slate>
  );
};
