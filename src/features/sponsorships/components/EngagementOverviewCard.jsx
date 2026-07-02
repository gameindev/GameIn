import { Box, Button, Flex, Loader, SimpleGrid, Stack, Text, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useMemo } from "react";
import D3EngagementSparkChart from "../../../shared/components/d3/D3EngagementSparkChart";
import { formatCompactNumber } from "../../../shared/utils/helpers/formatCompactNumber.helper";
import { theme } from "../../../shared/styles/theme/customTheme";
import {
    formatCount,
    formatPct,
    pctTrend,
    ppTrend,
    split30DayWindows,
    sumField,
    windowErPercent,
} from "../../settings/payment/utils/paymentAnalytics.utils";

const PANEL_BG = "rgba(0,0,0,0.22)";
const STAT_TILE_STYLE = {
    borderRadius: theme.radius.sm,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.12)",
    padding: theme.spacing.md,
};

function windowAvgDailyFlow(rows, field) {
    if (!rows?.length) return 0;
    if (rows.length === 1) return Number(rows[0][field]) || 0;
    const first = Number(rows[0][field]) || 0;
    const last = Number(rows[rows.length - 1][field]) || 0;
    return Math.max(0, last - first) / (rows.length - 1);
}

function buildEngagementTrendSeries(series) {
    const sorted = [...(series ?? [])]
        .sort((a, b) => String(a.date).localeCompare(String(b.date)))
        .slice(-30);

    if (!sorted.length) return [];

    return sorted.map((row, i) => {
        const likes = Number(row.likes) || 0;
        const prevLikes = i > 0 ? Number(sorted[i - 1].likes) || 0 : likes;
        const daily = i === 0 ? likes : Math.max(0, likes - prevLikes);
        return { date: row.date, value: daily };
    });
}

function MetricTile({ label, value, trend }) {
    return (
        <Box style={STAT_TILE_STYLE}>
            <Text size="xs" c="dimmed" mb={6}>
                {label}
            </Text>
            <Text
                fw={700}
                fz={22}
                c="white"
                lh={1.15}
                style={{ fontFeatureSettings: '"tnum"' }}
            >
                {value}
            </Text>
            {trend?.text ? (
                <Text size="xs" c={trend.up ? "teal.4" : "red.4"} mt={6} lh={1.35}>
                    {trend.text}
                </Text>
            ) : null}
        </Box>
    );
}

function buildEngagementStats(engagement, trends) {
    const totals = engagement?.totals ?? {};
    const series = trends?.series ?? [];
    const { current, previous } = split30DayWindows(series);

    const erFromApi = engagement?.rates?.engagement_rate_followers;
    const erNow =
        erFromApi != null && Number.isFinite(Number(erFromApi))
            ? Number(erFromApi) * 100
            : windowErPercent(current);
    const erPrev = windowErPercent(previous);

    const avgViewsNow = windowAvgDailyFlow(current, "views");
    const avgViewsPrev = windowAvgDailyFlow(previous, "views");

    const likesNow = Number(totals.likes) || 0;
    const commentsNow = Number(totals.comments) || 0;
    const likesRatio = likesNow > 0 ? commentsNow / likesNow : 0;

    const likesCurWindow = sumField(current, "likes");
    const likesPrevWindow = sumField(previous, "likes");
    const commentsPrevEst = likesPrevWindow * likesRatio;

    const likesTrendCur = current.length
        ? Math.max(0, (Number(current[current.length - 1]?.likes) || 0) - (Number(current[0]?.likes) || 0))
        : likesNow;
    const likesTrendPrev = previous.length
        ? Math.max(0, (Number(previous[previous.length - 1]?.likes) || 0) - (Number(previous[0]?.likes) || 0))
        : 0;

    return {
        trendSeries: buildEngagementTrendSeries(series),
        tiles: [
            {
                key: "er",
                label: "Engagement Rate",
                value: formatPct(erNow),
                trend: ppTrend(erNow, erPrev),
            },
            {
                key: "views",
                label: "Avg. Views",
                value: formatCompactNumber(avgViewsNow),
                trend: pctTrend(avgViewsNow, avgViewsPrev),
            },
            {
                key: "comments",
                label: "Comments",
                value: formatCount(commentsNow),
                trend: pctTrend(commentsNow, commentsPrevEst || commentsNow),
            },
            {
                key: "likes",
                label: "Likes",
                value: formatCount(likesNow),
                trend: pctTrend(likesTrendCur, likesTrendPrev),
            },
        ],
    };
}

export default function EngagementOverviewCard({
    engagement,
    trends,
    loading,
    onViewAllClick,
    tooltipText = "Engagement metrics from sampled posts and social rollups over the last 30 UTC days.",
}) {
    const { tiles, trendSeries } = useMemo(
        () => buildEngagementStats(engagement, trends),
        [engagement, trends],
    );

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
            }}
        >
            <Flex justify="space-between" align="center" mb="md" gap="xs">
                <Flex align="center" gap={6}>
                    <Text fw={600} c="white" size="sm">
                        Engagement
                    </Text>
                    <Tooltip label={tooltipText} multiline w={280}>
                        <Flex component="span" align="center" style={{ lineHeight: 0, cursor: "help" }}>
                            <IconInfoCircle size={14} color={theme.colors.text[0]} style={{ opacity: 0.55 }} />
                        </Flex>
                    </Tooltip>
                </Flex>
                <Button
                    variant="default"
                    size="compact-xs"
                    radius="md"
                    onClick={onViewAllClick}
                    styles={{
                        root: {
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.14)",
                            color: theme.colors.white[0],
                            fontWeight: 500,
                            "&:hover": {
                                background: "rgba(255,255,255,0.05)",
                            },
                        },
                    }}
                >
                    View all
                </Button>
            </Flex>

            {loading ? (
                <Flex flex={1} align="center" justify="center" mih={220}>
                    <Loader color="primary" size="sm" />
                </Flex>
            ) : (
                <Stack gap="md" style={{ flex: 1 }}>
                    <Box
                        p="md"
                        style={{
                            borderRadius: theme.radius.sm,
                            background: PANEL_BG,
                        }}
                    >
                        <SimpleGrid cols={2} spacing="sm">
                            {tiles.map((tile) => (
                                <MetricTile
                                    key={tile.key}
                                    label={tile.label}
                                    value={tile.value}
                                    trend={tile.trend}
                                />
                            ))}
                        </SimpleGrid>

                        {trendSeries.length > 0 ? (
                            <Box mt="lg">
                                <D3EngagementSparkChart data={trendSeries} height={80} />
                                <Text size="xs" c="dimmed" mt="xs">
                                    Engagement trend (30 days)
                                </Text>
                            </Box>
                        ) : null}
                    </Box>
                </Stack>
            )}
        </Box>
    );
}
