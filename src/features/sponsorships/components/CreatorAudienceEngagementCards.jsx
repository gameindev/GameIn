import { Grid } from "@mantine/core";
import AudienceDemographicsCard from "./AudienceDemographicsCard";
import EngagementOverviewCard from "./EngagementOverviewCard";
import useCreatorPublicAnalytics from "../hooks/useCreatorPublicAnalytics";
import { pickCreatorBuckets } from "../utils/analyticsBuckets.utils";

export default function CreatorAudienceEngagementCards({
    forUserId,
    subjectUsername,
    enabled = true,
    viewingOthersStats = false,
    onViewAllEngagement,
    /** When provided, skips internal fetch (e.g. Sponsorships page batch load). */
    demo: demoProp,
    trends: trendsProp,
    engagement: engagementProp,
    loading: loadingProp,
}) {
    const useInternalFetch =
        demoProp === undefined && trendsProp === undefined && engagementProp === undefined;

    const internal = useCreatorPublicAnalytics({
        forUserId,
        enabled: enabled && useInternalFetch,
    });

    if (!enabled) return null;

    const loading = useInternalFetch ? internal.loading : (loadingProp ?? false);
    const demo = useInternalFetch ? internal.demo : demoProp;
    const trends = useInternalFetch ? internal.trends : trendsProp;
    const engagement = useInternalFetch ? internal.engagement : engagementProp;

    const creatorDemoBuckets = demo
        ? pickCreatorBuckets(demo)
        : { age_buckets: [], gender: [], countries: [] };

    const demographicsTooltip =
        viewingOthersStats && subjectUsername
            ? `GameIn accounts following @${subjectUsername}, grouped by profile age, gender, and country.`
            : "GameIn accounts following you, grouped by profile age, gender, and country.";

    return (
        <>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <AudienceDemographicsCard
                    demo={demo}
                    loading={loading}
                    ageBuckets={creatorDemoBuckets.age_buckets}
                    genderBuckets={creatorDemoBuckets.gender}
                    countryBuckets={creatorDemoBuckets.countries}
                    tooltipText={demographicsTooltip}
                />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
                <EngagementOverviewCard
                    engagement={engagement}
                    trends={trends}
                    loading={loading}
                    onViewAllClick={onViewAllEngagement}
                    tooltipText={
                        viewingOthersStats && subjectUsername
                            ? `Engagement metrics from @${subjectUsername}'s sampled posts and social rollups over the last 30 UTC days.`
                            : undefined
                    }
                />
            </Grid.Col>
        </>
    );
}
