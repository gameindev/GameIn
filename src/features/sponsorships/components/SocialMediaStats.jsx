import { useEffect, useMemo } from "react";
import { Box, Flex, Grid, RingProgress, Table, Text, Loader, Center } from "@mantine/core";
import {
    IconBrandDiscord,
    IconBrandInstagram,
    IconBrandTiktok,
    IconBrandTwitch,
    IconBrandX,
    IconBrandYoutube,
    IconEye,
    IconHeart,
    IconUsers,
} from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { fetchAllStatuses, fetchPlatformStats } from "../../settings/integration/store/socialIntegrationSlice";
import { theme } from "../../../shared/styles/theme/customTheme";

const PLATFORM_CONFIG = [
    { id: "TWITCH", name: "TWITCH", Icon: IconBrandTwitch, color: "#5ce5b0" },
    { id: "INSTAGRAM", name: "INSTAGRAM", Icon: IconBrandInstagram, color: "#5ce5b0" },
    { id: "X", name: "X", Icon: IconBrandX, color: "#69B3E7" },
    { id: "YOUTUBE", name: "YOUTUBE", Icon: IconBrandYoutube, color: "#69B3E7" },
    { id: "TIKTOK", name: "TIK TOK", Icon: IconBrandTiktok, color: "#5ce5b0" },
    { id: "DISCORD", name: "DISCORD", Icon: IconBrandDiscord, color: "#5ce5b0" },
];

const IMPLEMENTED_PLATFORMS = new Set(["TWITCH", "X", "DISCORD"]);

const SUMMARY = [
    { key: "followers", label: "FOLLOWERS", Icon: IconUsers, gradient: ["#3b82f6", "#06b6d4"] },
    { key: "likes", label: "LIKES", Icon: IconHeart, gradient: ["#8b5cf6", "#22c55e"] },
    { key: "views", label: "VIEWS", Icon: IconEye, gradient: ["#3b82f6", "#06b6d4"] },
];

function formatStat(value) {
    if (value == null || value === "") return "—";
    const num = typeof value === "number" ? value : parseInt(value, 10);
    if (Number.isNaN(num)) return "—";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    return num.toLocaleString("de-DE");
}

function StatCircle({ value, label, Icon, gradient }) {
    return (
        <Box pos="relative" style={{ width: 100, height: 100 }}>
            <RingProgress
                size={100}
                thickness={6}
                roundCaps
                rootColor={theme.colors.secondaryGrey[0]}
                sections={[
                    { value: 25, color: gradient[0] },
                    { value: 25, color: gradient[0] },
                    { value: 25, color: gradient[1] },
                    { value: 25, color: gradient[1] },
                ]}
            />
            <Box
                pos="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text fw={700} fz="lg" c="white" lh={1.2}>
                    {formatStat(value)}
                </Text>
                <Text fz="xs" c="dimmed" tt="uppercase" mt={2}>
                    {label}
                </Text>
                <Box mt={2} c="dimmed">
                    <Icon size={14} />
                </Box>
            </Box>
        </Box>
    );
}

