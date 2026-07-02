import { Box, Button, Flex, Loader, Stack, Text, Tooltip, UnstyledButton } from "@mantine/core";
import { IconChevronRight, IconInfoCircle } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import D3DonutChart from "../../../shared/components/d3/D3DonutChart";
import { theme } from "../../../shared/styles/theme/customTheme";
import { analyticsService } from "../services/analytics.service";

const SEGMENTS = [
    { key: "active", label: "Active", color: theme.colors.primary[0] },
    { key: "pending", label: "Pending", color: theme.colors.yellow[0] },
    { key: "completed", label: "Completed", color: theme.colors.skyblue[0] },
    { key: "cancelled", label: "Cancelled", color: theme.colors.hoverRed[0] },
];

const PANEL_BG = "rgba(0,0,0,0.22)";

function formatCount(n) {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Number(n) || 0);
}

function EmptyDonutRing({ size = 132 }) {
    return (
        <Box
            mx="auto"
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                border: `14px solid rgba(255,255,255,0.06)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Stack gap={0} align="center">
                <Text fw={700} fz={22} c="white" lh={1.1}>
                    0
                </Text>
                <Text size="xs" c="dimmed" mt={4}>
                    Total
                </Text>
            </Stack>
        </Box>
    );
}

export default function SponsorshipOverviewCard({ forUserId, onManageClick, onViewAllClick }) {
    const [loading, setLoading] = useState(true);
    const [overview, setOverview] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const scopedParams =
                    forUserId != null && Number.isFinite(Number(forUserId))
                        ? { forUserId: Number(forUserId) }
                        : {};
                const data = await analyticsService.getSponsorshipOverview(scopedParams);
                if (!cancelled) setOverview(data);
            } catch (e) {
                if (!cancelled) {
                    setError(e?.message ?? "Could not load sponsorship overview.");
                    setOverview(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [forUserId]);

    const counts = overview?.counts ?? {};
    const active = Number(counts.active) || 0;

    const total = useMemo(
        () => SEGMENTS.reduce((sum, s) => sum + (Number(counts[s.key]) || 0), 0),
        [counts],
    );

    const donutSegments = useMemo(
        () =>
            SEGMENTS.map((s) => ({
                name: s.label,
                value: Number(counts[s.key]) || 0,
                color: s.color,
            })).filter((s) => s.value > 0),
        [counts],
    );

    const tooltipBody = overview?.metric_definitions
        ? Object.entries(overview.metric_definitions)
              .map(([key, text]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${text}`)
              .join("\n")
        : "Status breakdown of your sponsorship deals.";

    return (
        <Box
            h="100%"
            p="md"
            style={{
                background: theme.colors.secondaryGrey[0],
                borderRadius: theme.radius.md,
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                flexDirection: "column",
                minHeight: 320,
            }}
        >
            <Flex justify="space-between" align="center" mb="sm" gap="xs">
                <Flex align="center" gap={6}>
                    <Text fw={600} c="white" size="sm" className="title">
                        Sponsorship overview
                    </Text>
                    <Tooltip label={tooltipBody} multiline w={300}>
                        <Flex component="span" align="center" style={{ lineHeight: 0, cursor: "help" }}>
                            <IconInfoCircle size={14} color={theme.colors.text[0]} style={{ opacity: 0.55 }} />
                        </Flex>
                    </Tooltip>
                </Flex>
                <UnstyledButton
                    onClick={onViewAllClick}
                    style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: theme.colors.primary[0],
                        opacity: 0.9,
                    }}
                >
                    View all
                </UnstyledButton>
            </Flex>

            <Box
                p="md"
                style={{
                    flex: 1,
                    borderRadius: theme.radius.sm,
                    background: PANEL_BG,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    minHeight: 0,
                }}
            >
                {loading ? (
                    <Flex flex={1} align="center" justify="center" mih={220}>
                        <Loader color="primary" size="sm" />
                    </Flex>
                ) : error ? (
                    <Text size="sm" c="red.4" py="xl" ta="center">
                        {error}
                    </Text>
                ) : (
                    <>
                        <Box style={{ flexShrink: 0 }}>
                            {donutSegments.length > 0 ? (
                                <D3DonutChart
                                    segments={donutSegments}
                                    size={132}
                                    thickness={14}
                                    centerLabel={formatCount(total)}
                                    centerSublabel="Total"
                                    strokeColor={PANEL_BG}
                                    strokeWidth={2}
                                    labelColor={theme.colors.white[0]}
                                    sublabelColor={theme.colors.text[0]}
                                    minWidth={132}
                                />
                            ) : (
                                <EmptyDonutRing />
                            )}

                            <Text size="xs" c="dimmed" ta="center" mt={4}>
                                {active > 0
                                    ? `${formatCount(active)} active in date window`
                                    : "No active sponsorships in date window"}
                            </Text>
                        </Box>

                        <Stack gap={6} style={{ flex: 1 }}>
                            {SEGMENTS.map((s) => {
                                const value = Number(counts[s.key]) || 0;
                                const isActiveRow = s.key === "active";
                                return (
                                    <Flex
                                        key={s.key}
                                        align="center"
                                        justify="space-between"
                                        gap="sm"
                                        px="sm"
                                        py={8}
                                        style={{
                                            borderRadius: theme.radius.sm,
                                            background: isActiveRow
                                                ? "rgba(92, 229, 176, 0.07)"
                                                : "rgba(255,255,255,0.03)",
                                            border: isActiveRow
                                                ? "1px solid rgba(92, 229, 176, 0.18)"
                                                : "1px solid transparent",
                                        }}
                                    >
                                        <Flex align="center" gap={10} miw={0}>
                                            <Box
                                                w={8}
                                                h={8}
                                                style={{
                                                    borderRadius: "50%",
                                                    background: s.color,
                                                    flexShrink: 0,
                                                    opacity: value > 0 ? 1 : 0.35,
                                                }}
                                            />
                                            <Text size="sm" c={value > 0 ? "gray.2" : "dimmed"} lineClamp={1}>
                                                {s.label}
                                            </Text>
                                        </Flex>
                                        <Text
                                            size="sm"
                                            fw={700}
                                            c={value > 0 ? "white" : "dimmed"}
                                            style={{ fontFeatureSettings: '"tnum"', flexShrink: 0 }}
                                        >
                                            {formatCount(value)}
                                        </Text>
                                    </Flex>
                                );
                            })}
                        </Stack>
                    </>
                )}
            </Box>

            <Button
                mt="sm"
                fullWidth
                variant="subtle"
                radius="md"
                size="compact-sm"
                rightSection={<IconChevronRight size={15} />}
                onClick={onManageClick}
                styles={{
                    root: {
                        background: "rgba(92, 229, 176, 0.1)",
                        border: "1px solid rgba(92, 229, 176, 0.22)",
                        color: theme.colors.primary[0],
                        fontWeight: 600,
                        "&:hover": {
                            background: "rgba(92, 229, 176, 0.16)",
                        },
                    },
                }}
            >
                Manage sponsorships
            </Button>
        </Box>
    );
}
