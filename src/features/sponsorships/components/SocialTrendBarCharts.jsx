import { Box, SimpleGrid, Stack, Text } from "@mantine/core";
import StatBox from "../../../shared/components/StatBox";
import IconButton from "../../../shared/components/IconButton";
import D3BarChart from "../../../shared/components/d3/D3BarChart";
import { theme } from "../../../shared/styles/theme/customTheme";

const chartGrid = "dark.4";

const WEEKDAY_MON = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

/** Monday = 0 … Sunday = 6 from YYYY-MM-DD (UTC) */
function utcWeekdayMonFirst(dateStr) {
    const d = new Date(`${dateStr}T12:00:00.000Z`);
    const sun0 = d.getUTCDay();
    return (sun0 + 6) % 7;
}

function buildViewsByYear(series) {
    const sums = new Map();
    for (const row of series ?? []) {
        if (!row?.date) continue;
        const y = row.date.slice(0, 4);
        sums.set(y, (sums.get(y) ?? 0) + (Number(row.views) || 0));
    }
    const years = [...sums.keys()].sort();
    const lastTwo = years.slice(-2);
    return lastTwo.map((y) => ({ name: y, Views: sums.get(y) ?? 0 }));
}

function buildViewsByWeekday(series) {
    const sums = [0, 0, 0, 0, 0, 0, 0];
    for (const row of series ?? []) {
        if (!row?.date) continue;
        const i = utcWeekdayMonFirst(row.date);
        sums[i] += Number(row.views) || 0;
    }
    return WEEKDAY_MON.map((name, i) => ({ name, Views: sums[i] }));
}

function buildLast30Followers(series) {
    const sorted = [...(series ?? [])].sort((a, b) => String(a.date).localeCompare(String(b.date)));
    const slice = sorted.slice(-30);
    return slice.map((row) => ({
        name: String(row.date ?? "").slice(5),
        Followers: Number(row.followers) || 0,
    }));
}

function chartShell(children) {
    return (
        <Box
            p="sm"
            style={{
                borderRadius: theme.radius.sm,
                background: "rgba(0,0,0,0.18)",
                minHeight: 200,
            }}
        >
            {children}
        </Box>
    );
}

const marginFollowers = { top: 10, right: 8, bottom: 52, left: 52 };

/**
 * Social reach bar charts derived from daily snapshot series (same source as the line chart).
 */
export default function SocialTrendBarCharts({ series }) {
    const yearData = buildViewsByYear(series);
    const weekdayData = buildViewsByWeekday(series);
    const followers30 = buildLast30Followers(series);

    const hasSeries = Array.isArray(series) && series.length > 0;

    if (!hasSeries) {
        return null;
    }

    return (
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
            <StatBox title="Social · views by year (UTC)" action={<IconButton hoverClass="hoverYellow" />} style={{ minHeight: "100%" }}>
                <Stack gap="xs">
                    <Text size="xs" c="dimmed">
                        Totals from linked account snapshots in your history.
                    </Text>
                    {chartShell(
                        yearData.length ? (
                            <D3BarChart
                                data={yearData}
                                categoryKey="name"
                                valueKey="Views"
                                height={220}
                                layout="vertical"
                                barColorToken="violet.5"
                                gridColorToken={chartGrid}
                                valueFormat={(v) => Number(v).toLocaleString()}
                                minWidth={160}
                            />
                        ) : (
                            <Text size="sm" c="dimmed" py="md">
                                Not enough history to compare calendar years yet.
                            </Text>
                        ),
                    )}
                </Stack>
            </StatBox>

            <StatBox title="Social · followers (last 30 days)" action={<IconButton hoverClass="hoverYellow" />} style={{ minHeight: "100%" }}>
                <Stack gap="xs">
                    <Text size="xs" c="dimmed">
                        End-of-day follower totals summed across linked platforms.
                    </Text>
                    {chartShell(
                        followers30.length ? (
                            <D3BarChart
                                data={followers30}
                                categoryKey="name"
                                valueKey="Followers"
                                height={220}
                                layout="vertical"
                                barColorToken="violet.4"
                                gridColorToken={chartGrid}
                                valueFormat={(v) => Number(v).toLocaleString()}
                                margin={marginFollowers}
                                xLabelRotate={-38}
                                xTickEvery={Math.max(1, Math.floor(followers30.length / 8))}
                                minWidth={200}
                            />
                        ) : (
                            <Text size="sm" c="dimmed" py="md">
                                No follower history in range.
                            </Text>
                        ),
                    )}
                </Stack>
            </StatBox>

            <StatBox title="Social · views by weekday (UTC)" action={<IconButton hoverClass="hoverYellow" />} style={{ minHeight: "100%" }}>
                <Stack gap="xs">
                    <Text size="xs" c="dimmed">
                        Sums snapshot views grouped by weekday in UTC.
                    </Text>
                    {chartShell(
                        <D3BarChart
                            data={weekdayData}
                            categoryKey="name"
                            valueKey="Views"
                            height={220}
                            layout="vertical"
                            barColorToken="grape.5"
                            gridColorToken={chartGrid}
                            valueFormat={(v) => Number(v).toLocaleString()}
                            minWidth={200}
                        />,
                    )}
                </Stack>
            </StatBox>
        </SimpleGrid>
    );
}
