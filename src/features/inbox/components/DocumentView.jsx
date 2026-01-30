import React, { useState } from "react";
import {
    Paper,
    Group,
    Text,
    ActionIcon,
    Button,
    Flex,
    Center,
    rgba,
    Divider,
    Space,
    Loader,
    Box,
} from "@mantine/core";
import {
    IconEdit,
    IconX,
    IconCheck,
    IconSettings,
    IconFile,
    IconFileDescription,
} from "@tabler/icons-react";
import { theme } from "../../../shared/styles/theme/customTheme";
import IconButton from "../../../shared/components/IconButton";
import useSponsorships from "../../sponsorships/hooks/useSponsorships";
import { inboxAvatar } from "../utils/inboxAvatar";

const DocumentView = ({
    onClose,
    message,
    onSend,
    acknowledgeMessage,
    offeringId,
    onlineUsers = [],
}) => {
    const [isAccepting, setIsAccepting] = useState(false);
    const [isDeclining, setIsDeclining] = useState(false);

    const { handleAcceptOffering, handleResetOffering } = useSponsorships({});
    const senderId = message.senderId;
    
    // Use inbox's onlineUsers (from useSocketManagement), not global Redux state
    const isSenderOnline = onlineUsers.some((u) => (u.userId ?? u.id) === senderId);

    console.log("message", message);

    // Helper function to get profile picture URL
    const getProfilePicUrl = (profilePic) => {
        if (!profilePic) return null;
        return profilePic.startsWith("http")
            ? profilePic
            : import.meta.env.VITE_ASSET_URL
            ? `${import.meta.env.VITE_ASSET_URL}/${profilePic}`
            : profilePic;
    };

    // Format timestamp like MessageBubble
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "";

        const date = new Date(timestamp);

        // Format date as MM.DD.YYYY
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        // Format time as h:mm am/pm
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "pm" : "am";
        const displayHours = hours % 12 || 12;

        return `${month}.${day}.${year} • ${displayHours}:${minutes} ${ampm.toUpperCase()}`;
    };

    const handleAccept = async () => {
        if (!onSend || !acknowledgeMessage) {
            console.error("onSend or acknowledgeMessage function not provided");
            return;
        }

        setIsAccepting(true);
        try {
            await handleAcceptOffering(offeringId);
            // Acknowledge the message immediately
            await acknowledgeMessage(message.client_msg_id);

            // Send acceptance message
            const acceptanceMessage = `I accept the changes to the offer ${message.json_data?.offering_title}`;
            await onSend(acceptanceMessage, []);

            // Close the document view after sending
            if (onClose) {
                onClose();
            }
        } catch (err) {
            console.error("Failed to send acceptance message:", err);
        } finally {
            setIsAccepting(false);
        }
    };

    const handleDecline = async () => {
        if (!onSend || !acknowledgeMessage) {
            console.error("onSend or acknowledgeMessage function not provided");
            return;
        }

        setIsDeclining(true);
        try {
            handleResetOffering(offeringId);
            // Acknowledge the message immediately
            await acknowledgeMessage(message.client_msg_id);

            // Send decline message
            const declineMessage = `I humbly decline the changes to the offer ${message.json_data?.offering_title}`;
            await onSend(declineMessage, []);

            // Close the document view after sending
            if (onClose) {
                onClose();
            }
        } catch (err) {
            console.error("Failed to send decline message:", err);
        } finally {
            setIsDeclining(false);
        }
    };

    return (
        <Box
            mb="lg"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
        >
            {/* Header with Avatar, Username, and Timestamp */}
            <Group spacing="xs" mb={5} justify="space-between" w="100%">
                <Group>
                    {inboxAvatar(
                        getProfilePicUrl(message.senderProfilePic || message.senderProfilePicUrl),
                        message.sender || message.senderName || "User",
                        isSenderOnline,
                        true // Show online status for document view
                    )}
                    <Text size="xs" color={theme.colors.inputBgColor[0]}>
                        {message.sender || message.senderName || "User"}
                    </Text>
                </Group>
                <Group spacing={4}>
                    <Text size="xs" color={theme.colors.inputBgColor[0]} opacity={0.6}>
                        {formatTimestamp(message.timestamp || message.created_at)}
                    </Text>
                </Group>
            </Group>

            {/* Document Content */}
            <Box w="100%" ps={50}>
                <Paper
                    p="md"
                    py={20}
                    px={40}
                    shadow="md"
                    radius="md"
                    style={{
                        backgroundColor: rgba(theme.colors.primary[0], 0.1),
                        color: theme.colors.primary[0],
                    }}
                >
                    <Text
                        ta="left"
                        fz={theme.fontSizes.lg}
                        lh={1}
                        c={theme.colors.primary[0]}
                        mt="sm"
                    >
                        {message?.json_data?.offering_title || "Offering Document"}
                    </Text>

                    <Space h="md" />

            <Center>
                <Flex justify="center" align="center" w="100%" gap={20}>
                    <Group justify="center" align="center" direction="column">
                        <Flex
                            w={100}
                            h="100%"
                            bg={theme.colors.yellow[0]}
                            align="center"
                            direction="column"
                            mb="sm"
                            p="md"
                            style={{ borderRadius: theme.radius.md }}
                        >
                            <IconSettings
                                stroke={2}
                                size={32}
                                color={theme.colors.secondaryGrey[0]}
                            />
                            <Text
                                ta="center"
                                fz={theme.fontSizes.sm}
                                lh={1}
                                c={theme.colors.secondaryGrey[0]}
                                fw={700}
                                mt="sm"
                            >
                                Your offer has been edited
                            </Text>
                        </Flex>
                    </Group>

                    <Group justify="start" align="center" direction="column">
                        <Flex spacing={5} direction="row" align="center" gap={5}>
                            <IconFileDescription size={16} color={theme.colors.primary[0]} />
                            <Text size="sm" fw={800} color={theme.colors.white[0]}>
                                view / edit document
                            </Text>
                        </Flex>
                        <Text size="sm" weight={500} color={theme.colors.white[0]}>
                            Do you accept changes made by the sponsor to your sponsorship
                            agreement and activate the deal?
                        </Text>

                        <Flex gap={20} direction="row" justify="space-between">
                            <Group justify="center" align="center" gap={5}>
                                <Text size="sm" weight={500} color={theme.colors.white[0]}>
                                    accept:
                                </Text>
                                {isAccepting ? (
                                    <Loader size="sm" color="green" />
                                ) : (
                                    <IconButton
                                        size="md"
                                        hoverClass="hoverGreen"
                                        iconSize={16}
                                        Icon={IconCheck}
                                        onClick={handleAccept}
                                        disabled={isAccepting || isDeclining}
                                    />
                                )}
                            </Group>

                            <Group justify="center" align="center" gap={5}>
                                <Text size="sm" weight={500} color={theme.colors.white[0]}>
                                    decline:
                                </Text>
                                {isDeclining ? (
                                    <Loader size="sm" color="red" />
                                ) : (
                                    <IconButton
                                        size="md"
                                        hoverClass="hoverRed"
                                        iconSize={16}
                                        Icon={IconX}
                                        onClick={handleDecline}
                                        disabled={isAccepting || isDeclining}
                                    />
                                )}
                            </Group>
                        </Flex>
                    </Group>
                </Flex>
            </Center>
                </Paper>
            </Box>
        </Box>
    );
};

export default DocumentView;
