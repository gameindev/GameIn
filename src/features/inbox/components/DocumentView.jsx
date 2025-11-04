import React, { useState } from "react";
import { Paper, Group, Text, ActionIcon, Button, Flex, Center, rgba, Divider, Space, Loader } from "@mantine/core";
import { IconEdit, IconX, IconCheck, IconSettings, IconFile, IconFileDescription } from "@tabler/icons-react";
import { theme } from "../../../shared/styles/theme/customTheme";
import IconButton from "../../../shared/components/IconButton";

const DocumentView = ({
    onClose,
    message,
    onSend,
    acknowledgeMessage,
}) => {
    const [isAccepting, setIsAccepting] = useState(false);
    const [isDeclining, setIsDeclining] = useState(false);

    console.log("message", message);

    const handleAccept = async () => {
        if (!onSend || !acknowledgeMessage) {
            console.error("onSend or acknowledgeMessage function not provided");
            return;
        }

        setIsAccepting(true);
        try {
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
        <Paper
            p="md"
            py={20}
            px={40}
            shadow="md"
            radius="md"

            style={{
                backgroundColor: rgba(theme.colors.primary[0], 0.1),
                color: theme.colors.primary[0],
                marginBottom: 20
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
                            Do you accept changes made by the sponsor to your sponsorship agreement and activate the deal?
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
    );
};

export default DocumentView;
