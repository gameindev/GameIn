import { Box, ColorSwatch, Flex, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import D3BarChart from "../../../shared/components/d3/D3BarChart";
import D3DonutChart from "../../../shared/components/d3/D3DonutChart";
import { mantineShade } from "../../../shared/components/d3/mantineShade";

const GRID_TOKEN = "dark.4";
const LABEL_TOKEN = "gray.4";
const DONUT_STROKE_TOKEN = "dark.5";
const DONUT_COLORS = ["teal.5", "blue.5", "violet.5", "yellow.5", "cyan.5"];
const EXCLUDE = new Set(["unknown", "not specified", "unspecified"]);

function bucketsToChartData(buckets) {
    return (buckets ?? []).map((b) => ({
        name: String(b.label ?? "—"),
        Count: Number(b.count) || 0,
    }));
}

function formatLabel(label) {
    const raw = String(label ?? "—").trim();
    const lower = raw.toLowerCase();
    if (lower === "male") return "Male";
    if (lower === "female") return "Female";
    if (lower === "non-binary" || lower === "nonbinary") return "Non-binary";
    return raw.charAt(0).toUpperCase() + raw.slice(1);
}

/**
 * Donut (left) + percent legend (right) — used by Audience demographics card.
 */
export function FollowerD3PctDonut({ buckets, size = 100, thickness = 12 }) {
    const theme = useMantineTheme();
    const rows = (buckets ?? [])
        .filter((b) => !EXCLUDE.has(String(b.label).toLowerCase()))
        .map((b) => ({ name: formatLabel(b.label), value: Number(b.count) || 0 }))
        .filter((r) => r.value > 0);

    const total = rows.reduce((s, r) => s + r.value, 0);
    if (!total) {
        return (
            <Text size="sm" c="dimmed">
                No data yet
            </Text>
        );
    }

    const items = rows.map((r, i) => ({
        ...r,
        pct: Math.round((r.value / total) * 100),
        colorToken: DONUT_COLORS[i % DONUT_COLORS.length],
    }));

    const segments = items.map((d) => ({
        name: d.name,
        value: d.value,
        color: mantineShade(theme, d.colorToken),
    }));

    return (
        <Flex align="center" gap="md" wrap="nowrap">
            <Box w={size} style={{ flexShrink: 0 }}>
                <D3DonutChart
                    segments={segments}
                    size={size}
                    thickness={thickness}
                    centerLabel=""
                    strokeColor={mantineShade(theme, DONUT_STROKE_TOKEN)}
                    strokeWidth={2}
                    minWidth={size}
                    padAngle={items.length > 1 ? 0.02 : 0}
                />
            </Box>
            <Stack gap={8} style={{ flex: 1, minWidth: 0 }}>
                {items.map((d) => (
                    <Flex key={d.name} align="center" justify="space-between" gap={8}>
                        <Group gap={8} wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
                            <ColorSwatch size={10} color={d.colorToken} withShadow={false} />
                            <Text size="sm" c="gray.3" lineClamp={1}>
                                {d.name}
                            </Text>
                        </Group>
                        <Text size="sm" fw={600} c="white" style={{ flexShrink: 0, fontFeatureSettings: '"tnum"' }}>
                            {d.pct}%
                        </Text>
                    </Flex>
                ))}
            </Stack>
        </Flex>
    );
}

/**
 * Follower bucket counts as D3 bars.
 * @param {'horizontal'|'vertical'} orientation — `"horizontal"` = vertical bars (age on X); `"vertical"` = horizontal bars (country / brands on Y).
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
    const categoryLabelGutter = Math.min(40, Math.max(100, Math.round(maxLabelLen * 7.2 + 32)));

    const marginFrame = { top: 12, right: 14 };
    const margin = useD3HorizontalBars
        ? { ...marginFrame, left: categoryLabelGutter, bottom: 40 }
        : { ...marginFrame, left: 50, bottom: data.length > 5 ? 56 : 42 };

    return (
        <Box w="100%" maw="100%" style={{ marginLeft: -4, marginRight: -4, minWidth: 200 }}>
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
            color: DONUT_COLORS[i % DONUT_COLORS.length],
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
                labelColor={mantineShade(theme, "gray.3")}
            />
            <Group gap="xs" wrap="wrap">
                {data.map((d) => (
                    <Group key={d.name} gap={8} wrap="nowrap">
                        <ColorSwatch size={12} color={d.color} withShadow={false} />
                        <Text size="sm" c="gray.4" lineClamp={1}>
                            {d.name}
                        </Text>
                        <Text size="sm" c="gray.3" fw={600}>
                            {d.value.toLocaleString()}
                        </Text>
                    </Group>
                ))}
            </Group>
        </Stack>
    );
}
