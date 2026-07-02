import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
    Box,
    Button,
    Flex,
    Loader,
    SegmentedControl,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import {
    IconBolt,
    IconCurrencyDollar,
    IconHeartHandshake,
} from "@tabler/icons-react";
import IconButton from "../../../../shared/components/IconButton";
import { theme } from "../../../../shared/styles/theme/customTheme";
import { useAppSelector } from "../../../../app/store/hooks";
import { currentUser } from "../../../auth/store/selector";
import { USERTYPES } from "../../../../shared/enums/userTypesEnum";
import usePaymentAnalytics from "../../../settings/payment/hooks/usePaymentAnalytics";
import { analyticsService } from "../../../sponsorships/services/analytics.service";
import {
    formatPct,
    formatUsd,
    pctTrend,
    ppTrend,
    split30DayWindows,
    sumField,
    windowErPercent,
} from "../../../settings/payment/utils/paymentAnalytics.utils";
import { formatCompactCurrency } from "../../../../shared/utils/helpers/formatCompactNumber.helper";
import DashboardPerformanceTrendChart from "./DashboardPerformanceTrendChart";

const PANEL_BG = "rgba(0,0,0,0.22)";
const CARD_BORDER = "1px solid rgba(255,255,255,0.06)";

const ICON_WRAP = {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "rgba(92, 229, 176, 0.14)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
};

const TREND_TABS = [
    { value: "revenue", label: "Revenue" },
    { value: "followers", label: "Followers" },
    { value: "engagement", label: "Engagement" },
];

function SummaryKpiCard({ icon: Icon, label, value, trend }) {
    return (
        <Box
            p="md"
            style={{
                background: theme.colors.secondaryGrey[0],
                borderRadius: theme.radius.md,
                border: CARD_BORDER,
                height: "100%",
                minWidth: 0,
            }}
        >
            <Flex align="center" gap="md" wrap="nowrap">
                <Box style={ICON_WRAP}>
                    <Icon size={22} color={theme.colors.primary[0]} stroke={1.75} />
                </Box>
                <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Text size="xs" c="dimmed" tt="capitalize" lineClamp={1}>
                        {label}
                    </Text>
                    <Text fw={700} fz="xl" c="white" lh={1.2} style={{ fontFeatureSettings: '"tnum"' }}>
                        {value}
                    </Text>
                    {trend?.text ? (
                        <Text size="xs" c={trend.up ? "teal.4" : "red.4"} lh={1.3}>
                            {trend.text}
                        </Text>
                    ) : null}
                </Stack>
            </Flex>
        </Box>
    );
}

function buildEngagementSeries(series) {
    const sorted = [...(series ?? [])]
        .sort((a, b) => String(a.date).localeCompare(String(b.date)))
        .slice(-30);

    return sorted.map((row, i, arr) => {
        const followers = Number(row.followers) || 0;
        const likes = Number(row.likes) || 0;
        const prevLikes = i > 0 ? Number(arr[i - 1].likes) || 0 : likes;
        const dailyLikes = i === 0 ? likes : Math.max(0, likes - prevLikes);
        const er = followers > 0 ? (dailyLikes / followers) * 100 : 0;
        return { date: row.date, value: er };
    });
}

