import { Box, Flex, Loader, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../../app/store/hooks";
import { currentUser } from "../../../auth/store/selector";
import { USERTYPES } from "../../../../shared/enums/userTypesEnum";
import D3BarChart from "../../../../shared/components/d3/D3BarChart";
import IconButton from "../../../../shared/components/IconButton";
import { theme } from "../../../../shared/styles/theme/customTheme";
import { analyticsService } from "../../../sponsorships/services/analytics.service";

const CHART_H = 108;
const GRID_TOKEN = "dark.5";
const LABEL_TOKEN = "gray.5";
const BAR_TOKEN = "violet.5";
const INSET_BG = "rgba(0,0,0,0.22)";

const UTC_DOW = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function utcWeekdayAbbr(isoDate) {
    if (!isoDate || typeof isoDate !== "string") return "—";
    const d = new Date(`${isoDate}T12:00:00.000Z`);
    return UTC_DOW[d.getUTCDay()] ?? "—";
}

function isoUtcToDdMmYyyy(iso) {
    if (!iso || typeof iso !== "string") return "";
    const [y, m, day] = iso.split("-");
    if (!y || !m || !day) return iso;
    return `${day}.${m}.${y}`;
}

function hourTickLabel(hourStr) {
    const h = Number(hourStr);
    if (!Number.isFinite(h)) return hourStr;
    if (h === 0) return "12am";
    if (h < 12) return `${h}am`;
    if (h === 12) return "12pm";
    return `${h - 12}pm`;
}

/** de-DE style currency: accent on symbol, decimal separator, and fraction digits (reference UI). */
function IncomeMoneyDisplay({ value }) {
    if (value == null || !Number.isFinite(Number(value))) {
        return (
            <Text component="div" lh={1.15} fw={700} fz="xl" c="dimmed">
                —
            </Text>
        );
    }
    const parts = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).formatToParts(Number(value));

    return (
        <Text component="div" lh={1.15} fw={700} fz="xl" style={{ fontFeatureSettings: '"tnum"' }}>
            {parts.map((p, i) => {
                const accent =
                    p.type === "currency" || p.type === "decimal" || p.type === "fraction";
                return (
                    <Text key={i} span inherit fw={700} c={accent ? "teal.4" : "white"} style={{ fontSize: "0.8rem" }}>
                        {p.value}
                    </Text>
                );
            })}
        </Text>
    );
}

/**
 * Paid sponsorship money from the same analytics APIs as Stats (`/analytics/sponsorship-private-tracking`,
 * `/analytics/sponsorships-summary`). Totals use rolling invoice windows; daily charts use UTC calendar days
 * from private tracking (30-day series, last 7 for the week tile, hourly for today).
 */
