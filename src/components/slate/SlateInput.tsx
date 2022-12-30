import { Box } from "@mantine/core";
import { useForceUpdate } from "@mantine/hooks";
import isHotkey from "is-hotkey";
import { FC, useCallback, useEffect, useState } from "react";
import {
  BaseEditor,
  createEditor,
  Descendant,
  Editor,
  Transforms,
} from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";

import {
  emptySlateContent,
  SlateElement as SlateElementComp,
  SlateLeaf,
} from "./SlateComponent";

// TODO: move type definition
type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string; bold?: true };

type Format = string;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
} as const;

export const SlateInput: FC<{
  value: Descendant[];
  autoFocus: boolean;
  placeholder?: string;
  onSubmit: (value: Descendant[]) => void;
  onCancel?: () => void;
}> = (props) => {
  const [editor] = useState(() => withHistory(withReact(createEditor())));

  useEffect(() => {
    if (props.autoFocus) {
      setTimeout(() => {
        ReactEditor.focus(editor);
        Transforms.select(editor, Editor.end(editor, []));
      }, 100);
    }
  }, [editor, props.autoFocus]);

  const renderElement = useCallback(
    (props: any) => <SlateElementComp {...props} />,
    []
  );
  const renderLeaf = useCallback((props: any) => <SlateLeaf {...props} />, []);
  const forceUpdate = useForceUpdate();

  const resetEditor = () => {
    const point = { path: [0, 0], offset: 0 };
    editor.selection = { anchor: point, focus: point }; // clean up selection
    editor.history = { redos: [], undos: [] }; // clean up history
    editor.children = [{ type: "paragraph", children: [{ text: "" }] }]; // reset to empty state

    forceUpdate();
    ReactEditor.blur(editor);
  };

  return (
    <Box
      sx={(theme) => ({
        border: "1px solid",
        borderColor: theme.colors.gray[5],
        borderRadius: theme.radius.sm,
        backgroundColor: theme.white,
        padding: theme.spacing.xs,
      })}
      onKeyDown={(event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();

          props.onSubmit(editor.children);
          resetEditor();
          return;
        }
      }}
    >
      <Slate editor={editor} value={emptySlateContent}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={props.placeholder}
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </Box>
  );
};

const isMarkActive = (editor: Editor, format: Format) => {
  const marks = Editor.marks(editor);
  // @ts-ignore
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: Format) => {
  const isActive = isMarkActive(editor, format);

  isActive
    ? Editor.removeMark(editor, format)
    : Editor.addMark(editor, format, true);
};
