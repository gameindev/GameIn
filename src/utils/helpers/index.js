import { notifications } from "@mantine/notifications";

export const showNotification = (title, message, color = "green") => {
    notifications.show({
        title,
        message,
        color,
        position: "bottom-right",
    });
};

export const formatDate = (dobStr) => {
    if (!dobStr) return "";
    const [year, month, day] = dobStr.split("-");
    return `${day}-${month}-${year}`;
}

