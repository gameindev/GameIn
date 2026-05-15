import { Box, SimpleGrid, Stack, Text } from "@mantine/core";
import StatBox from "../../../shared/components/StatBox";
import IconButton from "../../../shared/components/IconButton";
import D3BarChart from "../../../shared/components/d3/D3BarChart";
import { theme } from "../../../shared/styles/theme/customTheme";

const chartGrid = "dark.4";

const money = (n) =>
    typeof n === "number" && Number.isFinite(n)
        ? new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
        }).format(n)
        : "—";

function chartShell(children) {
    return (
        <Box
            p="sm"
            style={{
                borderRadius: theme.radius.sm,
                background: "rgba(0,0,0,0.22)",
                minHeight: 200,
            }}
        >
            {children}
        </Box>
    );
}

/**
 * Owner-private sponsorship money charts (income today, 30-day revenue & orders).
 * Not rendered when viewing another user’s profile unless the viewer is an admin.
 */
export default function SponsorshipPrivateTracking({ tracking, loading, subjectIsBrand }) {
    if (loading || !tracking) {
        return (
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
                {[1, 2, 3].map((k) => (
                    <StatBox
                        key={k}
                        title={k === 1 ? (subjectIsBrand ? "Spend / today" : "Income / today") : "—"}
                        action={<IconButton hoverClass="hoverYellow" />}
                    >
                        <Text size="sm" c="dimmed">
                            {loading ? "Loading…" : "No tracking data."}
                        </Text>
                    </StatBox>
                ))}
            </SimpleGrid>
        );
    }

    const hourly = tracking.income_today?.hourly ?? [];
    const incomeHourlyData = hourly.map((h) => ({
        name: `${h.hour}h`,
        Income: h.amount,
    }));

    const series30 = tracking.series_30d ?? tracking.series_14d ?? [];
    const revenue30Data = series30.map((row) => ({
        name: row.date?.slice(5) ?? "—",
        Revenue: row.revenue,
    }));
    const orders30Data = series30.map((row) => ({
        name: row.date?.slice(5) ?? "—",
        Orders: row.paid_orders,
    }));

    const dateLabel = tracking.income_today?.date_utc ?? "";

    const marginRotated = { top: 10, right: 8, bottom: 56, left: 50 };

    return (
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
            <StatBox
                title={subjectIsBrand ? "Spend / today (UTC)" : "Income / today (UTC)"}
                action={<IconButton hoverClass="hoverYellow" />}
                style={{ minHeight: "100%" }}
            >
                <Stack gap="xs">

                    {chartShell(
                        incomeHourlyData.length ? (
                            <D3BarChart
                                data={incomeHourlyData}
                                categoryKey="name"
                                valueKey="Income"
                                height={200}
                                layout="vertical"
                                barColorToken="violet.5"
                                gridColorToken={chartGrid}
                                valueFormat={(v) => money(v)}
                                xTickEvery={4}
                                minWidth={200}
                                margin={{ top: 10, right: 8, bottom: 40, left: 36 }}
                            />
                      
                        ) : (
                            <Text size="sm" c="dimmed" py="md">
                                No paid invoices yet today.
                            </Text>
                        ),
                    )}

                    <SimpleGrid cols={2} spacing="xs" style={{ alignItems: "center" }}>
                        <Stack gap={0}>
                            <Text size="xs" c="dimmed">
                                {dateLabel}
                            </Text>
                            <Text fw={700} fz="xl" c="teal.4" style={{ justifySelf: "end" }}>
                                {money(tracking.income_today?.total)}
                            </Text>
                        </Stack>
                        {/* <Stack gap={0}>
                            <Text size="xs" c="dimmed">
                                {tracking.metric_definitions?.income_today}
                            </Text>
                        </Stack> */}

                    </SimpleGrid>

                </Stack>
            </StatBox>

            <StatBox
                title={subjectIsBrand ? "Spend · last 30 days (UTC)" : "Paid revenue · last 30 days (UTC)"}
                action={<IconButton hoverClass="hoverYellow" />}
                style={{ minHeight: "100%" }}
            >
                <Stack gap="xs">
                    {chartShell(
                        revenue30Data.some((d) => d.Revenue > 0) ? (
                            <D3BarChart
                                data={revenue30Data}
                                categoryKey="name"
                                valueKey="Revenue"
                                height={240}
                                layout="vertical"
                                barColorToken="grape.5"
                                gridColorToken={chartGrid}
                                valueFormat={(v) => money(v)}
                                margin={marginRotated}
                                xLabelRotate={-42}
                                xTickEvery={3}
                                minWidth={180}
                            />
                        ) : (
                            <Text size="sm" c="dimmed" py="md">
                                No paid invoices in this window yet.
                            </Text>
                        ),
                    )}
                    <Text size="xs" c="dimmed">
                        {tracking.metric_definitions?.series_30d}
                    </Text>
                </Stack>
            </StatBox>

            <StatBox title="Paid invoices · last 30 days (UTC)" action={<IconButton hoverClass="hoverYellow" />} style={{ minHeight: "100%" }}>
                <Stack gap="xs">
                    {chartShell(
                        orders30Data.some((d) => d.Orders > 0) ? (
                            <D3BarChart
                                data={orders30Data}
                                categoryKey="name"
                                valueKey="Orders"
                                height={240}
                                layout="vertical"
                                barColorToken="violet.4"
                                gridColorToken={chartGrid}
                                valueFormat={(v) => String(Math.round(Number(v) || 0))}
                                margin={marginRotated}
                                xLabelRotate={-42}
                                xTickEvery={3}
                                minWidth={180}
                            />
                        ) : (
                            <Text size="sm" c="dimmed" py="md">
                                No paid invoices in this window yet.
                            </Text>
                        ),
                    )}
                </Stack>
            </StatBox>
        </SimpleGrid>
    );
}
