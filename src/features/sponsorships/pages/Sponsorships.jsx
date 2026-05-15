import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import {
    Alert,
    Grid,
    Loader,
    SimpleGrid,
    Stack,
    Text,
    Title,
    Group,
    Badge,
} from "@mantine/core";
import StatBox from "../../../shared/components/StatBox";
import D3LineChart from "../../../shared/components/d3/D3LineChart";
import IconButton from "../../../shared/components/IconButton";
import SponsorshipsOffers from "../components/SponsorshipsOffers";
import OngoingSponsorships from "../components/OngoingSponsorships";
import SocialMediaStats from "../components/SocialMediaStats";
import SponsorshipPrivateTracking from "../components/SponsorshipPrivateTracking";
import SocialTrendBarCharts from "../components/SocialTrendBarCharts";
import { FollowerD3BarChart, FollowerD3GenderDonut } from "../components/FollowerDemographicsD3Charts";
import { useAppSelector } from "../../../app/store/hooks";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { analyticsService } from "../services/analytics.service";
import { theme } from "../../../shared/styles/theme/customTheme";

/**
 * Explains follower-based chart data (GameIn `user_follow` → subject as following_id).
 */
function followerDemographicsCaption(section, viewingOthersStats, subjectUsername) {
    const who =
        viewingOthersStats && subjectUsername
            ? `@${subjectUsername}`
            : viewingOthersStats
              ? "this user"
              : "you";
    const followPhrase = who === "you" ? "Accounts following you" : `Accounts following ${who}`;

    switch (section) {
        case "age":
            return `${followPhrase}, grouped by age (from their GameIn profile).`;
        case "country":
            return `${followPhrase}, by country on their GameIn profile.`;
        case "gender":
            return `${followPhrase}, by gender (creator accounts with a gender on their profile).`;
        case "brands":
            return `Brand accounts that follow ${who === "you" ? "you" : who}, by each brand’s country on GameIn.`;
        default:
            return "";
    }
}

function selfDemoCaption(isBrandSubject, isCreatorSubject) {
    if (isBrandSubject) return "Your brand profile (GameIn first-party)";
    if (isCreatorSubject) return "Your creator profile (GameIn first-party)";
    return "Your GameIn profile (first-party)";
}

/** Normalize API bucket arrays (snake_case from Nest; tolerate camelCase). */
function pickCreatorBuckets(demo) {
    const c = demo?.creators;
    if (!c || typeof c !== "object") return { age_buckets: [], gender: [], countries: [] };
    return {
        age_buckets: c.age_buckets ?? c.ageBuckets ?? [],
        gender: c.gender ?? c.Gender ?? [],
        countries: c.countries ?? c.Countries ?? [],
    };
}

function pickBrandBuckets(demo) {
    const b = demo?.brands;
    if (!b || typeof b !== "object") return { countries: [] };
    return {
        countries: b.countries ?? b.Countries ?? [],
    };
}

/** StatBox uses dark grey; D3 line chart grid token. */
const demoChartGrid = "dark.4";

const SOCIAL_TREND_LINE_SERIES = [
    { key: "Followers", colorToken: "teal.5" },
    { key: "Views", colorToken: "blue.5" },
    { key: "Likes", colorToken: "violet.5" },
];

const analyticsGridCol = {
    span: { base: 12, md: 4 },
    style: { display: "flex", alignItems: "stretch" },
};

const statBoxStretch = { flex: 1, width: "100%", minHeight: "100%" };

function formatUsd(n) {
    if (n == null || Number.isNaN(Number(n))) return "—";
    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(Number(n));
}

