import { Box, Sx } from "@mantine/core";
import { ReactNode } from "react";

export const Expanded = (props: { children: ReactNode; sx?: Sx }) => {
  return <Box sx={[{ flex: 1 }, props.sx]}>{props.children}</Box>;
};
