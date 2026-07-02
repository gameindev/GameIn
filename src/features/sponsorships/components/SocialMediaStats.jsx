import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import {
    Box,
    Flex,
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
import styled from "styled-components";
import { formatCompactNumber } from "../../../shared/utils/helpers/formatCompactNumber.helper";

const COLOR_CONFIG = {
    TWITCH: "#5CE5B0",
    INSTAGRAM: "#61D3C4",
    X: "#69B3E7",
    YOUTUBE: "#4D8FD9",
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
    return formatCompactNumber(value);
}

// const DUMMY_ROWS = [
//   { id: "TWITCH", name: "Twitch", followers: 50, likes: 100, views: 200, color: "#5CE5B0" },
//   { id: "INSTAGRAM", name: "Instagram", followers: 80, likes: 120, views: 300, color: "#61D3C4" },
//   { id: "X", name: "X", followers: 30, likes: 50, views: 150, color: "#69B3E7" },
//   { id: "YOUTUBE", name: "YouTube", followers: 100, likes: 200, views: 400, color: "#69B3E7" },
//   { id: "TIKTOK", name: "TikTok", followers: 20, likes: 40, views: 100, color: "#8490F6" },
// ];


function buildRingSections(rows, statKey) {
    const contributors = rows.filter(
        (row) =>
            row.connected &&
            typeof row[statKey] === "number" &&
            Number.isFinite(row[statKey]) &&
            row[statKey] > 0,
    );

    const total = contributors.reduce((sum, row) => sum + row[statKey], 0);
    if (total <= 0) {
        return [];
    }

    const sections = contributors.map((row) => ({
        value: (row[statKey] / total) * 100,
        color: row.color,
    }));

    const sum = sections.reduce((acc, section) => acc + section.value, 0);
    if (sections.length > 0 && Math.abs(sum - 100) > 0.01) {
        sections[sections.length - 1].value += 100 - sum;
    }

    return sections;
}

function StatCircle({ rows, statKey, label, Icon, total, size = 100 }) {
    const sections = useMemo(() => buildRingSections(rows, statKey), [rows, statKey]);
    const ringThickness = Math.max(6, Math.round(size * 0.06));

    return (
        <Tooltip
            label={
                sections.length > 0
                    ? rows
                          .filter(
                              (row) =>
                                  row.connected &&
                                  typeof row[statKey] === "number" &&
                                  row[statKey] > 0,
                          )
                          .map((row) => `${row.name}: ${formatCompactNumber(row[statKey])}`)
                          .join(" · ")
                    : "No connected platform data"
            }
            multiline
            w={260}
            withArrow
            disabled={sections.length === 0}
        >
            <Box pos="relative" style={{ width: size, height: size, flexShrink: 0 }}>
                <RingProgress
                    size={size}
                    thickness={ringThickness}
                    roundCaps
                    rootColor="#2b2f36"
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
                        pointerEvents: "none",
                    }}
                >
                    <Text fw={700} fz={size <= 80 ? "sm" : "lg"} c="white">
                        {formatCompactNumber(total, { empty: "0" })}
                    </Text>
                    <Text fz={size <= 80 ? 9 : "xs"} c="" tt="uppercase">
                        {label}
                    </Text>
                    <Icon size={size <= 80 ? 12 : 14} color={theme.colors.primary[0]} />
                </Box>
            </Box>
        </Tooltip>
    );
}

