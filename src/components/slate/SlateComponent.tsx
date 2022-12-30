import { Blockquote, List, Text } from "@mantine/core";
import type { FC } from "react";
import { Descendant } from "slate";

export const SlateElement: FC<any> = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <Blockquote icon={null} style={style} {...attributes}>
          {children}
        </Blockquote>
      );

    case "list-item":
      return (
        <List.Item style={style} {...attributes}>
          {children}
        </List.Item>
      );

    case "bulleted-list":
      return (
        <List style={style} {...attributes}>
          {children}
        </List>
      );

    case "numbered-list":
      return (
        <List type="ordered" style={style} {...attributes}>
          {children}
        </List>
      );

    default:
      return (
        <Text fz="15px" style={style} {...attributes}>
          {children}
        </Text>
      );
  }
};

export const SlateLeaf: FC<any> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export const emptySlateContent: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
