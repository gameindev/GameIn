import { notifications } from "@mantine/notifications";

export const showNotificationHelper = (title, message, color = "green") => {
    notifications.show({
        title,
        message,
        color,
        position: "top-right",
    });
};