import { Box, Flex, Loader, SimpleGrid, Stack, Text, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useMemo } from "react";
import D3DonutChart from "../../../shared/components/d3/D3DonutChart";
import CountryFlag from "../../../shared/components/CountryFlag";
import { theme } from "../../../shared/styles/theme/customTheme";
import { countriesMapper } from "../../settings/types/countries.mapper";
import DemographicsWorldMap from "./DemographicsWorldMap";

const PANEL_BG = "rgba(0,0,0,0.22)";
const DONUT_SIZE = 80;
const DONUT_THICKNESS = 10;
const EXCLUDE = new Set(["unknown", "not specified", "unspecified"]);

/** Mockup palette: green → blue → purple → yellow */
const CHART_COLORS = {
    green: theme.colors.primary[0],
    blue: theme.colors.skyblue[0],
    purple: theme.colors.secondary[0],
    yellow: theme.colors.yellow[0],
};

const AGE_COLOR = {
    "13-17": CHART_COLORS.blue,
    "18-24": CHART_COLORS.green,
    "25-34": CHART_COLORS.blue,
    "35-44": CHART_COLORS.purple,
    "45+": CHART_COLORS.yellow,
};

const AGE_ORDER = ["13-17", "18-24", "25-34", "35-44", "45+"];

const GENDER_COLOR = {
    Male: CHART_COLORS.green,
    Female: CHART_COLORS.purple,
    "Non-binary": CHART_COLORS.yellow,
};

const GENDER_ORDER = ["Male", "Female", "Non-binary"];

function formatLabel(label) {
    const raw = String(label ?? "—").trim();
    const lower = raw.toLowerCase();
    if (lower === "male") return "Male";
    if (lower === "female") return "Female";
    if (lower === "non-binary" || lower === "nonbinary") return "Non-binary";
    return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function resolveCountryCode(label) {
    if (!label) return null;
    const raw = String(label).trim();
    if (/^[A-Za-z]{2}$/.test(raw)) return raw.toUpperCase();
    const normalized = raw.toLowerCase();
    return countriesMapper.find((c) => c.name.toLowerCase() === normalized)?.code ?? null;
}

function displayCountryName(label, code) {
    if (code) {
        const hit = countriesMapper.find((c) => c.code === code);
        if (hit) return hit.name;
    }
    return formatLabel(label);
}

function buildBreakdown(buckets, colorMap, sortOrder) {
    const rows = (buckets ?? [])
        .filter((b) => !EXCLUDE.has(String(b.label).toLowerCase()))
        .map((b) => {
            const label = formatLabel(b.label);
            return { label, count: Number(b.count) || 0, color: colorMap[label] ?? CHART_COLORS.green };
        })
        .filter((r) => r.count > 0);

    const total = rows.reduce((s, r) => s + r.count, 0);
    if (!total) return { segments: [], legend: [] };

    const orderIdx = (label) => {
        const i = sortOrder.indexOf(label);
        return i === -1 ? sortOrder.length : i;
    };

    const sorted = [...rows].sort((a, b) => orderIdx(a.label) - orderIdx(b.label));

    return {
        segments: sorted.map((r) => ({ name: r.label, value: r.count, color: r.color })),
        legend: sorted.map((r) => ({
            label: r.label,
            pct: Math.round((r.count / total) * 100),
            color: r.color,
        })),
    };
}

function topCountries(buckets, limit = 5) {
    const rows = (buckets ?? [])
        .map((b) => {
            const label = String(b.label ?? "—");
            const code = resolveCountryCode(label);
            return {
                label,
                code,
                displayName: displayCountryName(label, code),
                count: Number(b.count) || 0,
            };
        })
        .filter((r) => r.count > 0);

    const total = rows.reduce((s, r) => s + r.count, 0);
    if (!total) return [];

    return rows
        .sort((a, b) => b.count - a.count)
        .slice(0, limit)
        .map((r) => ({ ...r, pct: Math.round((r.count / total) * 100) }));
}

const BREAKDOWN_BOX_STYLE = {
    borderRadius: theme.radius.sm,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.12)",
    padding: theme.spacing.md,
};

