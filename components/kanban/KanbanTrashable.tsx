import { CancelDrop, UniqueIdentifier } from "@dnd-kit/core";
import React from "react";
import { ConfirmModal } from "./components";
import { MultipleContainers, TRASH_ID } from "./Kanban";

export const KanbanTrashable = ({ confirmDrop }: { confirmDrop: boolean }) => {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
  const resolveRef = React.useRef<(value: boolean) => void>();

  const cancelDrop: CancelDrop = async ({ active, over }) => {
    if (over?.id !== TRASH_ID) {
      return true;
    }

    setActiveId(active.id);

    const confirmed = await new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });

    setActiveId(null);

    return confirmed === false;
  };

  return (
    <>
      <MultipleContainers
        cancelDrop={confirmDrop ? cancelDrop : undefined}
        trashable
      />
      {activeId && (
        <ConfirmModal
          onConfirm={() => resolveRef.current?.(true)}
          onDeny={() => resolveRef.current?.(false)}
        >
          Are you sure you want to delete "{activeId}"?
        </ConfirmModal>
      )}
    </>
  );
};
