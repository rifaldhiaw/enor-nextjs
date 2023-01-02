import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";

export const showErrorNotification = (title: string, message: string) => {
  showNotification({
    color: "red",
    title: title,
    message: message,
    icon: <IconX size={16} />,
  });
};

export const showSuccessNotification = (title: string, message: string) => {
  showNotification({
    color: "green",
    title: title,
    message: message,
    icon: <IconX size={16} />,
  });
};