function BreakdownBlock({ title, breakdown }) {
    const { segments, legend } = breakdown;

    if (!segments.length) {
        return (
            <Box style={BREAKDOWN_BOX_STYLE}>
                <Text size="sm" c="gray.2" fw={500} mb="md">
                    {title}
                </Text>
                <Text size="sm" c="dimmed">
                    No data yet
                </Text>
            </Box>
        );
    }

    return (
        <Box style={BREAKDOWN_BOX_STYLE}>
            <Text size="sm" c="gray.2" fw={500} mb="md">
                {title}
            </Text>
            <Flex align="center" gap="10" wrap="nowrap">
                <Box w={DONUT_SIZE} h={DONUT_SIZE} style={{ flexShrink: 0 }}>
                    <D3DonutChart
                        segments={segments}
                        size={DONUT_SIZE}
                        thickness={DONUT_THICKNESS}
                        centerLabel=""
                        strokeColor={PANEL_BG}
                        strokeWidth={2}
                        minWidth={DONUT_SIZE}
                        padAngle={segments.length > 1 ? 0.02 : 0}
                    />
                </Box>
                <Stack gap={10} style={{ flex: 1, minWidth: "fit-content", maxWidth: 200 }}>
                    {legend.map((item) => (
                        <Flex key={item.label} align="center" justify="space-between" gap="md">
                            <Flex align="center" gap={8} miw={0}>
                                <Box
                                    w={8}
                                    h={8}
                                    style={{ borderRadius: "50%", background: item.color, flexShrink: 0 }}
                                />
                                <Text size="10" c="gray.4" lineClamp={1}>
                                    {item.label}
                                </Text>
                            </Flex>
                            <Text
                                size="10"
                                c="gray.2"
                                fw={500}
                                ta="right"
                                style={{ flexShrink: 0, fontFeatureSettings: '"tnum"', minWidth: 36 }}
                            >
                                {item.pct}%
                            </Text>
                        </Flex>
                    ))}
                </Stack>
            </Flex>
        </Box>
    );
}

export default function AudienceDemographicsCard({
    demo,
    loading,
    ageBuckets = [],
    genderBuckets = [],
    countryBuckets = [],
    tooltipText = "GameIn follower demographics from connected profiles (age, gender, and country).",
}) {
    const ageBreakdown = useMemo(
        () => buildBreakdown(ageBuckets, AGE_COLOR, AGE_ORDER),
        [ageBuckets],
    );
    const genderBreakdown = useMemo(
        () => buildBreakdown(genderBuckets, GENDER_COLOR, GENDER_ORDER),
        [genderBuckets],
    );
    const countries = useMemo(() => topCountries(countryBuckets), [countryBuckets]);
    const isSelfScope = demo?.scope === "self";

    return (
        <Box
            p="md"
            style={{
                background: theme.colors.secondaryGrey[0],
                borderRadius: theme.radius.md,
                border: "1px solid rgba(255,255,255,0.06)",
            }}
        >
            <Flex align="center" gap={6} mb="md">
                <Text fw={600} c="white" size="sm">
                    Audience Demographics
                </Text>
                <Tooltip label={tooltipText} multiline w={280}>
                    <Flex component="span" align="center" style={{ lineHeight: 0, cursor: "help" }}>
                        <IconInfoCircle size={14} color={theme.colors.text[0]} style={{ opacity: 0.55 }} />
                    </Flex>
                </Tooltip>
            </Flex>

            {loading ? (
                <Flex justify="center" py={48}>
                    <Loader color="primary" size="sm" />
                </Flex>
            ) : isSelfScope ? (
                <Box p="lg" style={{ borderRadius: theme.radius.sm, background: PANEL_BG }}>
                    <Text size="sm" c="dimmed">
                        Follower breakdown appears once other GameIn accounts follow you.
                    </Text>
                </Box>
            ) : (
                <Box p="0" style={{ borderRadius: theme.radius.sm, background: "none" }}>
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="10" mb="md">
                        <BreakdownBlock title="Age Breakdown" breakdown={ageBreakdown} />
                        <BreakdownBlock title="Gender Breakdown" breakdown={genderBreakdown} />
                    </SimpleGrid>



                    <Box w="100%"
                        style={{
                            alignSelf: "flex-start",
                            borderRadius: theme.radius.sm,
                            border: "1px solid rgba(255,255,255,0.08)",
                            background: "rgba(0,0,0,0.12)",
                            padding: theme.spacing.md,
                        }}>
                        <Text size="sm" c="gray.2" fw={500} mb="20">
                            Top Countries
                        </Text>
                        <Flex gap="xl" align="flex-start" direction={{ base: "column", sm: "row" }}>
                            <Stack gap={14} style={{ flex: 1, minWidth: 0 }}>
                                {countries.length ? (
                                    countries.map((c) => (
                                        <Flex
                                            key={c.code ?? c.label}
                                            align="center"
                                            justify="space-between"
                                            gap="md"
                                        >
                                            <Flex align="center" gap={10} miw={0}>
                                                {c.code ? (
                                                    <CountryFlag countryCode={c.code} size={20} />
                                                ) : (
                                                    <Box w={20} h={14} bg="dark.5" style={{ borderRadius: 2 }} />
                                                )}
                                                <Text size="sm" c="gray.2" lineClamp={1}>
                                                    {c.displayName}
                                                </Text>
                                            </Flex>
                                            <Text
                                                size="sm"
                                                c="gray.2"
                                                fw={500}
                                                style={{ flexShrink: 0, fontFeatureSettings: '"tnum"' }}
                                            >
                                                {c.pct}%
                                            </Text>
                                        </Flex>
                                    ))
                                ) : (
                                    <Text size="sm" c="dimmed">
                                        No country data yet
                                    </Text>
                                )}
                            </Stack>

                            {countries.length > 0 ? (
                                <Box style={{ flex: 1, minWidth: 0 }}>
                                    <DemographicsWorldMap countries={countries} />
                                </Box>
                            ) : null}
                        </Flex>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
