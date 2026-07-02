import { ActionIcon, Box, Button, Collapse, Flex, Text } from "@mantine/core";
import { useState } from "react";
import { theme } from "../styles/theme/customTheme";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import styled from "styled-components";



const StatBox = ({
    title,
    action,
    background,
    children,
    accordion = false,
    actionCTA = false,
    defaultOpen = true,
    onSponsorClick,
    style: styleProp,
    noFlexFill = false,
    ...props
}) => {
    const [opened, setOpened] = useState(defaultOpen);

    const handleSponsorClick = () => {
        if (onSponsorClick) {
            onSponsorClick();
        }
    };

    const shouldShowSpacer = !accordion && !noFlexFill;

    return (
        <StatBoxShell
            w="100%"
            h="100%"
            p="md"
            {...props}
            style={{
                background: background || theme.colors.secondaryGrey[0],
                borderRadius: theme.radius.md,
                display: "flex",
                flexDirection: "column",
                ...(noFlexFill ? { height: "auto", minHeight: 0 } : null),
                ...styleProp,
            }}
        >

            <Box>
                <Flex justify="space-between" align="center" className="box_header">
                    <Text c={theme.colors.white[0]} className="title">
                        {title || "Card Title"}
                    </Text>

                    <Flex align="right" gap="xs">
                        {accordion && (
                            <ActionIcon
                                variant="transparent"
                                onClick={() => setOpened((o) => !o)}
                                aria-label="Toggle content"
                                color="white"
                            >
                                {opened ? (
                                    <IconChevronUp size={18} />
                                ) : (
                                    <IconChevronDown size={18} />
                                )}
                            </ActionIcon>
                        )}
                        {action && <div className="action_cta">{action}</div>}
                    </Flex>
                </Flex>

                {accordion ? (
                    <Collapse in={opened}>
                        <Box mt="sm">{children}</Box>
                    </Collapse>
                ) : (
                    <Box mt="sm">
                        {children}
                    </Box>
                )}
            </Box>

            {shouldShowSpacer && <Box style={{ flexGrow: 1 }} />}

            {actionCTA && (
                <Button
                    mt="md"
                    radius="md"
                    variant="primary"
                    style={{
                        width: "fit-content",
                        alignSelf: "flex-end",
                    }}
                    onClick={handleSponsorClick}
                >
                    Sponsor
                </Button>
            )}

        </StatBoxShell>
    )
}

const StatBoxShell = styled(Box)`
    @media (max-width: 768px) {
        .box_header {
            gap: 0.75rem;
        }

        .box_header .action_cta .mantine-ActionIcon-root,
        .box_header > .mantine-Flex-root > .mantine-ActionIcon-root {
            width: 2rem;
            height: 2rem;
            min-width: 2rem;
        }

        .box_header .action_cta .mantine-ActionIcon-root svg,
        .box_header > .mantine-Flex-root > .mantine-ActionIcon-root svg {
            width: 0.95rem;
            height: 0.95rem;
        }
    }
`;

export default StatBox;
