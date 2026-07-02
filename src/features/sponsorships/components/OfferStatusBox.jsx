import { Box, Flex, Group, Text } from "@mantine/core";
import { IconCheck, IconMessage, IconSettings, IconX } from "@tabler/icons-react";
import IconButton from "../../../shared/components/IconButton";



const OfferStatusBox = ({
    theme,
    onAccept,
    onNegotiate,
    onReject,
    sponsorshipId,
}) => {
    return (
        <Box className="offer-status-box" flex={1} radius="md">
            <Flex
                w={100}
                h={100}
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
                >
                    Your offer has been edited
                </Text>
            </Flex>

            <Text c={theme.colors.white[0]} size="sm" mt={4}>
                Do you accept changes made by the sponsor to your sponsorship agreement
                and activate the deal?
            </Text>

            <Flex direction="column" gap={theme.gap.sm} mt="sm">
                <Group>
                    <IconButton iconSize={18} Icon={IconCheck} hoverClass="hoverGreen"  onClick={() => onAccept && onAccept(sponsorshipId)} />
                    <Text size="sm">Accept</Text>
                </Group>
                <Group>
                    <IconButton iconSize={18} Icon={IconMessage} hoverClass="hoverGrey"  onClick={() => onNegotiate && onNegotiate(sponsorshipId)} />
                    <Text size="sm">Negotiate</Text>
                </Group>
                <Group>
                    <IconButton iconSize={18} Icon={IconX} hoverClass="hoverRed"  onClick={() => onReject && onReject(sponsorshipId)} />
                    <Text size="sm">Decline</Text>
                </Group>
            </Flex>
        </Box>
    )
}

export default OfferStatusBox;
