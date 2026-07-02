import { Box, Group, Text, ActionIcon, Divider } from "@mantine/core";
import { IconArrowLeft, IconDotsVertical } from "@tabler/icons-react";
import { inboxAvatar } from "../utils/inboxAvatar";
import { theme } from "../../../shared/styles/theme/customTheme";
import React, { memo } from "react";

const ChatHeader = memo(({ displayName, avatarUrl, online, onBack, showBack = false }) => {
    return (
        <>
            <Box className="chat-header" p="md">
                <Group
                    position="apart"
                    style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                    <Text weight={700} size="0.75rem" c={theme.colors.white[0]}>
                        You chat with
                    </Text>

                    <Group style={{ justifyContent: "space-between", width: "100%" }}>
                        <Group>
                            {showBack && (
                                <ActionIcon
                                    className="inbox-back-btn"
                                    variant="subtle"
                                    color="gray"
                                    onClick={onBack}
                                    aria-label="Back to conversations"
                                >
                                    <IconArrowLeft size={20} />
                                </ActionIcon>
                            )}
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
                                            backgroundColor: "#20C997",
                                            borderRadius: "50%",
                                        }}
                                    />
                                )}
                            </Box>
                            <Box>
                                <Group>
                                    <Text weight={800} size="lg" color="#E9ECEF">
                                        {displayName
                                            ? displayName.charAt(0).toUpperCase() +
                                            displayName.slice(1)
                                            : ""}
                                    </Text>
                                </Group>
                                <Text size="xs" color={online ? "#20C997" : "#ADB5BD"}>
                                    {online ? "Online" : "Offline"}
                                </Text>
                            </Box>
                        </Group>
                        <ActionIcon variant="subtle" color="gray">
                            <IconDotsVertical size={18} />
                        </ActionIcon>
                    </Group>
                </Group>
            </Box>

            <Divider color={theme.colors.inputBgColor[0]} size={"sm"} />
        </>
    );
});

export default ChatHeader;
