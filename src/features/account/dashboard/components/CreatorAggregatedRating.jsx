import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Flex, Loader, Stack, Text } from "@mantine/core";
import RatingWidget from "./RatingWidget";
import CreatorRatingEmptyState from "./CreatorRatingEmptyState";
import RatingCardSplitLayout from "./RatingCardSplitLayout";
import RatingEmptyCtaPanel from "./RatingEmptyCtaPanel";
import { getCreatorRatingSummary } from "../../../feedback/services/sponsorshipFeedback.service";
import { theme } from "../../../../shared/styles/theme/customTheme";

/** Same keys as backend `SPONSORSHIP_FEEDBACK_CRITERIA` / brand feedback form */
const CRITERIA_ORDER = [
    "Communication",
    "Sponsorship Fulfillment",
    "Reliability",
    "Audience Impact",
    "Brand Fit / Content Quality",
    "Professionalism / Attitude",
];

const SHORT_LABELS = {
    Communication: "COMM",
    "Sponsorship Fulfillment": "SPONSOR",
    Reliability: "REL",
    "Audience Impact": "AUDIENCE",
    "Brand Fit / Content Quality": "FIT",
    "Professionalism / Attitude": "PRO",
};

function ProfileRatingWithData({ data, ratings, activeIndex, onLearnMore }) {
    const reviewLine = `${data.review_count} brand review${data.review_count !== 1 ? "s" : ""} · overall ${
        data.overall_average != null ? data.overall_average.toFixed(1) : "—"
    }/5`;

    return (
        <RatingCardSplitLayout>
            <Box className="rating-score-panel rating-score-panel--chart">
                <Text size="xs" c={theme.colors.white[0]} ta="center" mb={8} opacity={0.9}>
                    {reviewLine}
                </Text>
                <RatingWidget ratings={ratings} activeIndex={activeIndex} compact />
            </Box>

            <Box className="rating-divider" aria-hidden="true" />

            <Stack className="rating-cta-panel" gap="xs" justify="center">
                <Text fw={700} size="sm" c={theme.colors.white[0]} lh={1.35}>
                    Your sponsorship reputation
                </Text>
                <Text size="xs" c="dimmed" lh={1.55} maw={260}>
                    Brands rate you after completed sponsorships. Strong ratings help you win more
                    deals.
                </Text>
                {onLearnMore ? (
                    <Button
                        variant="default"
                        size="sm"
                        radius="md"
                        onClick={onLearnMore}
                        mt={4}
                        styles={{
                            root: {
                                width: "fit-content",
                                background: "rgba(0, 0, 0, 0.32)",
                                border: "1px solid rgba(255, 255, 255, 0.14)",
                                color: theme.colors.white[0],
                                fontWeight: 500,
                                height: "2rem",
                                paddingInline: "1rem",
                                "&:hover": {
                                    background: "rgba(255, 255, 255, 0.06)",
                                },
                            },
                        }}
                    >
                        Learn More
                    </Button>
                ) : null}
            </Stack>
        </RatingCardSplitLayout>
    );
}

/**
 * Loads aggregated sponsorship ratings from all brands for the logged-in creator.
 */
export default function CreatorAggregatedRating({ onLearnMore, variant = "default", compact = false }) {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const isProfile = variant === "profile";
    const handleLearnMore = onLearnMore ?? (() => navigate("/stats"));

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await getCreatorRatingSummary();
                if (!cancelled) setData(res);
            } catch (e) {
                if (!cancelled) {
                    setError(
                        e?.response?.data?.message ||
                            e?.message ||
                            "Could not load ratings",
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const ratings = useMemo(() => {
        if (!data?.by_criterion) return null;
        return CRITERIA_ORDER.map((key) => ({
            key,
            label: SHORT_LABELS[key] || key.toUpperCase().slice(0, 8),
            value: data.by_criterion[key] ?? 0,
        }));
    }, [data]);

    if (loading) {
        return (
            <Flex justify="center" align="center" mih={200}>
                <Loader color="primary" size="sm" />
            </Flex>
        );
    }

    if (error) {
        return (
            <CreatorRatingEmptyState
                onLearnMore={handleLearnMore}
                statusText="Ratings unavailable right now"
            />
        );
    }

    if (!data?.review_count || !ratings) {
        return <CreatorRatingEmptyState onLearnMore={handleLearnMore} />;
    }

    const activeIndex = Math.min(
        CRITERIA_ORDER.length - 1,
        Math.max(0, data.review_count - 1),
    );

    if (isProfile) {
        return (
            <ProfileRatingWithData
                data={data}
                ratings={ratings}
                activeIndex={activeIndex}
                onLearnMore={handleLearnMore}
            />
        );
    }

    return (
        <>
            <Text size="xs" c="dimmed" ta="center" mb={6}>
                {data.review_count} brand review{data.review_count !== 1 ? "s" : ""} · overall{" "}
                {data.overall_average != null ? data.overall_average.toFixed(1) : "—"}/5
            </Text>
            <RatingWidget ratings={ratings} activeIndex={activeIndex} compact={compact} />
        </>
    );
}