export default function SocialMediaStats() {
    const dispatch = useAppDispatch();
    const { integrations, stats, loading } = useAppSelector((state) => state.socialIntegration);

    useEffect(() => {
        dispatch(fetchAllStatuses());
    }, [dispatch]);

    useEffect(() => {
        PLATFORM_CONFIG.forEach(({ id }) => {
            if (!IMPLEMENTED_PLATFORMS.has(id)) return;
            const status = integrations[id];
            if (status?.state === "CONNECTED" && status?.integration_id && stats[id] == null) {
                dispatch(fetchPlatformStats({ platform: id, integrationId: status.integration_id }));
            }
        });
    }, [integrations, dispatch, stats]);

    const { totals, rows } = useMemo(() => {
        let totalFollowers = 0;
        let totalLikes = 0;
        let totalViews = 0;
        const rows = PLATFORM_CONFIG.map((platform) => {
            const status = integrations[platform.id];
            const data = stats[platform.id];
            const connected = status?.state === "CONNECTED";
            const loadingStats = connected && status?.integration_id && data == null;

            let followers = null;
            let likes = null;
            let views = null;
            let connectionsCount = null;

            if (data) {
                followers = data.followers ?? null;
                likes = data.likes ?? null;
                views = data.views ?? null;
                connectionsCount = data.connectionsCount ?? null;
                if (typeof followers === "number") totalFollowers += followers;
                if (typeof likes === "number") totalLikes += likes;
                if (typeof views === "number") totalViews += views;
            }

            return {
                ...platform,
                connected,
                loadingStats,
                followers,
                likes,
                views,
                connectionsCount,
            };
        });

        return {
            totals: { followers: totalFollowers, likes: totalLikes, views: totalViews },
            rows,
        };
    }, [integrations, stats]);

    const tableHeaderStyle = {
        color: theme.colors.text[0],
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    };

    return (
        <Box
            style={{
                background: "linear-gradient(90deg, #2d2a3e 0%, #2a3330 100%)",
                borderRadius: theme.radius.md,
                padding: "1.25rem",
                minHeight: 280,
            }}
        >
            <Grid gutter="lg" align="stretch">
                <Grid.Col span={{ base: 12, md: 5 }}>
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        gap="md"
                        style={{ minHeight: 240 }}
                    >
                        <StatCircle
                            value={totals.followers}
                            label={SUMMARY[0].label}
                            Icon={SUMMARY[0].Icon}
                            gradient={SUMMARY[0].gradient}
                        />
                        <Flex gap="md" justify="center" wrap="wrap">
                            <StatCircle
                                value={totals.likes}
                                label={SUMMARY[1].label}
                                Icon={SUMMARY[1].Icon}
                                gradient={SUMMARY[1].gradient}
                            />
                            <StatCircle
                                value={totals.views}
                                label={SUMMARY[2].label}
                                Icon={SUMMARY[2].Icon}
                                gradient={SUMMARY[2].gradient}
                            />
                        </Flex>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 7 }}>
                    <Table
                        withTableBorder={false}
                        withColumnBorders={false}
                        style={{
                            "--mantine-color-body": theme.colors.secondaryGrey[0],
                        }}
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th style={{ ...tableHeaderStyle }}>Platform</Table.Th>
                                <Table.Th style={{ ...tableHeaderStyle, textAlign: "right" }}>Followers</Table.Th>
                                <Table.Th style={{ ...tableHeaderStyle, textAlign: "right" }}>Likes</Table.Th>
                                <Table.Th style={{ ...tableHeaderStyle, textAlign: "right" }}>Views</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {rows.map((row) => (
                                <Table.Tr
                                    key={row.id}
                                    style={{
                                        backgroundColor: "rgba(0,0,0,0.15)",
                                    }}
                                >
                                    <Table.Td>
                                        <Flex align="center" gap="sm">
                                            <Box
                                                style={{
                                                    width: 28,
                                                    height: 28,
                                                    borderRadius: theme.radius.sm,
                                                    backgroundColor: theme.colors.inputBgColor[0],
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <row.Icon size={16} color={row.color} />
                                            </Box>
                                            <Text size="sm" fw={500} style={{ color: row.color }}>
                                                {row.name}
                                            </Text>
                                            {!row.connected && (
                                                <Text size="xs" c="dimmed" ml={4}>
                                                    (Connect in Settings)
                                                </Text>
                                            )}
                                        </Flex>
                                    </Table.Td>
                                    <Table.Td style={{ textAlign: "right", color: theme.colors.text[0] }}>
                                        {row.loadingStats ? (
                                            <Loader size="xs" />
                                        ) : (
                                            <>
                                                {formatStat(row.followers)}
                                                {row.id === "DISCORD" && row.connectionsCount != null && (
                                                    <Text size="xs" c="dimmed" display="block">
                                                        ({row.connectionsCount} connections)
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                    </Table.Td>
                                    <Table.Td style={{ textAlign: "right", color: theme.colors.text[0] }}>
                                        {row.loadingStats ? <Loader size="xs" /> : formatStat(row.likes)}
                                    </Table.Td>
                                    <Table.Td style={{ textAlign: "right", color: theme.colors.text[0] }}>
                                        {row.loadingStats ? <Loader size="xs" /> : formatStat(row.views)}
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Grid.Col>
            </Grid>
            {loading && Object.keys(integrations).length === 0 && (
                <Center py="md">
                    <Loader size="sm" />
                    <Text size="sm" c="dimmed" ml="sm">
                        Loading integrations...
                    </Text>
                </Center>
            )}
        </Box>
    );
}