export default function SocialMediaStats({ compact = false }) {
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
            if (data && connected) {
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
        fontSize: compact ? "0.68rem" : "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
    };

    const ringSize = compact ? 110 : 110;
    const platformIconSize = compact ? 24 : 26;
    const platformGlyphSize = compact ? 14 : 16;

    return (
        <SocialStatsShell
            data-compact={compact ? "true" : "false"}
            style={{
                borderRadius: theme.radius.md,
                padding: compact ? 0 : "1.25rem",
            }}
        >
            <Flex
                className="social-stats-layout"
                direction={{ base: "column", sm: "row" }}
                align={{ base: "center", sm: "stretch" }}
                gap={compact ? "md" : "lg"}
                wrap="nowrap"
            >
                <Flex
                    className="social-stats-kpis"
                    direction="column"
                    align="center"
                    justify="center"
                    gap={compact ? "xs" : "md"}
                    style={{ minHeight: compact ? 200 : 240, flexShrink: 0 }}
                >
                    <StatCircle
                        rows={rows}
                        total={totals.followers}
                        label={SUMMARY[0].label}
                        Icon={SUMMARY[0].Icon}
                        statKey="followers"
                        size={ringSize}
                    />
                    <Flex gap={compact ? "xs" : "md"} justify="center" wrap="wrap">
                        <StatCircle
                            rows={rows}
                            total={totals.likes}
                            label={SUMMARY[1].label}
                            Icon={SUMMARY[1].Icon}
                            statKey="likes"
                            size={ringSize}
                        />
                        <StatCircle
                            rows={rows}
                            total={totals.views}
                            label={SUMMARY[2].label}
                            Icon={SUMMARY[2].Icon}
                            statKey="views"
                            size={ringSize}
                        />
                    </Flex>
                </Flex>

                <Box className="social-stats-table-wrap">
                    <Table
                        className="social-stats-table"
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
                                            <Flex align="center" gap={compact ? "xs" : "sm"} style={{ cursor: row.viewsNote ? "help" : undefined }}>
                                                <Box
                                                    style={{
                                                        width: platformIconSize,
                                                        height: platformIconSize,
                                                        borderRadius: theme.radius.sm,
                                                        backgroundColor: theme.colors.inputBgColor[0],
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <row.Icon size={platformGlyphSize} color={row.color} />
                                                </Box>
                                                <Box style={{ minWidth: 0 }}>
                                                    <Text size="sm" fw={500} style={{ color: row.color }} lineClamp={compact ? 2 : 1}>
                                                        {row.name}
                                                    </Text>
                                                    {!row.connected && isSelf && (
                                                        <Text size="xs" c="dimmed" lineClamp={2}>
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
                                                {row.lifetimeLikes != null && typeof row.lifetimeLikes === "number" && !compact && (
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
                </Box>
            </Flex>
            {isSelf && loading && Object.keys(integrations).length === 0 && (
                <Center py="md">
                    <Loader size="sm" />
                    <Text size="sm" c="dimmed" ml="sm">
                        Loading integrations...
                    </Text>
                </Center>
            )}
        </SocialStatsShell>
    );
}

const SocialStatsShell = styled(Box)`
    width: 100%;
    min-width: 0;
    overflow: hidden;

    .social-stats-layout {
        width: 100%;
        min-width: 0;
    }

    .social-stats-kpis {
        min-width: 0;
    }

    .social-stats-table-wrap {
        flex: 1 1 0;
        min-width: 0;
        width: 100%;
        max-width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    .social-stats-table {
        width: 100%;
        table-layout: fixed;

        th,
        td {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0.4rem 0.35rem;
            font-size: 0.8rem;
            line-height: 1.3;
        }

        th:first-child,
        td:first-child {
            white-space: normal;
            width: 38%;
            padding-left: 0.25rem;
        }

        th:not(:first-child),
        td:not(:first-child) {
            width: 20.5%;
        }
    }

    &[data-compact="true"] {
        .social-stats-table-wrap {
            flex: 1 1 0;
            max-width: 100%;
        }

        .social-stats-table {
            font-size: 0.78rem;

            th,
            td {
                padding: 0.35rem 0.3rem;
            }

            th:first-child,
            td:first-child {
                width: 38%;
            }

            th:not(:first-child),
            td:not(:first-child) {
                width: 20.5%;
            }
        }
    }

    @media (max-width: 768px) {
        &[data-compact="false"] {
            padding: 0 !important;
        }

        .social-stats-layout {
            flex-direction: column;
        }

        .social-stats-table-wrap {
            flex: 1 1 auto;
        }
    }
`;
