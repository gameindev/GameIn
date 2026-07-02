import { Box, Checkbox, Flex, Loader, SegmentedControl, Stack, Text, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import StatBox from "../../../shared/components/StatBox";
// import IconButton from "../../../shared/components/IconButton"; // Reserved for a future card action.
import D3PerformanceLineChart from "../../../shared/components/d3/D3PerformanceLineChart";
import { theme } from "../../../shared/styles/theme/customTheme";
import { analyticsService } from "../services/analytics.service";

const GRID_TOKEN = "dark.4";
const LABEL_TOKEN = "gray.4";

const RANGE_OPTIONS = [
    { label: "Today", value: "today" },
    { label: "7D", value: "7" },
    { label: "30D", value: "30" },
    { label: "90D", value: "90" },
];

function buildDailyRows(moneySeries, socialSeries, moneyKey) {
    const byDate = new Map();

    for (const row of moneySeries) {
        byDate.set(row.date, {
            date: row.date,
            [moneyKey]: Number(row.revenue) || 0,
            Sponsorships: Number(row.paid_orders) || 0,
            Engagement: 0,
            Followers: 0,
        });
    }

    for (const row of socialSeries ?? []) {
        const base = byDate.get(row.date) ?? {
            date: row.date,
            [moneyKey]: 0,
            Sponsorships: 0,
            Engagement: 0,
            Followers: 0,
        };
        base.Followers = Number(row.followers) || 0;
        base.Engagement = Number(row.likes) || 0;
        byDate.set(row.date, base);
    }

    return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
}

function buildTodayRows(hourly, moneyKey) {
    return (hourly ?? []).map((h) => ({
        date: String(h.hour),
        [moneyKey]: Number(h.amount) || 0,
        Sponsorships: 0,
        Engagement: 0,
        Followers: 0,
    }));
}

function seriesHasSignal(data, keys) {
    return data.some((row) => keys.some((k) => (Number(row[k]) || 0) > 0));
}

const LEGEND_CHECKBOX_STYLES = {
    root: { display: "inline-flex", alignItems: "center" },
    body: { alignItems: "center" },
    inner: { marginTop: 0, marginBottom: 0, alignSelf: "center" },
    labelWrapper: { display: "flex", alignItems: "center" },
    label: {
        paddingLeft: 8,
        paddingTop: 0,
        paddingBottom: 0,
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
    },
};

function LegendSwatchLabel({ color, label, dimmed }) {
    return (
        <Flex align="center" gap={6} component="span" style={{ lineHeight: 1 }}>
            <Box
                w={10}
                h={10}
                style={{
                    borderRadius: 2,
                    background: color,
                    opacity: dimmed ? 0.35 : 1,
                    flexShrink: 0,
                }}
            />
            <Text size="sm" component="span" lh={1} c={dimmed ? "dimmed" : "gray.3"}>
                {label}
            </Text>
        </Flex>
    );
}

/**
 * Owner-private performance chart: paid income/spend vs sponsorships, social engagement, and followers.
 */
export default function SponsorshipPrivateTracking({ subjectIsBrand, forUserId }) {
    const scopedParams = forUserId != null && Number.isFinite(Number(forUserId)) ? { forUserId: Number(forUserId) } : {};
    const moneyKey = subjectIsBrand ? "Spending" : "Revenue";
    const title = "Performance over time";
    const leftAxisLabel = subjectIsBrand ? "Spending (USD)" : "Revenue (USD)";

    const legendItems = useMemo(
        () => [
            { key: moneyKey, label: moneyKey, color: theme.colors.primary[0] },
            { key: "Sponsorships", label: "Sponsorships", color: theme.colors.secondary[0] },
            { key: "Engagement", label: "Engagement", color: theme.colors.skyblue[0] },
            { key: "Followers", label: "Followers", color: theme.colors.yellow[0] },
        ],
        [moneyKey],
    );

    const rightSeries = useMemo(
        () => [
            { key: "Sponsorships", colorToken: "violet.5" },
            { key: "Engagement", colorToken: "blue.5" },
            { key: "Followers", colorToken: "yellow.5" },
        ],
        [],
    );

    const [range, setRange] = useState("30");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tracking, setTracking] = useState(null);
    const [trends, setTrends] = useState(null);
    const [visible, setVisible] = useState({
        [moneyKey]: true,
        Sponsorships: true,
        Engagement: true,
        Followers: true,
    });

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const days = range === "today" ? 1 : Number(range) || 30;
                const fetchTrends = range !== "today";
                const [tr, trn] = await Promise.all([
                    analyticsService.getSponsorshipPrivateTracking({ ...scopedParams, days }),
                    fetchTrends
                        ? analyticsService.getSocialTrends(days, scopedParams)
                        : Promise.resolve(null),
                ]);
                if (!cancelled) {
                    setTracking(tr);
                    setTrends(trn);
                }
            } catch (e) {
                if (!cancelled) {
                    setError(e?.message ?? "Could not load performance data.");
                    setTracking(null);
                    setTrends(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [range, forUserId]);

    useEffect(() => {
        if (range === "today") {
            setVisible({
                [moneyKey]: true,
                Sponsorships: false,
                Engagement: false,
                Followers: false,
            });
        } else {
            setVisible({
                [moneyKey]: true,
                Sponsorships: true,
                Engagement: true,
                Followers: true,
            });
        }
    }, [range, moneyKey]);

    const chartData = useMemo(() => {
        if (!tracking) return [];
        if (range === "today") {
            return buildTodayRows(tracking.income_today?.hourly, moneyKey);
        }
        const daily = tracking.series_daily ?? tracking.series_30d ?? tracking.series_14d ?? [];
        return buildDailyRows(daily, trends?.series, moneyKey);
    }, [tracking, trends, range, moneyKey]);

    const toggleSeries = (key) => {
        setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const emptyChart = !seriesHasSignal(chartData, legendItems.map((s) => s.key));

    return (
        <>
            {/* Unused action retained for future use:
            <IconButton hoverClass="hoverYellow" />
            */}
        <StatBox title={title} h="auto">
            <Stack gap="md">
                <Flex justify="space-between" align="center" wrap="wrap" gap="sm">
                    <Flex align="center" gap="md" wrap="wrap" style={{ rowGap: 8 }}>
                        {legendItems.map((item) => {
                            const dailyOnly = range === "today" && item.key !== moneyKey;
                            return (
                                <Checkbox
                                    key={item.key}
                                    size="xs"
                                    checked={visible[item.key] !== false}
                                    disabled={dailyOnly}
                                    onChange={() => toggleSeries(item.key)}
                                    label={
                                        <LegendSwatchLabel
                                            color={item.color}
                                            label={item.label}
                                            dimmed={dailyOnly}
                                        />
                                    }
                                    styles={{
                                        ...LEGEND_CHECKBOX_STYLES,
                                        label: {
                                            ...LEGEND_CHECKBOX_STYLES.label,
                                            cursor: dailyOnly ? "not-allowed" : "pointer",
                                        },
                                    }}
                                />
                            );
                        })}
                        <Tooltip
                            label="Revenue/spending from paid invoices (UTC). Sponsorships = paid invoice count. Engagement = daily social likes. Followers = connected account snapshot totals."
                            multiline
                            w={280}
                        >
                            <Flex align="center" component="span" style={{ lineHeight: 0, cursor: "help" }}>
                                <IconInfoCircle size={16} color={theme.colors.text[0]} style={{ opacity: 0.6 }} />
                            </Flex>
                        </Tooltip>
                    </Flex>

                    <SegmentedControl
                        value={range}
                        onChange={setRange}
                        data={RANGE_OPTIONS}
                        size="xs"
                        styles={{
                            root: { background: "rgba(0,0,0,0.25)" },
                            label: { padding: "0.35rem 0.65rem", fontSize: "0.75rem" },
                        }}
                    />
                </Flex>

                <Box
                    p="sm"
                    style={{
                        borderRadius: theme.radius.sm,
                        background: "rgba(0,0,0,0.22)",
                        minHeight: 280,
                    }}
                >
                    {loading ? (
                        <Flex align="center" justify="center" mih={260}>
                            <Loader color="primary" size="sm" />
                        </Flex>
                    ) : error ? (
                        <Text size="sm" c="red.4" py="xl" ta="center">
                            {error}
                        </Text>
                    ) : emptyChart ? (
                        <Text size="sm" c="dimmed" py="xl" ta="center">
                            {range === "today"
                                ? "No paid invoices yet today (UTC)."
                                : "No performance data in this window yet."}
                        </Text>
                    ) : (
                        <D3PerformanceLineChart
                            data={chartData}
                            xKey="date"
                            leftKey={moneyKey}
                            leftLabel={moneyKey}
                            leftColorToken="teal.5"
                            rightSeries={rightSeries}
                            visibleKeys={visible}
                            height={300}
                            minWidth={280}
                            gridColorToken={GRID_TOKEN}
                            labelColorToken={LABEL_TOKEN}
                            leftAxisLabel={leftAxisLabel}
                        />
                    )}
                </Box>

                {!loading && !error && tracking?.income_today?.date_utc && (
                    <Text size="xs" c="dimmed">
                        Today (UTC):{" "}
                        {new Intl.NumberFormat(undefined, {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 2,
                        }).format(Number(tracking.income_today.total) || 0)}{" "}
                        · {tracking.income_today.date_utc}
                    </Text>
                )}
            </Stack>
        </StatBox>
        </>
    );
}