export default function DashboardIncomeStats() {
    const navigate = useNavigate();
    const user = useAppSelector(currentUser);
    const userType = user?.user_type?.toUpperCase() ?? "";
    const canLoadMoney = userType === USERTYPES.CREATOR || userType === USERTYPES.BRAND;
    const isBrand = userType === USERTYPES.BRAND;

    const [loading, setLoading] = useState(canLoadMoney);
    const [error, setError] = useState(null);
    const [tracking, setTracking] = useState(null);
    const [summary365, setSummary365] = useState(null);
    const [summary30, setSummary30] = useState(null);

    useEffect(() => {
        if (!canLoadMoney) {
            setLoading(false);
            return;
        }
        let cancelled = false;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const [tr, s365, s30] = await Promise.all([
                    analyticsService.getSponsorshipPrivateTracking({}),
                    analyticsService.getSponsorshipsSummary(365, {}),
                    analyticsService.getSponsorshipsSummary(30, {}),
                ]);
                if (!cancelled) {
                    setTracking(tr);
                    setSummary365(s365);
                    setSummary30(s30);
                }
            } catch (e) {
                if (!cancelled) {
                    setError(e?.message ?? "Could not load payment stats.");
                    setTracking(null);
                    setSummary365(null);
                    setSummary30(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [canLoadMoney]);

    const labelFontSize = "0.42rem";

    const paidWord = isBrand ? "SPEND" : "PAID";
    const todayVerb = isBrand ? "SPEND" : "INCOME";

    const seriesDaily = useMemo(
        () => tracking?.series_30d ?? tracking?.series_14d ?? [],
        [tracking],
    );

    const yearTotal = Number(summary365?.total_revenue) || 0;
    const monthTotal = Number(summary30?.total_revenue) || 0;

    const weekSlice = useMemo(() => seriesDaily.slice(-7), [seriesDaily]);
    const weekTotal = useMemo(
        () => weekSlice.reduce((s, r) => s + (Number(r.revenue) || 0), 0),
        [weekSlice],
    );

    const dayTotal = Number(tracking?.income_today?.total) || 0;
    const paidDayIso = tracking?.income_today?.date_utc ?? "";

    const yearBars = useMemo(() => [{ name: "365d", value: Math.max(0, yearTotal) }], [yearTotal]);

    const monthBars = useMemo(
        () =>
            seriesDaily.map((row, i) => ({
                name: String(i),
                value: Math.max(0, Number(row.revenue) || 0),
            })),
        [seriesDaily],
    );

    const weekBars = useMemo(
        () =>
            weekSlice.map((row) => ({
                name: utcWeekdayAbbr(row.date),
                value: Math.max(0, Number(row.revenue) || 0),
            })),
        [weekSlice],
    );

    const dayBars = useMemo(() => {
        const hourly = tracking?.income_today?.hourly ?? [];
        if (!hourly.length) return [];
        return hourly.map((h) => ({
            name: String(h.hour),
            value: Math.max(0, Number(h.amount) || 0),
        }));
    }, [tracking]);

    const nfInt = (v) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(v);

    if (!canLoadMoney) {
        return (
            <Box
                w="100%"
                h="100%"
                p="md"
                style={{
                    background: theme.colors.secondaryGrey[0],
                    borderRadius: theme.radius.md,
                    border: `1px solid ${theme.colors.primary[4]}`,
                    minWidth: 0,
                }}
            >
                <Text size="sm" c="dimmed">
                    Payment totals and charts are available for creator and brand accounts.
                </Text>
            </Box>
        );
    }

    if (loading) {
        return (
            <Box
                w="100%"
                h="100%"
                p="xl"
                style={{
                    background: theme.colors.secondaryGrey[0],
                    borderRadius: theme.radius.md,
                    border: `1px solid ${theme.colors.primary[4]}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 200,
                }}
            >
                <Loader color="primary" size="sm" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                w="100%"
                p="md"
                style={{
                    background: theme.colors.secondaryGrey[0],
                    borderRadius: theme.radius.md,
                    border: `1px solid ${theme.colors.primary[4]}`,
                }}
            >
                <Text size="sm" c="red.4">
                    {error}
                </Text>
            </Box>
        );
    }

    const monthLen = monthBars.length;
    const dayLen = dayBars.length;

    return (
        <Box
            w="100%"
            h="100%"
            p="md"
            style={{
                background: theme.colors.secondaryGrey[0],
                borderRadius: theme.radius.md,
                // border: `1px solid ${theme.colors.primary[4]}`,
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
            }}
        >
            <Flex justify="space-between" align="center" wrap="nowrap" gap="xs" mb="xs">
                <Text
                    tt="none"
                    fz="sm"
                    fw={600}
                    c="white"
                    style={{ letterSpacing: "0.02em", textTransform: "none" }}
                >
                    Stats
                </Text>
                <IconButton hoverClass="hoverYellow" onClick={() => navigate("/stats")} />
            </Flex>
            {/* <Text size="xs" c="dimmed" mb="sm" lh={1.4}>
                Paid invoice totals (USD). Day = UTC calendar day by invoice update time; bars use UTC daily slices
                where shown.
            </Text> */}

            <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="sm" verticalSpacing="sm" style={{ flex: 1 }}>
                <IncomeTile
                    title={`${paidWord} / ROLLING 365 DAYS`}
                    amount={yearTotal}
                    chart={
                        <D3BarChart
                            data={yearBars}
                            categoryKey="name"
                            valueKey="value"
                            height={CHART_H}
                            minWidth={120}
                            barColorToken={BAR_TOKEN}
                            gridColorToken={GRID_TOKEN}
                            labelColorToken={LABEL_TOKEN}
                            labelFontSize={labelFontSize}
                            showValueAxis={false}
                            barThicknessPx={22}
                            valueFormat={nfInt}
                        />
                    }
                />
                <IncomeTile
                    title={`${paidWord} / ROLLING 30 DAYS`}
                    amount={monthTotal}
                    chart={
                        monthLen ? (
                            <D3BarChart
                                data={monthBars}
                                categoryKey="name"
                                valueKey="value"
                                height={CHART_H}
                                minWidth={120}
                                barColorToken={BAR_TOKEN}
                                gridColorToken={GRID_TOKEN}
                                labelColorToken={LABEL_TOKEN}
                                labelFontSize={labelFontSize}
                                showValueAxis={false}
                                barThicknessPx={5}
                                xTickIndices={monthLen > 1 ? [0, monthLen - 1] : [0]}
                                formatCategoryTick={(_, i) => {
                                    const row = seriesDaily[i];
                                    if (!row?.date) return "";
                                    return isoUtcToDdMmYyyy(row.date);
                                }}
                                valueFormat={nfInt}
                            />
                        ) : (
                            <Text size="xs" c="dimmed" py="sm" ta="center">
                                No daily series yet.
                            </Text>
                        )
                    }
                />
                <IncomeTile
                    title={`${paidWord} / LAST 7 UTC DAYS`}
                    amount={weekTotal}
                    chart={
                        weekBars.length ? (
                            <D3BarChart
                                data={weekBars}
                                categoryKey="name"
                                valueKey="value"
                                height={CHART_H}
                                minWidth={120}
                                barColorToken={BAR_TOKEN}
                                gridColorToken={GRID_TOKEN}
                                labelColorToken={LABEL_TOKEN}
                                labelFontSize={labelFontSize}
                                showValueAxis={false}
                                barThicknessPx={12}
                                xLabelRotate={-28}
                                valueFormat={nfInt}
                            />
                        ) : (
                            <Text size="xs" c="dimmed" py="sm" ta="center">
                                No week data.
                            </Text>
                        )
                    }
                />
                <IncomeTile
                    title={`${todayVerb} / TODAY (UTC) · ${isoUtcToDdMmYyyy(paidDayIso)}`}
                    amount={dayTotal}
                    chart={
                        dayLen ? (
                            <D3BarChart
                                data={dayBars}
                                categoryKey="name"
                                valueKey="value"
                                height={CHART_H}
                                minWidth={120}
                                barColorToken={BAR_TOKEN}
                                gridColorToken={GRID_TOKEN}
                                labelColorToken={LABEL_TOKEN}
                                labelFontSize={labelFontSize}
                                showValueAxis={false}
                                barThicknessPx={5}
                                xTickIndices={dayLen > 1 ? [0, dayLen - 1] : [0]}
                                formatCategoryTick={(d, i) => {
                                    if (i === 0) return hourTickLabel(d);
                                    if (i === dayLen - 1) return hourTickLabel(d);
                                    return "";
                                }}
                                valueFormat={nfInt}
                            />
                        ) : (
                            <Text size="xs" c="dimmed" py="sm" ta="center">
                                No hourly breakdown yet today.
                            </Text>
                        )
                    }
                />
            </SimpleGrid>
        </Box>
    );
}

function IncomeTile({ title, amount, chart }) {
    return (
        <Box
            p="sm"
            style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: theme.radius.sm,
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
            }}
        >
            <Text size="xs" c="gray.2" style={{ fontSize: "0.47rem" }} tt="uppercase" fw={600} lh={1.35} lineClamp={3}>
                {title}
            </Text>
            <IncomeMoneyDisplay value={amount} />
            <Box mt="xs" style={{ borderRadius: theme.radius.sm, background: INSET_BG, overflow: "hidden" }}>
                {chart}
            </Box>
        </Box>
    );
}
