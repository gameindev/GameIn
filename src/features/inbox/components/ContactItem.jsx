import { ActionIcon, Badge, Box, Group, Menu, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IconDotsVertical, IconPin } from "@tabler/icons-react";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import { formatTimeHelper } from "../utils/helper";
import { theme } from "../../../shared/styles/theme/customTheme";
import { inboxAvatar } from "../utils/inboxAvatar";
import { getProfileAvatarUrl } from "../../../shared/utils/helpers/useProfileMediaUrl.helper";

const ContactItem = function ContactItem({
    conversation,
    selected,
    onSelect,
    online,
    onMarkAllRead,
    onClearChat,
    onDeleteConversation,
    onTogglePin,
}) {
    const [showActions, setShowActions] = React.useState(false);
    const [menuOpened, setMenuOpened] = React.useState(false);
    const [displayName, setDisplayName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState(null);
    const user = useAppSelector(currentUser);

    useEffect(() => {
        const participants = conversation?.participants || conversation?.users || [];
        const other = participants.find((p) => {
            const participantId = p.user ? p.user.id : p.id;
            return participantId !== user.id;
        });

        const otherUser = other?.user || other;

        const nameFromTitle =
            typeof conversation?.title === "string"
                ? conversation.title.trim()
                : conversation?.title;
        const name = nameFromTitle
            ? nameFromTitle
            : otherUser?.username || otherUser?.name;
        setDisplayName(name || "");
        setAvatarUrl(getProfileAvatarUrl(otherUser));
    }, [
        conversation,
        conversation?.participants,
        conversation?.users,
        conversation?.title,
        user.id,
    ]);

    const runAction = (event, action) => {
        event.preventDefault();
        event.stopPropagation();
        if (typeof action === "function") {
            action(conversation.id);
        }
    };

    const formattedName = displayName
        ? displayName.charAt(0).toUpperCase() + displayName.slice(1)
        : "";

    return (
        <Box
            mb="sm"
            style={{
                backgroundColor: selected ? "#343A40" : "transparent",
                borderRadius: 8,
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                padding: "0.65rem 0.5rem",
                opacity: conversation.unread ? 1 : 0.8,
                fontWeight: conversation.unread ? 600 : 400,
                borderLeft: conversation.unread
                    ? `3px solid ${theme.colors.teal}`
                    : "3px solid transparent",
            }}
            onClick={() => onSelect(conversation)}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => {
                if (!menuOpened) {
                    setShowActions(false);
                }
            }}
        >
            <Group position="apart" w="100%">
                <Group spacing="sm" w="100%">
                    <Box style={{ position: "relative" }}>
                        {inboxAvatar(avatarUrl, displayName)}
                        {online && (
                            <Box
                                style={{
                                    position: "absolute",
                                    bottom: 5,
                                    right: 3,
                                    width: 7,
                                    height: 7,
                                    backgroundColor: online ? "#20C997" : "#343A40",
                                    borderRadius: "50%",
                                }}
                            />
                        )}
                    </Box>
                    <Box
                        style={{ flex: 1, maxWidth: "calc(100% - 50px)", width: "100%" }}
                    >
                        <Group position="apart" style={{ justifyContent: "space-between" }}>
                            <Group spacing={6} style={{ minWidth: 0, flex: 1 }}>
                                {conversation.pinned && (
                                    <IconPin size={12} color="#ADB5BD" style={{ flexShrink: 0 }} />
                                )}
                                <Text
                                    color="#E9ECEF"
                                    size="sm"
                                    lineClamp={1}
                                    style={{ flex: 1, minWidth: 0 }}
                                >
                                    {formattedName}
                                </Text>
                            </Group>
                            <Box
                                onClick={(event) => event.stopPropagation()}
                                onMouseDown={(event) => event.stopPropagation()}
                                style={{
                                    opacity: showActions || menuOpened ? 1 : 0,
                                    pointerEvents: showActions || menuOpened ? "auto" : "none",
                                    transition: "opacity 0.2s ease",
                                }}
                            >
                                <Menu
                                    position="bottom-end"
                                    withinPortal
                                    opened={menuOpened}
                                    onChange={setMenuOpened}
                                    closeOnItemClick
                                >
                                    <Menu.Target>
                                        <ActionIcon
                                            size="xs"
                                            variant="transparent"
                                            color="gray"
                                            title="More options"
                                            aria-label="More options"
                                        >
                                            <IconDotsVertical size={14} />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item
                                            onClick={(event) => runAction(event, onMarkAllRead)}
                                            disabled={!conversation.unread}
                                        >
                                            Mark all read
                                        </Menu.Item>
                                        <Menu.Item
                                            onClick={(event) => runAction(event, onTogglePin)}
                                        >
                                            {conversation.pinned ? "Unpin chat" : "Pin chat"}
                                        </Menu.Item>
                                        <Menu.Item
                                            onClick={(event) => runAction(event, onClearChat)}
                                        >
                                            Clear chat
                                        </Menu.Item>
                                        <Menu.Divider />
                                        <Menu.Item
                                            color="red"
                                            onClick={(event) => runAction(event, onDeleteConversation)}
                                        >
                                            Delete
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Box>
                        </Group>
                        <Group position="apart" mt={4}>
                            <Text
                                size="xs"
                                color="#ADB5BD"
                                lineClamp={1}
                                style={{ maxWidth: "70%" }}
                            >
                                {conversation.lastMessage
                                    ? typeof conversation.lastMessage === "string"
                                        ? conversation.lastMessage
                                        : conversation.lastMessage.content
                                    : conversation.unread && conversation.unreadCount > 0
                                      ? "New message received"
                                      : "No messages yet"}
                            </Text>
                            <Group spacing={4}>
                                <Text size="xs" color="#6C757D">
                                    {conversation.lastMessage?.timestamp
                                        ? formatTimeHelper(conversation.lastMessage.timestamp)
                                        : formatTimeHelper(conversation.joined_at)}
                                </Text>
                                {conversation.unread && (
                                    <Badge size="xs" color="teal" variant="filled" radius="xl">
                                        {conversation.unreadCount > 0
                                            ? conversation.unreadCount
                                            : "new"}
                                    </Badge>
                                )}
                            </Group>
                        </Group>
                    </Box>
                </Group>
            </Group>
        </Box>
    );
};

export default React.memo(ContactItem);