export default function DashboardPerformanceSummary() {
    const navigate = useNavigate();
    const user = useAppSelector(currentUser);
    const userType = user?.user_type?.toUpperCase() ?? "";
    const isBrand = userType === USERTYPES.BRAND;
    const isCreator = userType === USERTYPES.CREATOR;
    const showMoney = isBrand || isCreator;

    const [engagement, setEngagement] = useState(null);
    const [overview, setOverview] = useState(null);
    const [auxLoading, setAuxLoading] = useState(true);
    const [trendTab, setTrendTab] = useState("revenue");

    const { loading, tracking, trends } = usePaymentAnalytics({
        includeWallet: false,
        trackingDays: 60,
        enabled: showMoney,
    });

    useEffect(() => {
        if (!showMoney) {
            setAuxLoading(false);
            return;
        }

        let cancelled = false;
        setAuxLoading(true);

        Promise.all([
            analyticsService.getSocialEngagement(),
            analyticsService.getSponsorshipOverview(),
        ])
            .then(([engagementData, overviewData]) => {
                if (!cancelled) {
                    setEngagement(engagementData);
                    setOverview(overviewData);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setEngagement(null);
                    setOverview(null);
                }
            })
            .finally(() => {
                if (!cancelled) setAuxLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [showMoney]);

    const daily = tracking?.series_daily ?? tracking?.series_30d ?? [];
    const trendSeries = trends?.series ?? [];

    const kpis = useMemo(() => {
        const { current: moneyCur, previous: moneyPrev } = split30DayWindows(daily);
        const revenueCur = sumField(moneyCur, "revenue");
        const revenuePrev = sumField(moneyPrev, "revenue");
        const ordersCur = sumField(moneyCur, "paid_orders");
        const ordersPrev = sumField(moneyPrev, "paid_orders");

        const activeCount = Number(overview?.counts?.active) || 0;

        const { current: socialCur, previous: socialPrev } = split30DayWindows(trendSeries);
        const erFromApi = engagement?.rates?.engagement_rate_followers;
        const erNow =
            erFromApi != null && Number.isFinite(Number(erFromApi))
                ? Number(erFromApi) * 100
                : windowErPercent(socialCur);
        const erPrev = windowErPercent(socialPrev);

        return [
            {
                key: "revenue",
                icon: IconCurrencyDollar,
                label: isBrand ? "Total spend" : "Total revenue",
                value: formatUsd(revenueCur),
                trend: pctTrend(revenueCur, revenuePrev),
            },
            {
                key: "active",
                icon: IconHeartHandshake,
                label: "Active sponsorships",
                value: String(activeCount),
                trend: pctTrend(ordersCur, ordersPrev),
            },
            {
                key: "er",
                icon: IconBolt,
                label: "Engagement rate",
                value: formatPct(erNow),
                trend: ppTrend(erNow, erPrev),
            },
        ];
    }, [daily, trendSeries, engagement, overview, isBrand]);

    const trendChart = useMemo(() => {
        const last30Daily = [...daily]
            .sort((a, b) => String(a.date).localeCompare(String(b.date)))
            .slice(-30);
        const last30Social = [...trendSeries]
            .sort((a, b) => String(a.date).localeCompare(String(b.date)))
            .slice(-30);

        if (trendTab === "revenue") {
            return {
                data: last30Daily.map((row) => ({
                    date: row.date,
                    value: Number(row.revenue) || 0,
                })),
                formatValue: (v) => formatCompactCurrency(v, { zero: "$0", empty: "$0" }),
            };
        }

        if (trendTab === "followers") {
            return {
                data: last30Social.map((row) => ({
                    date: row.date,
                    value: Number(row.followers) || 0,
                })),
                formatValue: (v) =>
                    v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(Math.round(v)),
            };
        }

        return {
            data: buildEngagementSeries(last30Social),
            formatValue: (v) => `${Number(v).toFixed(1)}%`,
        };
    }, [trendTab, daily, trendSeries]);

    const goToStats = () => navigate("/stats");
    const isLoading = showMoney && (loading || auxLoading);

    if (!showMoney) {
        return (
            <Box
                p="md"
                style={{
                    background: theme.colors.secondaryGrey[0],
                    borderRadius: theme.radius.md,
                    border: CARD_BORDER,
                }}
            >
                <Text c="dimmed" size="sm">
                    Performance summary is available for creator and brand accounts.
                </Text>
            </Box>
        );
    }

    return (
        <Box
            p="md"
            style={{
                background: theme.colors.secondaryGrey[0],
                borderRadius: theme.radius.md,
                border: CARD_BORDER,
            }}
        >
            <Flex justify="space-between" align="flex-start" gap="md" mb="md">
                <Stack gap={2}>
                    <Title order={4} c={theme.colors.white[0]}>
                        Performance Summary
                    </Title>
                    <Text size="sm" c="dimmed">
                        Last 30 days
                    </Text>
                </Stack>
                <IconButton hoverClass="hoverYellow" onClick={goToStats} aria-label="Open full stats" />
            </Flex>

            {isLoading ? (
                <Flex justify="center" py="xl">
                    <Loader color="primary" size="sm" />
                </Flex>
            ) : (
                <>
                    <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} spacing="md">
                        {kpis.map(({ key, ...kpiProps }) => (
                            <SummaryKpiCard key={key} {...kpiProps} />
                        ))}
                    </SimpleGrid>

                    <Box
                        mt="lg"
                        p="md"
                        style={{
                            background: PANEL_BG,
                            borderRadius: theme.radius.md,
                            border: "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        <Flex
                            justify="space-between"
                            align={{ base: "stretch", sm: "center" }}
                            direction={{ base: "column", sm: "row" }}
                            gap="sm"
                            mb="md"
                        >
                            <Text fw={600} c="white" size="sm">
                                Performance Trend
                            </Text>
                            <SegmentedControl
                                value={trendTab}
                                onChange={setTrendTab}
                                data={TREND_TABS}
                                size="xs"
                                styles={{
                                    root: { background: "rgba(0,0,0,0.25)" },
                                    label: { color: theme.colors.text[0], fontWeight: 500 },
                                    indicator: {
                                        background: "rgba(92, 229, 176, 0.2)",
                                        border: `1px solid ${theme.colors.primary[0]}`,
                                    },
                                }}
                            />
                        </Flex>

                        <DashboardPerformanceTrendChart
                            data={trendChart.data}
                            formatValue={trendChart.formatValue}
                        />
                    </Box>

                    <Button
                        mt="md"
                        fullWidth
                        radius="md"
                        variant="default"
                        onClick={goToStats}
                        styles={{
                            root: {
                                background: "rgba(0,0,0,0.28)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: theme.colors.white[0],
                                fontWeight: 500,
                                height: 42,
                                "&:hover": {
                                    background: "rgba(255,255,255,0.06)",
                                },
                            },
                        }}
                    >
                        View Full Stats →
                    </Button>
                </>
            )}
        </Box>
    );
}
