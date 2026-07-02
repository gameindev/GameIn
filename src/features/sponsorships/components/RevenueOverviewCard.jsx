import {
    Box,
    Button,
    Flex,
    Loader,
    Select,
    Stack,
    Text,
    Tooltip,
} from "@mantine/core";
import { IconInfoCircle, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import D3BarChart from "../../../shared/components/d3/D3BarChart";
import { formatCompactCurrency } from "../../../shared/utils/helpers/formatCompactNumber.helper";
import { theme } from "../../../shared/styles/theme/customTheme";
import { analyticsService } from "../services/analytics.service";
import {
    formatUsd,
    pctTrend,
    split30DayWindows,
    sumField,
} from "../../settings/payment/utils/paymentAnalytics.utils";

const GRID_TOKEN = "dark.4";
const LABEL_TOKEN = "gray.4";
const BAR_TOKEN = "teal.5";
const CHART_H = 200;

const BREAKDOWN_OPTIONS = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
];

function formatShortDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(`${String(dateStr).slice(0, 10)}T12:00:00.000Z`);
    if (Number.isNaN(d.getTime())) return String(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

function formatMonthLabel(ym) {
    const [y, m] = String(ym).split("-");
    const d = new Date(Date.UTC(Number(y), Number(m) - 1, 1));
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

function utcWeekStart(dateStr) {
    const d = new Date(`${String(dateStr).slice(0, 10)}T12:00:00.000Z`);
    const day = d.getUTCDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setUTCDate(d.getUTCDate() + diff);
    return d.toISOString().slice(0, 10);
}

function buildChartBars(rows, breakdown) {
    const sorted = [...(rows ?? [])].sort((a, b) => String(a.date).localeCompare(String(b.date)));

    if (breakdown === "day") {
        return sorted.slice(-30).map((r) => ({
            name: r.date,
            value: Number(r.revenue) || 0,
        }));
    }

    if (breakdown === "week") {
        const map = new Map();
        for (const r of sorted) {
            const key = utcWeekStart(r.date);
            map.set(key, (map.get(key) ?? 0) + (Number(r.revenue) || 0));
        }
        return [...map.entries()]
            .sort(([a], [b]) => a.localeCompare(b))
            .slice(-12)
            .map(([name, value]) => ({ name, value }));
    }

    const map = new Map();
    for (const r of sorted) {
        const key = String(r.date).slice(0, 7);
        map.set(key, (map.get(key) ?? 0) + (Number(r.revenue) || 0));
    }
    return [...map.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-6)
        .map(([name, value]) => ({ name, value }));
}

function formatCategoryLabel(name, breakdown) {
    if (breakdown === "month") return formatMonthLabel(name);
    return formatShortDate(name);
}

function pickTickIndices(len) {
    if (len <= 1) return len ? [0] : [];
    const count = Math.min(5, len);
    const step = (len - 1) / (count - 1);
    const indices = [];
    for (let i = 0; i < count; i += 1) {
        indices.push(Math.round(i * step));
    }
    return [...new Set(indices)];
}

export default function RevenueOverviewCard({ subjectIsBrand, forUserId, onViewDetailsClick }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tracking, setTracking] = useState(null);
    const [breakdown, setBreakdown] = useState("day");

    const title = subjectIsBrand ? "Spending overview" : "Revenue overview";
    const totalLabel = subjectIsBrand ? "Total spending" : "Total revenue";
    const tooltipText = subjectIsBrand
        ? "Sum of paid invoice totals (your spend) over the last 30 UTC days."
        : "Sum of paid invoice totals (your earnings) over the last 30 UTC days.";

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
                const data = await analyticsService.getSponsorshipPrivateTracking({
                    ...scopedParams,
                    days: 60,
                });
                if (!cancelled) setTracking(data);
            } catch (e) {
                if (!cancelled) {
                    setError(e?.message ?? "Could not load revenue overview.");
                    setTracking(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [forUserId]);

    const daily = tracking?.series_daily ?? tracking?.series_30d ?? [];

    const { total30, trend } = useMemo(() => {
        const { current, previous } = split30DayWindows(daily);
        const cur = sumField(current, "revenue");
        const prev = sumField(previous, "revenue");
        return { total30: cur, trend: pctTrend(cur, prev) };
    }, [daily]);

    const chartBars = useMemo(() => buildChartBars(daily, breakdown), [daily, breakdown]);
    const xTickIndices = useMemo(() => pickTickIndices(chartBars.length), [chartBars.length]);

    const trendPct = useMemo(() => {
        const match = trend?.text?.match(/([↑↓])\s*([\d.]+)%/);
        if (!match) return null;
        return { arrow: match[1], pct: match[2] };
    }, [trend]);

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
            <Flex justify="space-between" align="center" mb="md" gap="xs">
                <Flex align="center" gap={6}>
                    <Text fw={600} c="white" size="sm" tt="capitalize">
                        {title}
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
                    onClick={onViewDetailsClick}
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
                    View details
                </Button>
            </Flex>

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
                    <Flex justify="space-between" align="flex-start" mb="md" gap="md" wrap="nowrap">
                        <Stack gap={2}>
                            <Text
                                fw={700}
                                fz={28}
                                c="white"
                                lh={1.1}
                                style={{ fontFeatureSettings: '"tnum"' }}
                            >
                                {formatUsd(total30)}
                            </Text>
                            <Text size="xs" c="dimmed">
                                {totalLabel}
                            </Text>
                        </Stack>
                        {trendPct ? (
                            <Stack gap={2} align="flex-end">
                                <Flex
                                    align="center"
                                    gap={4}
                                    px={8}
                                    py={4}
                                    style={{
                                        borderRadius: 999,
                                        background: trend.up
                                            ? "rgba(16, 185, 129, 0.15)"
                                            : "rgba(239, 68, 68, 0.15)",
                                        border: trend.up
                                            ? "1px solid rgba(16, 185, 129, 0.35)"
                                            : "1px solid rgba(239, 68, 68, 0.35)",
                                    }}
                                >
                                    {trend.up ? (
                                        <IconTrendingUp size={14} color={theme.colors.primary[0]} />
                                    ) : (
                                        <IconTrendingDown size={14} color={theme.colors.hoverRed[0]} />
                                    )}
                                    <Text
                                        size="xs"
                                        fw={600}
                                        c={trend.up ? "teal.4" : "red.4"}
                                        style={{ fontFeatureSettings: '"tnum"' }}
                                    >
                                        {trendPct.pct}%
                                    </Text>
                                </Flex>
                                <Text size="xs" c="dimmed">
                                    vs last 30 days
                                </Text>
                            </Stack>
                        ) : null}
                    </Flex>

                    <Box style={{ flex: 1, minHeight: CHART_H }}>
                        {chartBars.length ? (
                            <D3BarChart
                                data={chartBars}
                                categoryKey="name"
                                valueKey="value"
                                height={CHART_H}
                                minWidth={160}
                                barColorToken={BAR_TOKEN}
                                gridColorToken={GRID_TOKEN}
                                labelColorToken={LABEL_TOKEN}
                                labelFontSize={10}
                                showValueAxis
                                barThicknessPx={8}
                                xTickIndices={xTickIndices}
                                formatCategoryTick={(name) => formatCategoryLabel(name, breakdown)}
                                formatValueTick={(v) =>
                                    formatCompactCurrency(v, { zero: "0", empty: "$0" })
                                }
                                valueFormat={formatUsd}
                            />
                        ) : (
                            <Flex align="center" justify="center" h="100%">
                                <Text size="sm" c="dimmed">
                                    No revenue data in this period.
                                </Text>
                            </Flex>
                        )}
                    </Box>

                    <Flex align="center" justify="space-between" mt="sm" gap="sm">
                        <Text size="xs" c="dimmed">
                            Breakdown by
                        </Text>
                        <Select
                            size="xs"
                            value={breakdown}
                            onChange={(v) => setBreakdown(v ?? "day")}
                            data={BREAKDOWN_OPTIONS}
                            allowDeselect={false}
                            w={100}
                            styles={{
                                input: {
                                    background: "rgba(0,0,0,0.25)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: theme.colors.white[0],
                                    fontWeight: 500,
                                },
                            }}
                        />
                    </Flex>
                </>
            )}
        </Box>
    );
}
