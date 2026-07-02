import { useCallback, useEffect, useState } from "react";
import { analyticsService } from "../../../sponsorships/services/analytics.service";
import walletService from "../services/wallet.service";

/**
 * Loads sponsorship invoice analytics + wallet ledger analytics for dashboards.
 * Wallet data is only fetched for the signed-in user (never for forUserId subjects).
 */
export default function usePaymentAnalytics({
    forUserId,
    includeWallet = true,
    walletDays = 30,
    trackingDays = 60,
    enabled = true,
} = {}) {
    const scopedParams =
        forUserId != null && Number.isFinite(Number(forUserId)) ? { forUserId: Number(forUserId) } : {};

    const showWallet = includeWallet && forUserId == null;

    const [loading, setLoading] = useState(enabled);
    const [error, setError] = useState(null);
    const [summary30, setSummary30] = useState(null);
    const [tracking, setTracking] = useState(null);
    const [trends, setTrends] = useState(null);
    const [walletAnalytics, setWalletAnalytics] = useState(null);

    const refresh = useCallback(async () => {
        if (!enabled) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const calls = [
                analyticsService.getSponsorshipsSummary(30, scopedParams),
                analyticsService.getSponsorshipPrivateTracking({ ...scopedParams, days: trackingDays }),
                analyticsService.getSocialTrends(trackingDays, scopedParams),
            ];

            if (showWallet) {
                calls.push(walletService.getAnalytics(walletDays));
            }

            const results = await Promise.all(calls);
            setSummary30(results[0]);
            setTracking(results[1]);
            setTrends(results[2]);
            setWalletAnalytics(showWallet ? results[3] : null);
        } catch (err) {
            setError(err?.message ?? "Failed to load payment analytics");
            setSummary30(null);
            setTracking(null);
            setTrends(null);
            setWalletAnalytics(null);
        } finally {
            setLoading(false);
        }
    }, [enabled, forUserId, showWallet, trackingDays, walletDays]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return {
        loading,
        error,
        summary30,
        tracking,
        trends,
        walletAnalytics,
        showWallet,
        refresh,
    };
}
