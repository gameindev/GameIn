import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import {
    Box,
    Flex,
    Grid,
    RingProgress,
    Table,
    Text,
    Loader,
    Center,
    Tooltip,
} from "@mantine/core";
import {
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
import {
    fetchAllStatuses,
    fetchPlatformStats,
} from "../../settings/integration/store/socialIntegrationSlice";
import { socialIntegrationService } from "../../settings/integration/services/social-integration.service";
import { theme } from "../../../shared/styles/theme/customTheme";

const COLOR_CONFIG = {
    TWITCH: "#5CE5B0",
    INSTAGRAM: "#61D3C4",
    X: "#69B3E7",
    YOUTUBE: "#69B3E7",
    TIKTOK: "#8490F6",
};

const PLATFORM_CONFIG = [
    { id: "TWITCH", name: "TWITCH", Icon: IconBrandTwitch },
    { id: "INSTAGRAM", name: "INSTAGRAM", Icon: IconBrandInstagram },
    { id: "X", name: "X", Icon: IconBrandX },
    { id: "YOUTUBE", name: "YOUTUBE", Icon: IconBrandYoutube },
    { id: "TIKTOK", name: "TIK TOK", Icon: IconBrandTiktok },
].map((platform) => ({
    ...platform,
    color: COLOR_CONFIG[platform.id],
}));

const IMPLEMENTED_PLATFORMS = new Set([
    "TWITCH",
    "X",
    "YOUTUBE",
    "TIKTOK",
    "INSTAGRAM",
]);

const SUMMARY = [
    {
        key: "followers",
        label: "FOLLOWERS",
        Icon: IconUsers,
        gradient: [`${theme.colors.primary[0]}`],
    },
    {
        key: "likes",
        label: "LIKES",
        Icon: IconHeart,
        gradient: ["#8b5cf6", "#22c55e"],
    },
    {
        key: "views",
        label: "VIEWS",
        Icon: IconEye,
        gradient: ["#3b82f6", "#06b6d4"],
    },
];

function formatStat(value) {
    if (value == null || value === "") return "—";
    const num = typeof value === "number" ? value : parseInt(value, 10);
    if (Number.isNaN(num)) return "—";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    return num.toLocaleString("de-DE");
}

// const DUMMY_ROWS = [
//   { id: "TWITCH", name: "Twitch", followers: 50, likes: 100, views: 200, color: "#5CE5B0" },
//   { id: "INSTAGRAM", name: "Instagram", followers: 80, likes: 120, views: 300, color: "#61D3C4" },
//   { id: "X", name: "X", followers: 30, likes: 50, views: 150, color: "#69B3E7" },
//   { id: "YOUTUBE", name: "YouTube", followers: 100, likes: 200, views: 400, color: "#69B3E7" },
//   { id: "TIKTOK", name: "TikTok", followers: 20, likes: 40, views: 100, color: "#8490F6" },
// ];


function StatCircle({ rows, statKey, label, Icon }) {
    const total = rows.reduce((sum, r) => sum + (r[statKey] || 0), 0);
    const sections = rows
        .filter((r) => r[statKey] > 0)
        .map((r) => ({
            value: total > 0 ? (r[statKey] / total) * 100 : 0,
            color: r.color,
        }));

  return (
    <Box pos="relative" style={{ width: 100, height: 100 }}>
      <RingProgress
        size={100}
        thickness={6}
        roundCaps
        rootColor="#333"
        sections={sections}
      />
      <Box
        pos="absolute"
        inset={0}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text fw={700} fz="lg" c="white">
          {total.toLocaleString()}
        </Text>
        <Text fz="xs" c="dimmed" tt="uppercase">
          {label}
        </Text>
        <Icon size={14} />
      </Box>
    </Box>
  );
}

export default function SocialMediaStats() {
    const dispatch = useAppDispatch();
    const outlet = useOutletContext() || {};
    const userProfile = outlet?.userProfile;
    const isSelf = outlet?.isSelf ?? true;
    const { integrations, stats, statsErrors, loading } = useAppSelector(
        (state) => state.socialIntegration,
    );
    const [publicStats, setPublicStats] = useState({});
    const [publicStatsLoading, setPublicStatsLoading] = useState(false);

    useEffect(() => {
        if (!isSelf) return;
        dispatch(fetchAllStatuses());
    }, [dispatch, isSelf]);

    useEffect(() => {
        if (!isSelf) return;
        PLATFORM_CONFIG.forEach(({ id }) => {
            if (!IMPLEMENTED_PLATFORMS.has(id)) return;
            const status = integrations[id];
            if (
                status?.state === "CONNECTED" &&
                status?.integration_id &&
                stats[id] == null
            ) {
                dispatch(
                    fetchPlatformStats({
                        platform: id,
                        integrationId: status.integration_id,
                    }),
                );
            }
        });
    }, [integrations, dispatch, stats, isSelf]);

    useEffect(() => {
        if (isSelf) return;
        if (!userProfile?.id) {
            setPublicStats({});
            return;
        }
        let cancelled = false;
        setPublicStatsLoading(true);
        socialIntegrationService
            .fetchPublicStats(userProfile.id)
            .then((data) => {
                if (!cancelled) setPublicStats(data || {});
            })
            .catch(() => {
                if (!cancelled) setPublicStats({});
            })
            .finally(() => {
                if (!cancelled) setPublicStatsLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [isSelf, userProfile?.id]);

    useEffect(() => {
        const snapshot = PLATFORM_CONFIG.map(({ id }) => ({
            platform: id,
            state: isSelf ? integrations?.[id]?.state ?? null : "PUBLIC_VIEW",
            integrationId: isSelf ? integrations?.[id]?.integration_id ?? null : null,
            stats: isSelf ? stats?.[id] ?? null : publicStats?.[id] ?? null,
            statsError: statsErrors?.[id] ?? null,
        }));
        // Debug visibility for why rows are showing "—" in UI.
        console.log("[SocialMediaStats] platform snapshot", snapshot);
    }, [integrations, stats, statsErrors, isSelf, publicStats]);

    const { totals, rows } = useMemo(() => {
        let totalFollowers = 0;
        let totalLikes = 0;
        let totalViews = 0;
        const rows = PLATFORM_CONFIG.map((platform) => {
            const status = integrations[platform.id];
            const data = isSelf ? stats[platform.id] : publicStats[platform.id];
            const statsError = statsErrors?.[platform.id] ?? null;
            const connected = isSelf ? status?.state === "CONNECTED" : data != null;
            const loadingStats = isSelf
                ? connected && status?.integration_id && data == null
                : publicStatsLoading && data == null;

            let followers = null;
            let likes = null;
            let views = null;
            let peakLikes = null;
            let peakViews = null;
            let lifetimeLikes = null;
            let viewsNote = null;
            if (data) {
                followers = data.followers ?? null;
                likes = data.likes ?? null;
                views = data.views ?? null;
                peakLikes = data.highestLikes ?? data.highest_likes ?? null;
                peakViews = data.highestViews ?? data.highest_views ?? null;
                lifetimeLikes = data.lifetimeLikes ?? data.lifetime_likes ?? null;
                viewsNote = data.viewsDefinition ?? data.views_definition ?? null;
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
                peakLikes,
                peakViews,
                lifetimeLikes,
                viewsNote,
                statsError,
            };
        });

        return {
            totals: {
                followers: totalFollowers,
                likes: totalLikes,
                views: totalViews,
            },
            rows,
        };
    }, [integrations, stats, statsErrors, isSelf, publicStats, publicStatsLoading]);

    const tableHeaderStyle = {
        color: theme.colors.text[0],
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    };

    return (
        <Box
            style={{
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
                            rows={rows}
                            label={SUMMARY[0].label}
                            Icon={SUMMARY[0].Icon}
                            statKey="followers"
                        />
                        <Flex gap="md" justify="center" wrap="wrap">
                            <StatCircle
                                rows={rows}
                                label={SUMMARY[1].label}
                                Icon={SUMMARY[1].Icon}
                                statKey="likes"
                            />
                            <StatCircle
                                rows={rows}
                                label={SUMMARY[2].label}
                                Icon={SUMMARY[2].Icon}
                                statKey="views"
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
                                <Table.Th style={{ ...tableHeaderStyle, textAlign: "right" }}>
                                    Followers
                                </Table.Th>
                                <Table.Th style={{ ...tableHeaderStyle, textAlign: "right" }}>
                                    Likes
                                </Table.Th>
                                <Table.Th style={{ ...tableHeaderStyle, textAlign: "right" }}>
                                    Views
                                </Table.Th>
                                {/* <Table.Th style={{ ...tableHeaderStyle, textAlign: "right" }}>
                                    Peak ♥
                                </Table.Th>
                                <Table.Th style={{ ...tableHeaderStyle, textAlign: "right" }}>
                                    Peak views
                                </Table.Th> */}
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
                                        <Tooltip
                                            label={row.viewsNote || "—"}
                                            disabled={!row.viewsNote}
                                            multiline
                                            w={280}
                                            withArrow
                                        >
                                            <Flex align="center" gap="sm" style={{ cursor: row.viewsNote ? "help" : undefined }}>
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
                                                <Box>
                                                    <Text size="sm" fw={500} style={{ color: row.color }}>
                                                        {row.name}
                                                    </Text>
                                                    {!row.connected && isSelf && (
                                                        <Text size="xs" c="dimmed">
                                                            (Connect in Settings)
                                                        </Text>
                                                    )}
                                                    {row.statsError && (
                                                        <Text size="xs" c="red">
                                                            Stats error: {row.statsError}
                                                        </Text>
                                                    )}
                                                </Box>
                                            </Flex>
                                        </Tooltip>
                                    </Table.Td>
                                    <Table.Td
                                        style={{ textAlign: "right", color: theme.colors.text[0] }}
                                    >
                                        {row.loadingStats ? (
                                            <Loader size="xs" />
                                        ) : (
                                            <>
                                                {formatStat(row.followers)}
                                            </>
                                        )}
                                    </Table.Td>
                                    <Table.Td
                                        style={{ textAlign: "right", color: theme.colors.text[0] }}
                                    >
                                        {row.loadingStats ? (
                                            <Loader size="xs" />
                                        ) : (
                                            <Box>
                                                <Text inherit ta="right">
                                                    {formatStat(row.likes)}
                                                </Text>
                                                {row.lifetimeLikes != null && typeof row.lifetimeLikes === "number" && (
                                                    <Text size="xs" c="dimmed" ta="right">
                                                        Lifetime {formatStat(row.lifetimeLikes)}
                                                    </Text>
                                                )}
                                            </Box>
                                        )}
                                    </Table.Td>
                                    <Table.Td
                                        style={{ textAlign: "right", color: theme.colors.text[0] }}
                                    >
                                        {row.loadingStats ? (
                                            <Loader size="xs" />
                                        ) : (
                                            formatStat(row.views)
                                        )}
                                    </Table.Td>
                                    {/* <Table.Td style={{ textAlign: "right", color: theme.colors.text[0] }}>
                                        {row.loadingStats ? <Loader size="xs" /> : formatStat(row.peakLikes)}
                                    </Table.Td>
                                    <Table.Td style={{ textAlign: "right", color: theme.colors.text[0] }}>
                                        {row.loadingStats ? <Loader size="xs" /> : formatStat(row.peakViews)}
                                    </Table.Td> */}
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Grid.Col>
            </Grid>
            {isSelf && loading && Object.keys(integrations).length === 0 && (
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
