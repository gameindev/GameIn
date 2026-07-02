import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Flex, Loader, Stack, Text } from "@mantine/core";
import RatingCardSplitLayout from "../../dashboard/components/RatingCardSplitLayout";
import RatingScoreRing from "../../dashboard/components/RatingScoreRing";
import RatingEmptyCtaPanel from "../../dashboard/components/RatingEmptyCtaPanel";
import { getBrandCreatorRatingContext } from "../../../feedback/services/sponsorshipFeedback.service";

function RatingSplitFallback({ score = 0, statusText = "No ratings yet", children }) {
    return (
        <RatingCardSplitLayout>
            <Box className="rating-score-panel">
                <RatingScoreRing score={score} />
                <Text className="rating-status" mt="md" ta="center" c="dimmed">
                    {statusText}
                </Text>
            </Box>
            <Box className="rating-divider" aria-hidden="true" />
            {children}
        </RatingCardSplitLayout>
    );
}

export default function BrandCreatorRatingCard({ creatorUserId, creatorUsername }) {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const goLearnMore = () => {
        if (creatorUsername) {
            navigate(`/${creatorUsername}/offerings`);
            return;
        }
        navigate("/offerings");
    };

    useEffect(() => {
        if (!creatorUserId) return undefined;
        let cancelled = false;
        setLoading(true);
        setError(null);

        getBrandCreatorRatingContext(creatorUserId)
            .then((res) => {
                if (!cancelled) setData(res);
            })
            .catch((e) => {
                if (!cancelled) {
                    setError(
                        e?.response?.data?.message || e?.message || "Could not load rating info",
                    );
                    setData(null);
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [creatorUserId]);

    if (loading) {
        return (
            <Flex justify="center" align="center" mih={200}>
                <Loader color="primary" size="sm" />
            </Flex>
        );
    }

    if (error) {
        return (
            <RatingSplitFallback statusText="No ratings yet">
                <RatingEmptyCtaPanel onLearnMore={goLearnMore} />
            </RatingSplitFallback>
        );
    }

    const summary = data?.summary ?? {};
    const reviewCount = Number(summary.review_count) || 0;
    const overall = summary.overall_average != null ? Number(summary.overall_average) : 0;
    const pendingOrder = data?.pending_order;
    const brandReviewCount = Number(data?.brand_review_count) || 0;
    const hasDelivered = Boolean(data?.has_delivered_orders);

    const statusText =
        reviewCount > 0
            ? `${reviewCount} brand review${reviewCount !== 1 ? "s" : ""}`
            : "No ratings yet";

    const handleRate = () => {
        if (!pendingOrder?.id) return;
        navigate(`/feedback?orderId=${pendingOrder.id}`);
    };

    if (pendingOrder) {
        return (
            <RatingSplitFallback score={overall} statusText={statusText}>
                <Stack className="rating-cta-panel" gap="xs" justify="center">
                    <Text fw={700} size="sm" c="white" lh={1.35}>
                        Rate your experience
                    </Text>
                    <Text size="xs" c="dimmed" lh={1.55} maw={260}>
                        Share feedback on &ldquo;{pendingOrder.title}&rdquo; and help other brands
                        discover great creators.
                    </Text>
                    <Button
                        variant="default"
                        size="sm"
                        radius="md"
                        onClick={handleRate}
                        mt={4}
                        styles={{
                            root: {
                                width: "fit-content",
                                background: "rgba(0, 0, 0, 0.32)",
                                border: "1px solid rgba(255, 255, 255, 0.14)",
                                color: "white",
                                fontWeight: 500,
                                height: "2rem",
                                paddingInline: "1rem",
                            },
                        }}
                    >
                        Rate Creator
                    </Button>
                </Stack>
            </RatingSplitFallback>
        );
    }

    if (reviewCount === 0 || (!hasDelivered && brandReviewCount === 0)) {
        return (
            <RatingSplitFallback score={overall} statusText={statusText}>
                <RatingEmptyCtaPanel onLearnMore={goLearnMore} />
            </RatingSplitFallback>
        );
    }

    if (hasDelivered && brandReviewCount > 0) {
        return (
            <RatingSplitFallback score={overall} statusText={statusText}>
                <Stack className="rating-cta-panel" gap="xs" justify="center">
                    <Text fw={700} size="sm" c="white" lh={1.35}>
                        Thanks for your feedback
                    </Text>
                    <Text size="xs" c="dimmed" lh={1.55} maw={260}>
                        You&apos;ve rated @{creatorUsername || "this creator"} for your completed
                        sponsorships.
                    </Text>
                </Stack>
            </RatingSplitFallback>
        );
    }

    return (
        <RatingSplitFallback score={overall} statusText={statusText}>
            <RatingEmptyCtaPanel onLearnMore={goLearnMore} />
        </RatingSplitFallback>
    );
}
