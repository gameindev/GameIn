import { notifications } from "@mantine/notifications";

/** Normalize Nest/axios errors into a string safe for React notifications. */
export const getApiErrorMessage = (err, fallback = "Something went wrong") => {
    const msg = err?.response?.data?.message;
    if (Array.isArray(msg)) {
        return msg.join(", ");
    }
    if (typeof msg === "string" && msg.trim()) {
        return msg;
    }
    if (typeof err?.message === "string" && err.message.trim()) {
        return err.message;
    }
    return fallback;
};

export const showNotificationHelper = (title, message, color = "green") => {
    const safeMessage =
        typeof message === "string"
            ? message
            : message != null
              ? String(message)
              : "";

    notifications.show({
        title,
        message: safeMessage,
        color,
        position: "top-right",
    });
};