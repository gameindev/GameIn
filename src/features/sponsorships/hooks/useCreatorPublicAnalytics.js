import { useEffect, useState } from "react";
import { analyticsService } from "../services/analytics.service";

/**
 * Public creator analytics: GameIn follower demographics, social trends, and engagement.
 * Supports scoped fetch via `forUserId` (e.g. brand viewing a creator profile).
 */
export default function useCreatorPublicAnalytics({ forUserId, enabled = true } = {}) {
    const [loading, setLoading] = useState(enabled);
    const [error, setError] = useState(null);
    const [demo, setDemo] = useState(null);
    const [trends, setTrends] = useState(null);
    const [engagement, setEngagement] = useState(null);

    const scopedParams =
        forUserId != null && Number.isFinite(Number(forUserId))
            ? { forUserId: Number(forUserId) }
            : {};

    useEffect(() => {
        if (!enabled) {
            setLoading(false);
            return undefined;
        }

        let cancelled = false;

        (async () => {
            setLoading(true);
            setError(null);
            try {
                const [demoData, trendsData, engagementData] = await Promise.all([
                    analyticsService.getGameinDemographics(scopedParams),
                    analyticsService.getSocialTrends(30, scopedParams),
                    analyticsService.getSocialEngagement(scopedParams),
                ]);
                if (!cancelled) {
                    setDemo(demoData);
                    setTrends(trendsData);
                    setEngagement(engagementData);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err?.message ?? "Failed to load analytics");
                    setDemo(null);
                    setTrends(null);
                    setEngagement(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [enabled, forUserId]);

    return { loading, error, demo, trends, engagement };
}
