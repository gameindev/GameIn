import { Button, Group, Modal, Stack, Text } from "@mantine/core";

const CONFIRM_COPY = {
    clear: {
        title: "Clear chat?",
        message: "Messages will be hidden from your inbox. Other participants will still see the conversation history.",
        confirmLabel: "Clear chat",
        confirmColor: "teal",
    },
    delete: {
        title: "Delete chat?",
        message: "This conversation will be removed from your inbox. You can start a new chat with this contact later.",
        confirmLabel: "Delete",
        confirmColor: "red",
    },
};

export default function ChatConfirmModal({
    opened,
    type,
    conversationLabel,
    loading = false,
    onClose,
    onConfirm,
}) {
    if (!type) return null;

    const copy = CONFIRM_COPY[type];

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={copy.title}
            centered
            size="sm"
        >
            <Stack spacing="md">
                {conversationLabel ? (
                    <Text size="sm" c="dimmed">
                        Chat with{" "}
                        <Text component="span" fw={600} c="gray.0">
                            {conversationLabel}
                        </Text>
                    </Text>
                ) : null}
                <Text size="sm">{copy.message}</Text>
                <Group justify="flex-end" mt="xs">
                    <Button variant="default" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        color={copy.confirmColor}
                        onClick={onConfirm}
                        loading={loading}
                    >
                        {copy.confirmLabel}
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}
