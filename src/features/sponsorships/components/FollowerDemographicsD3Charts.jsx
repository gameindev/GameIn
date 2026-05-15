import { Box, ColorSwatch, Group, SimpleGrid, Stack, Text, useMantineTheme } from "@mantine/core";
import D3BarChart from "../../../shared/components/d3/D3BarChart";
import D3DonutChart from "../../../shared/components/d3/D3DonutChart";
import { mantineShade } from "../../../shared/components/d3/mantineShade";

const GRID_TOKEN = "dark.4";
const LABEL_TOKEN = "gray.4";
const DONUT_STROKE_TOKEN = "dark.5";
const DONUT_CENTER_TEXT_TOKEN = "gray.3";

const GENDER_DONUT_COLORS = ["violet.5", "teal.5", "blue.5", "grape.5", "cyan.5", "pink.5"];

function bucketsToChartData(buckets) {
    return (buckets ?? []).map((b) => ({
        name: String(b.label ?? "—"),
        Count: Number(b.count) || 0,
    }));
}

/**
 * Follower bucket counts as D3 bars.
 * @param {'horizontal'|'vertical'} orientation — same convention as before: `"horizontal"` = vertical bars (age on X); `"vertical"` = horizontal bars (country / brands on Y).
 */
export function FollowerD3BarChart({ buckets, color = "teal.6", orientation = "horizontal" }) {
    const data = bucketsToChartData(buckets);
    if (data.length === 0) {
        return (
            <Text size="sm" c="dimmed">
                No data in this segment yet.
            </Text>
        );
    }

    const useD3HorizontalBars = orientation === "vertical";
    const barHeight = useD3HorizontalBars
        ? Math.min(440, Math.max(240, 32 + data.length * 40))
        : 260;
    const maxLabelLen = Math.max(...data.map((d) => String(d.name).length), 3);
    /** Space for country / category labels on the Y-axis (horizontal-bar layout only). */
    const categoryLabelGutter = Math.min(40, Math.max(100, Math.round(maxLabelLen * 7.2 + 32)));

    /** Same outer frame for both layouts; only `left` / `bottom` change with axis roles. */
    const marginFrame = { top: 12, right: 14 };
    const margin = useD3HorizontalBars
        ? {
              ...marginFrame,
              left: categoryLabelGutter,
              bottom: 40,
          }
        : {
              ...marginFrame,
              left: 50,
              bottom: data.length > 5 ? 56 : 42,
          };

    return (
        <Box
            w="100%"
            maw="100%"
            style={{
                marginLeft: -4,
                marginRight: -4,
                minWidth: 200,
            }}
        >
            <D3BarChart
                data={data}
                categoryKey="name"
                valueKey="Count"
                height={barHeight}
                layout={useD3HorizontalBars ? "horizontal" : "vertical"}
                barColorToken={color}
                gridColorToken={GRID_TOKEN}
                labelColorToken={LABEL_TOKEN}
                valueFormat={(v) => Number(v).toLocaleString()}
                margin={margin}
                xLabelRotate={!useD3HorizontalBars && data.length > 5 ? -38 : 0}
                xTickEvery={!useD3HorizontalBars && data.length > 10 ? 2 : 1}
            />
        </Box>
    );
}

/** Gender follower split — D3 donut + legend. */
export function FollowerD3GenderDonut({ buckets }) {
    const theme = useMantineTheme();
    const rows = (buckets ?? []).map((b) => ({
        name: String(b.label ?? "—"),
        value: Number(b.count) || 0,
    }));
    const total = rows.reduce((s, r) => s + r.value, 0);
    const data = rows
        .filter((r) => r.value > 0)
        .map((r, i) => ({
            name: r.name,
            value: r.value,
            color: GENDER_DONUT_COLORS[i % GENDER_DONUT_COLORS.length],
        }));

    if (data.length === 0) {
        return (
            <Text size="sm" c="dimmed">
                No data in this segment yet.
            </Text>
        );
    }

    const segments = data.map((d) => ({
        name: d.name,
        value: d.value,
        color: mantineShade(theme, d.color),
    }));

    return (
        <Stack gap="md" w="100%" maw="100%" align="stretch" style={{ minWidth: 200 }}>
            <D3DonutChart
                segments={segments}
                size={200}
                thickness={24}
                centerLabel={total.toLocaleString()}
                strokeColor={mantineShade(theme, DONUT_STROKE_TOKEN)}
                labelColor={mantineShade(theme, DONUT_CENTER_TEXT_TOKEN)}
            />
            <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="xs" verticalSpacing={6}>
                {data.map((d) => (
                    <Group key={d.name} gap={8} wrap="nowrap" justify="flex-start">
                        <ColorSwatch size={12} color={d.color} withShadow={false} />
                        <Text size="sm" c="gray.4" lineClamp={1} style={{ flex: 1, minWidth: 0 }}>
                            {d.name}
                        </Text>
                        <Text size="sm" c="gray.3" fw={600} style={{ flexShrink: 0 }}>
                            {d.value.toLocaleString()}
                        </Text>
                    </Group>
                ))}
            </SimpleGrid>
        </Stack>
    );
}
