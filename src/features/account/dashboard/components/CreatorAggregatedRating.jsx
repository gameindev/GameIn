import { useEffect, useState, useMemo } from "react";
import { Text } from "@mantine/core";
import RatingWidget from "./RatingWidget";
import { getCreatorRatingSummary } from "../../../feedback/services/sponsorshipFeedback.service";

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

/**
 * Loads aggregated sponsorship ratings from all brands for the logged-in creator.
 */
export default function CreatorAggregatedRating() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
                            "Could not load ratings"
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
            <Text size="sm" c="dimmed" ta="center">
                Loading ratings…
            </Text>
        );
    }

    if (error) {
        return (
            <Text size="sm" c="red" ta="center">
                {error}
            </Text>
        );
    }

    if (!data?.review_count || !ratings) {
        return (
            <Text size="sm" c="dimmed" ta="center" px="xs">
                No brand ratings yet. Your average will appear here after brands leave
                feedback on delivered sponsorships.
            </Text>
        );
    }

    const activeIndex = Math.min(
        CRITERIA_ORDER.length - 1,
        Math.max(0, data.review_count - 1)
    );

    return (
        <>
            <Text size="xs" c="dimmed" ta="center" mb={6}>
                {data.review_count} brand review{data.review_count !== 1 ? "s" : ""} · overall{" "}
                {data.overall_average != null ? data.overall_average.toFixed(1) : "—"}/5
            </Text>
            <RatingWidget ratings={ratings} activeIndex={activeIndex} />
        </>
    );
}