export default function Sponsorships() {
    const [analyticsLoading, setAnalyticsLoading] = useState(true);
    const [analyticsError, setAnalyticsError] = useState(null);
    const [demo, setDemo] = useState(null);
    const [trends, setTrends] = useState(null);
    const [engagement, setEngagement] = useState(null);
    const [sponsor, setSponsor] = useState(null);
    const [privateTracking, setPrivateTracking] = useState(null);

    const sessionProfile = useAppSelector((s) => s.user?.profile);
    const outlet = useOutletContext() ?? {};
    /** Profile page owner (from /:username/stats or own account when self) */
    const subjectProfile = outlet?.userProfile ?? sessionProfile;
    const viewingOthersStats = outlet?.isSelf === false;

    const viewerType = sessionProfile?.user_type?.toUpperCase() ?? "";
    const viewerIsBrand = viewerType === USERTYPES.BRAND;
    const viewerIsCreator = viewerType === USERTYPES.CREATOR;
    const viewerIsAdmin = viewerType === USERTYPES.ADMIN;

    const subjectType = subjectProfile?.user_type?.toUpperCase() ?? "";
    const isBrandSubject = subjectType === USERTYPES.BRAND;
    const isCreatorSubject = subjectType === USERTYPES.CREATOR;

    /** Revenue, ROI, and invoice-based charts: owner-only (admins may view a subject they support). */
    const showPrivateMoney =
        (isCreatorSubject || isBrandSubject) && (!viewingOthersStats || viewerIsAdmin);

    const analyticsSubjectId =
        viewingOthersStats && subjectProfile?.id != null ? Number(subjectProfile.id) : undefined;

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setAnalyticsLoading(true);
            setAnalyticsError(null);
            try {
                const demographicsParams =
                    analyticsSubjectId != null && Number.isFinite(analyticsSubjectId)
                        ? { forUserId: analyticsSubjectId }
                        : {};

                const scopedParams =
                    analyticsSubjectId != null && Number.isFinite(analyticsSubjectId)
                        ? { forUserId: analyticsSubjectId }
                        : {};

                const calls = [
                    analyticsService.getGameinDemographics(demographicsParams),
                    analyticsService.getSocialTrends(30, scopedParams),
                    analyticsService.getSocialEngagement(scopedParams),
                ];
                if (showPrivateMoney) {
                    calls.push(
                        analyticsService.getSponsorshipsSummary(365, scopedParams),
                        analyticsService.getSponsorshipPrivateTracking(scopedParams),
                    );
                }

                const results = await Promise.all(calls);
                if (!cancelled) {
                    let i = 0;
                    setDemo(results[i++]);
                    setTrends(results[i++]);
                    setEngagement(results[i++]);
                    if (showPrivateMoney) {
                        setSponsor(results[i++]);
                        setPrivateTracking(results[i++]);
                    } else {
                        setSponsor(null);
                        setPrivateTracking(null);
                    }
                }
            } catch (err) {
                if (!cancelled) {
                    setAnalyticsError(err?.message ?? "Failed to load analytics");
                    setSponsor(null);
                    setPrivateTracking(null);
                }
            } finally {
                if (!cancelled) setAnalyticsLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [analyticsSubjectId, viewingOthersStats, subjectProfile?.id, showPrivateMoney]);

    const chartData = (trends?.series ?? []).map((row) => ({
        date: row.date,
        Followers: row.followers,
        Views: row.views,
        Likes: row.likes,
    }));

    const totals = engagement?.totals ?? {};
    const rates = engagement?.rates ?? {};

    const subjectUsername = subjectProfile?.username;
    const creatorDemoBuckets = demo ? pickCreatorBuckets(demo) : { age_buckets: [], gender: [], countries: [] };
    const brandDemoBuckets = demo ? pickBrandBuckets(demo) : { countries: [] };

    const demoSectionOrder = isBrandSubject
        ? ["brands", "age", "country", "gender"]
        : ["age", "country", "gender", "brands"];

    const socialTrendsTitle =
        viewingOthersStats && isCreatorSubject
            ? "Social trends · this creator (30 days)"
            : viewingOthersStats && isBrandSubject
              ? "Social trends · this brand (30 days)"
              : isBrandSubject
                ? "Social trends · brand presence (30 days)"
                : isCreatorSubject
                  ? "Social trends · your channels (30 days)"
                  : "Social trends (30 days)";

    const socialTrendsBlurb =
        viewingOthersStats && isCreatorSubject
            ? "Rollups from social accounts linked to this creator."
            : viewingOthersStats && isBrandSubject
              ? "Rollups from social accounts linked to this brand."
              : isBrandSubject
                ? "Rollups from social accounts linked to your brand."
                : isCreatorSubject
                  ? "Rollups from social accounts linked to your creator profile."
                  : "Rollups from linked social accounts.";

    const engagementTitle =
        viewingOthersStats && isCreatorSubject
            ? "Engagement · this creator's sampled posts"
            : viewingOthersStats && isBrandSubject
              ? "Engagement · this brand's tracked posts"
              : isBrandSubject
                ? "Engagement · tracked posts"
                : isCreatorSubject
                  ? "Engagement · your sampled posts"
                  : "Engagement (sampled posts)";

    const engagementBlurb =
        viewingOthersStats && isCreatorSubject
            ? "Sampled content from this creator's connected platforms."
            : viewingOthersStats && isBrandSubject
              ? "Sampled content from platforms linked to this brand."
              : isBrandSubject
                ? "Sampled content from platforms linked to your brand account."
                : isCreatorSubject
                  ? "Sampled content from your connected creator platforms."
                  : "Sampled post engagement across linked platforms.";

    return (
        <Grid gutter={20}>
            <Grid.Col span={{ base: 12 }} style={{ minHeight: "auto" }}>
                <StatBox title={"Ongoing Sponsorships"} accordion defaultOpen={true}>
                    <OngoingSponsorships />
                </StatBox>
            </Grid.Col>

            <Grid.Col span={{ base: 12 }} style={{ minHeight: "auto" }}>
                <StatBox title={"Offers"} accordion defaultOpen={true}>
                    <SponsorshipsOffers />
                </StatBox>
            </Grid.Col>

            {/* <Grid.Col span={{ base: 12 }} style={{ minHeight: "auto" }} h="auto">
                <Title order={3} c={theme.colors.white[0]} mb="xs">
                    Analytics
                </Title>
                <Text size="sm" c="dimmed" mb="sm">
                    {viewingOthersStats && isCreatorSubject
                        ? "You are viewing this creator's stats — follower charts reflect GameIn users who follow this account."
                        : viewingOthersStats && isBrandSubject
                          ? "You are viewing this brand's stats — follower charts reflect GameIn users who follow this account."
                          : viewerIsBrand && !viewingOthersStats
                            ? "Demographics charts count GameIn followers (age, country, gender, and brand accounts that follow you)."
                            : viewerIsCreator
                              ? "Demographics charts count GameIn followers of your creator profile."
                              : "GameIn analytics overview."}
                </Text>
            </Grid.Col> */}

            {/* <Grid.Col span={{ base: 12 }}>
                <StatBox
                    title="Social Media Stats"
                    action={<IconButton hoverClass="hoverYellow" />}
                    background={
                        "transparent linear-gradient(45deg, #9d7fef3b 0%, #5ce5b03b 100%) 0% 0% no-repeat"
                    }
                >
                    <SocialMediaStats />
                </StatBox>
            </Grid.Col> */}

            {showPrivateMoney && (
                <Grid.Col span={{ base: 12 }}>
                    <Title order={4} c={theme.colors.white[0]} mb={4}>
                        Tracking / sponsorship
                    </Title>
                    <Text size="sm" c="dimmed" mb="md">
                        Private: payments, invoice timing, and revenue summaries are shown only on your own account
                        (or to an admin assisting you), not to visitors viewing your public profile.
                    </Text>
                    <SponsorshipPrivateTracking
                        tracking={privateTracking}
                        loading={analyticsLoading}
                        subjectIsBrand={isBrandSubject}
                    />
                </Grid.Col>
            )}

            

            {analyticsLoading && (
                <Grid.Col span={{ base: 12 }}>
                    <Group justify="center" p="md">
                        <Loader />
                    </Group>
                </Grid.Col>
            )}

            {!analyticsLoading && analyticsError && (
                <Grid.Col span={{ base: 12 }}>
                    <Alert color="red" title="Analytics">
                        {analyticsError}
                    </Alert>
                </Grid.Col>
            )}

            {!analyticsLoading && !analyticsError && (
                <>
                    {demoSectionOrder.map((section) => {
                        if (section === "age") {
                            return (
                                <Grid.Col key="age" {...analyticsGridCol}>
                                    <StatBox
                                        title="Age · followers"
                                        style={statBoxStretch}
                                    >
                                        {demo?.scope === "self" ? (
                                            <Stack gap="sm">
                                                <Text size="sm" c="dimmed">
                                                    {selfDemoCaption(isBrandSubject, isCreatorSubject)}
                                                </Text>
                                                <Group gap="xs">
                                                    <Badge variant="light">
                                                        Age band: {demo.age_bucket ?? "—"}
                                                    </Badge>
                                                    {demo.language && (
                                                        <Badge variant="light">Language: {demo.language}</Badge>
                                                    )}
                                                    <Badge variant="outline">{demo.user_type ?? "—"}</Badge>
                                                </Group>
                                            </Stack>
                                        ) : (
                                            <Stack gap="sm">
                                                <Text size="sm" c="dimmed">
                                                    {followerDemographicsCaption(
                                                        "age",
                                                        viewingOthersStats,
                                                        subjectUsername,
                                                    )}
                                                    {demo?.totals?.followers != null
                                                        ? ` · ${demo.totals.followers.toLocaleString()} followers on GameIn`
                                                        : demo?.totals?.users != null
                                                          ? ` · ${demo.totals.users.toLocaleString()} users (platform view)`
                                                          : ""}
                                                </Text>
                                                <FollowerD3BarChart
                                                    buckets={creatorDemoBuckets.age_buckets}
                                                    color="teal.6"
                                                    orientation="horizontal"
                                                />
                                            </Stack>
                                        )}
                                    </StatBox>
                                </Grid.Col>
                            );
                        }
                        if (section === "country") {
                            return (
                                <Grid.Col key="country" {...analyticsGridCol}>
                                    <StatBox
                                        title="Country · followers"
                                        style={statBoxStretch}
                                    >
                                        {demo?.scope === "self" ? (
                                            <Stack gap="xs">
                                                <Text size="sm" c="dimmed">
                                                    {selfDemoCaption(isBrandSubject, isCreatorSubject)}
                                                </Text>
                                                <Badge variant="light">Country: {demo.country ?? "—"}</Badge>
                                            </Stack>
                                        ) : (
                                            <Stack gap="sm">
                                                <Text size="sm" c="dimmed">
                                                    {followerDemographicsCaption(
                                                        "country",
                                                        viewingOthersStats,
                                                        subjectUsername,
                                                    )}
                                                </Text>
                                                <FollowerD3BarChart
                                                    buckets={creatorDemoBuckets.countries}
                                                    color="blue.5"
                                                    orientation="vertical"
                                                />
                                            </Stack>
                                        )}
                                    </StatBox>
                                </Grid.Col>
                            );
                        }
                        if (section === "gender") {
                            return (
                                <Grid.Col key="gender" {...analyticsGridCol}>
                                    <StatBox
                                        title="Gender · followers"
                                        style={statBoxStretch}
                                    >
                                        {demo?.scope === "self" ? (
                                            <Stack gap="xs">
                                                <Text size="sm" c="dimmed">
                                                    {selfDemoCaption(isBrandSubject, isCreatorSubject)}
                                                </Text>
                                                <Badge variant="light">Gender: {demo.gender ?? "—"}</Badge>
                                            </Stack>
                                        ) : (
                                            <Stack gap="sm">
                                                <Text size="sm" c="dimmed">
                                                    {followerDemographicsCaption(
                                                        "gender",
                                                        viewingOthersStats,
                                                        subjectUsername,
                                                    )}
                                                </Text>
                                                <FollowerD3GenderDonut buckets={creatorDemoBuckets.gender} />
                                            </Stack>
                                        )}
                                    </StatBox>
                                </Grid.Col>
                            );
                        }
                        if (section === "brands") {
                            return (
                                <Grid.Col key="brands" {...analyticsGridCol}>
                                    <StatBox
                                        title="Brands · follower countries"
                                        style={statBoxStretch}
                                    >
                                        {demo?.scope === "self" ? (
                                            <Text size="sm" c="dimmed">
                                                {isBrandSubject
                                                    ? "Open full analytics as a creator, brand, or admin to see charts. This summary shows your brand profile fields only."
                                                    : "Open full analytics as a creator, brand, or admin to see follower charts. Brand rows list brand accounts that follow this profile on GameIn."}
                                            </Text>
                                        ) : (
                                            <Stack gap="md">
                                                <Text size="sm" c="dimmed">
                                                    {followerDemographicsCaption(
                                                        "brands",
                                                        viewingOthersStats,
                                                        subjectUsername,
                                                    )}
                                                </Text>
                                                <Stack gap="xs">
                                                    <Text fw={600} size="sm">
                                                        Country
                                                    </Text>
                                                    <FollowerD3BarChart
                                                        buckets={brandDemoBuckets.countries}
                                                        color="green.5"
                                                        orientation="vertical"
                                                    />
                                                </Stack>
                                            </Stack>
                                        )}
                                    </StatBox>
                                </Grid.Col>
                            );
                        }
                        return null;
                    })}

                    <Grid.Col
                        span={{ base: 12, md: 8 }}
                        style={{ display: "flex", alignItems: "stretch" }}
                    >
                        <StatBox title={socialTrendsTitle} style={statBoxStretch}>
                            <Text size="xs" c="dimmed" mb="xs">
                                {socialTrendsBlurb}
                            </Text>
                            {chartData.length === 0 ? (
                                <Text size="sm" c="dimmed">
                                    No snapshot history yet. Connect social accounts and wait for sync / daily
                                    snapshots.
                                </Text>
                            ) : (
                                <D3LineChart
                                    data={chartData}
                                    height={280}
                                    minWidth={260}
                                    series={SOCIAL_TREND_LINE_SERIES}
                                    gridColorToken={demoChartGrid}
                                    labelColorToken="gray.4"
                                />
                            )}
                        </StatBox>
                    </Grid.Col>

                    {chartData.length > 0 && (
                        <Grid.Col span={{ base: 12 }}>
                            <Title order={4} c={theme.colors.white[0]} mb="xs">
                                Social reach · bar view
                            </Title>
                            <Text size="sm" c="dimmed" mb="sm">
                                Same snapshot data as the line chart above, shown as purple bar widgets to match the
                                client dashboard layout (desktop: three across).
                            </Text>
                            <SocialTrendBarCharts series={trends?.series} />
                        </Grid.Col>
                    )}

                    <Grid.Col
                        span={{ base: 12, md: 4 }}
                        style={{ display: "flex", alignItems: "flex-start" }}
                    >
                        <StatBox title={engagementTitle} noFlexFill style={{ width: "100%" }}>
                            <Text size="xs" c="dimmed" mb="sm">
                                {engagementBlurb}
                            </Text>

                            <Stack gap={4}>
                                <SimpleGrid cols={2} spacing={4} verticalSpacing={12}>
                                    <Stack gap="xs">
                                        <Text size="xs" c="dimmed" lh={1.25}>
                                            Total engagement
                                        </Text>
                                        <Text fw={700} size="xs" lh={1.25}>
                                            {totals.engagement_total?.toLocaleString?.() ?? totals.engagement_total}
                                        </Text>
                                    </Stack>
                                    <Stack gap="xs">
                                        <Text size="xs" c="dimmed" lh={1.25}>
                                            ER / followers
                                        </Text>
                                        <Text fw={700} size="xs" lh={1.25}>
                                            {rates.engagement_rate_followers != null
                                                ? `${(rates.engagement_rate_followers * 100).toFixed(2)}%`
                                                : "—"}
                                        </Text>
                                    </Stack>
                                    <Stack gap="xs">
                                        <Text size="xs" c="dimmed" lh={1.25}>
                                            ER / views
                                        </Text>
                                        <Text fw={700} size="xs" lh={1.25}>
                                            {rates.engagement_rate_views != null
                                                ? `${(rates.engagement_rate_views * 100).toFixed(2)}%`
                                                : "—"}
                                        </Text>
                                    </Stack>
                                    <Stack gap="xs">
                                        <Text size="xs" c="dimmed" lh={1.25}>
                                            Likes
                                        </Text>
                                        <Text fw={700} size="xs" lh={1.25}>
                                            {totals.likes?.toLocaleString?.() ?? totals.likes}
                                        </Text>
                                    </Stack>
                                    <Stack gap="xs">
                                        <Text size="xs" c="dimmed" lh={1.25}>
                                            Comments
                                        </Text>
                                        <Text fw={700} size="xs" lh={1.25}>
                                            {totals.comments?.toLocaleString?.() ?? totals.comments}
                                        </Text>
                                    </Stack>
                                    <Stack gap="xs">
                                        <Text size="xs" c="dimmed" lh={1.25}>
                                            Retweets
                                        </Text>
                                        <Text fw={700} size="xs" lh={1.25}>
                                            {totals.retweets?.toLocaleString?.() ?? totals.retweets}
                                        </Text>
                                    </Stack>
                                </SimpleGrid>
                           
                                {engagement?.metric_definitions?.engagement_total ? (
                                    <Text size="xs" c="dimmed" lh={1.35} mt={2}>
                                        {engagement.metric_definitions.engagement_total}
                                    </Text>
                                ) : null}
                            </Stack>
                        </StatBox>
                    </Grid.Col>

                    {showPrivateMoney && (
                        <>
                            <Grid.Col {...analyticsGridCol}>
                                <StatBox
                                    title={
                                        viewingOthersStats
                                            ? isBrandSubject
                                                ? "Paid orders"
                                                : "Paid sponsorships"
                                            : viewerIsBrand
                                              ? "Paid orders · spend"
                                              : "Paid sponsorships"
                                    }
                                    style={statBoxStretch}
                                >
                                    <Text size="xs" c="dimmed" mb={4}>
                                        {viewingOthersStats
                                            ? isBrandSubject
                                                ? "Paid invoices in selected window"
                                                : "Deals paid in period"
                                            : viewerIsBrand
                                              ? "Orders you placed (selected window)"
                                              : "Deals paid in period"}
                                    </Text>
                                    <Text fw={700} fz="xl">
                                        {sponsor?.paid_orders ?? "—"}
                                    </Text>
                                </StatBox>
                            </Grid.Col>

                            <Grid.Col {...analyticsGridCol}>
                                <StatBox
                                    title={
                                        viewingOthersStats
                                            ? isBrandSubject
                                                ? "Invoice total"
                                                : "Earnings"
                                            : viewerIsBrand
                                              ? "Spend · revenue out"
                                              : "Earnings"
                                    }
                                    style={statBoxStretch}
                                >
                                    <Text size="xs" c="dimmed" mb={4}>
                                        {viewingOthersStats
                                            ? isBrandSubject
                                                ? "Paid invoice total (this brand)"
                                                : "Paid to this creator (invoice total)"
                                            : viewerIsBrand
                                              ? "Paid invoice total (your spend)"
                                              : "Paid to you (invoice total)"}
                                    </Text>
                                    <Text fw={700} fz="xl">
                                        {formatUsd(sponsor?.total_revenue)}
                                    </Text>
                                </StatBox>
                            </Grid.Col>

                            <Grid.Col {...analyticsGridCol}>
                                <StatBox
                                    title={
                                        viewingOthersStats
                                            ? isBrandSubject
                                                ? "ROI proxy · revenue / views"
                                                : "Efficiency · earnings / views"
                                            : viewerIsBrand
                                              ? "ROI proxy · spend / views"
                                              : "Efficiency · earnings / views"
                                    }
                                    style={statBoxStretch}
                                >
                                    <Text size="xs" c="dimmed" mb={4}>
                                        {viewingOthersStats
                                            ? isBrandSubject
                                                ? "Invoice total divided by estimated social views"
                                                : "Earnings divided by estimated social views"
                                            : viewerIsBrand
                                              ? "Spend divided by estimated social views"
                                              : "Earnings divided by estimated social views"}
                                    </Text>
                                    <Text fw={700} fz="xl">
                                        {sponsor?.roi_proxy_revenue_per_view != null
                                            ? sponsor.roi_proxy_revenue_per_view.toFixed(4)
                                            : "—"}
                                    </Text>
                                    <Text size="xs" c="dimmed" mt="sm">
                                        {sponsor?.metric_definitions?.roi_proxy}
                                    </Text>
                                </StatBox>
                            </Grid.Col>
                        </>
                    )}
                </>
            )}
            
        </Grid>
    );
}
