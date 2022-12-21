import { Excalidraw } from "@excalidraw/excalidraw";
import { useRef, useState } from "react";

import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import {
  AppState,
  ExcalidrawImperativeAPI,
  ExcalidrawProps,
} from "@excalidraw/excalidraw/types/types";
import { Box } from "@mantine/core";

export default function Whiteboard() {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
  const [theme, setTheme] = useState<ExcalidrawProps["theme"]>("light");

  return (
    <Box w="100%" h="100%">
      <Excalidraw
        ref={excalidrawRef}
        onChange={(elements: readonly ExcalidrawElement[], state: AppState) =>
          console.log("Elements :", elements, "State : ", state)
        }
        onPointerUpdate={(payload) => console.log(payload)}
        onCollabButtonClick={() => window.alert("You clicked on collab button")}
        viewModeEnabled={false}
        zenModeEnabled={false}
        gridModeEnabled={false}
        theme={theme}
        name="Custom name of drawing"
      />
    </Box>
  );
}
