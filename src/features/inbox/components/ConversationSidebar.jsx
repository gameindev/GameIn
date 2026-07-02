import { ActionIcon, Box, Group, Text, TextInput, Loader, Center } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { theme } from "../../../shared/styles/theme/customTheme";
import ContactList from "./ContactList";
import NewChatModal from "./NewChatModal";
import { useState } from "react";

const ConversationSidebar = ({
    conversations,
    selectedConversation,
    conversationsLoading,
    onlineUsers,
    onSelectConversation,
    onCreateChat,
    user,
    onMarkAllRead,
    onClearChat,
    onDeleteConversation,
    onTogglePin,
}) => {
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <Box
                p="md"
                style={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
                <Box style={{ display: "flex", flexDirection: "column", height: "8rem" }}>
                    <Group position="apart" justify="space-between" align="start" mb="md">
                        <Text weight={700} size="1rem" mb={"lg"} c={theme.colors.white[0]}>
                            Message center
                        </Text>
                        <Group spacing={8}>
                            <ActionIcon
                                variant="filled"
                                color="blue"
                                onClick={() => setShowNewChatModal(true)}
                                title="New Chat"
                            >
                                <IconPlus size={16} />
                            </ActionIcon>
                        </Group>
                    </Group>

                    <TextInput
                        placeholder="Search contacts"
                        icon={<IconSearch size={16} color="#ADB5BD" />}
                        mb="md"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.currentTarget.value)}
                        styles={{
                            input: {
                                backgroundColor: theme.colors.inputBgColor[0],
                                color: "#E9ECEF",
                                border: "none",
                                "&::placeholder": { color: "#6C757D" },
                            },
                        }}
                        radius="md"
                    />
                </Box>

                <Box style={{ flex: 1, overflow: "hidden" }}>
                    {conversationsLoading ? (
                        <Center style={{ height: "100%" }}>
                            <Loader size="sm" />
                        </Center>
                    ) : (
                        <ContactList
                            conversations={conversations}
                            selectedConversation={selectedConversation}
                            onSelectConversation={onSelectConversation}
                            onlineUsers={onlineUsers}
                            searchQuery={searchQuery}
                            onMarkAllRead={onMarkAllRead}
                            onClearChat={onClearChat}
                            onDeleteConversation={onDeleteConversation}
                            onTogglePin={onTogglePin}
                        />
                    )}
                </Box>
            </Box>

            {/* Modals */}
            <NewChatModal
                opened={showNewChatModal}
                onClose={() => setShowNewChatModal(false)}
                onCreateChat={onCreateChat}
                user={user}
            />
        </>
    );
};

export default ConversationSidebar;
