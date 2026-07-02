import {
    formatCompactCurrency,
    formatCompactNumber,
} from "../../../../shared/utils/helpers/formatCompactNumber.helper";

export function formatUsd(n) {
    return formatCompactCurrency(n);
}

export function formatCount(n) {
    return formatCompactNumber(n);
}

export function formatPct(n, digits = 2) {
    if (n == null || !Number.isFinite(Number(n))) return "—";
    return `${Number(n).toFixed(digits)}%`;
}

export function split30DayWindows(rows) {
    const n = rows.length;
    const current = rows.slice(Math.max(0, n - 30));
    const previous = rows.slice(Math.max(0, n - 60), Math.max(0, n - 30));
    return { current, previous };
}

export function sumField(rows, field) {
    return (rows ?? []).reduce((s, r) => s + (Number(r[field]) || 0), 0);
}

export function pctTrend(current, previous) {
    if (!previous || previous === 0) {
        return { text: current > 0 ? "↑ 100.0% vs last 30 days" : "— vs last 30 days", up: current >= 0 };
    }
    const pct = ((current - previous) / previous) * 100;
    const up = pct >= 0;
    return {
        text: `${up ? "↑" : "↓"} ${Math.abs(pct).toFixed(1)}% vs last 30 days`,
        up,
    };
}

export function ppTrend(current, previous) {
    const diff = (Number(current) || 0) - (Number(previous) || 0);
    const up = diff >= 0;
    return {
        text: `${up ? "↑" : "↓"} ${Math.abs(diff).toFixed(1)}pp vs last 30 days`,
        up,
    };
}

export function windowErPercent(rows) {
    if (!rows?.length) return 0;
    const first = rows[0];
    const last = rows[rows.length - 1];
    const avgFollowers = ((Number(last.followers) || 0) + (Number(first.followers) || 0)) / 2;
    if (avgFollowers <= 0) return 0;
    const likesDelta = Math.max(0, (Number(last.likes) || 0) - (Number(first.likes) || 0));
    return (likesDelta / avgFollowers) * 100;
}

/**
 * Build KPI card configs for Stats page (SponsorshipAnalyticsKpis).
 */
export function buildSponsorshipKpiCards({
    subjectIsBrand,
    showWallet,
    walletAnalytics,
    tracking60,
    trends60,
    engagement,
    summary30,
    icons,
}) {
    const daily = tracking60?.series_daily ?? tracking60?.series_30d ?? [];
    const { current: moneyCur, previous: moneyPrev } = split30DayWindows(daily);
    const revenueCur = sumField(moneyCur, "revenue");
    const revenuePrev = sumField(moneyPrev, "revenue");
    const ordersCur = sumField(moneyCur, "paid_orders");
    const ordersPrev = sumField(moneyPrev, "paid_orders");

    const trendSeries = trends60?.series ?? [];
    const { current: socialCur, previous: socialPrev } = split30DayWindows(trendSeries);
    const followersNow =
        trendSeries.length > 0
            ? Number(trendSeries[trendSeries.length - 1].followers) || 0
            : Number(engagement?.totals?.followers) || 0;
    const followersPrev =
        trendSeries.length > 1
            ? Number(trendSeries[Math.max(0, trendSeries.length - 31)].followers) || followersNow
            : followersNow;

    const erFromApi = engagement?.rates?.engagement_rate_followers;
    const erNow =
        erFromApi != null && Number.isFinite(Number(erFromApi))
            ? Number(erFromApi) * 100
            : windowErPercent(socialCur);
    const erPrev = windowErPercent(socialPrev);

    const balances = walletAnalytics?.balances ?? null;
    const walletTotals = walletAnalytics?.totals ?? null;

    const cards = [
        {
            key: "revenue",
            icon: icons.IconCurrencyDollar,
            label: subjectIsBrand ? "Total spend (30d)" : "Total revenue (30d)",
            value: formatUsd(revenueCur),
            trend: pctTrend(revenueCur, revenuePrev),
            tooltip: subjectIsBrand
                ? "Sum of paid invoice totals (your spend) over the last 30 UTC days."
                : "Sum of paid invoice totals (your earnings) over the last 30 UTC days.",
        },
        {
            key: "orders",
            icon: icons.IconHeartHandshake,
            label: subjectIsBrand ? "Paid orders (30d)" : "Paid sponsorships (30d)",
            value: formatCount(ordersCur),
            trend: pctTrend(ordersCur, ordersPrev),
            tooltip: "Count of paid invoices in the last 30 UTC days.",
        },
        {
            key: "er",
            icon: icons.IconTrendingUp,
            label: "Engagement rate",
            value: formatPct(erNow),
            trend: ppTrend(erNow, erPrev),
            tooltip:
                "Engagement rate vs followers from sampled posts when available; trend compares social snapshot windows.",
        },
        {
            key: "followers",
            icon: icons.IconUsers,
            label: "Total followers",
            value: formatCount(followersNow),
            trend: pctTrend(followersNow, followersPrev),
            tooltip: "Latest daily total followers/subscribers summed across connected social integrations.",
        },
    ];

    if (showWallet && balances) {
        cards.push({
            key: "wallet",
            icon: icons.IconWallet,
            label: subjectIsBrand ? "Wallet balance" : "Wallet (available)",
            value: formatUsd(balances.available),
            trend: subjectIsBrand
                ? walletTotals?.top_ups > 0
                    ? { text: `${formatUsd(walletTotals.top_ups)} topped up (30d)`, up: true }
                    : { text: "Prepaid balance for checkout", up: true }
                : balances.pending > 0
                  ? { text: `${formatUsd(balances.pending)} pending`, up: true }
                  : walletTotals?.releases > 0
                    ? { text: `${formatUsd(walletTotals.releases)} released (30d)`, up: true }
                    : { text: "Ready to withdraw", up: true },
            tooltip: subjectIsBrand
                ? "Available prepaid wallet balance. Top-ups and card sponsorship payments are tracked in your wallet ledger."
                : "Available balance ready to withdraw; pending shows secured earnings awaiting delivery release.",
        });
    }

    return cards;
}

/**
 * Wallet summary pills for Dashboard income panel.
 */
export function buildWalletSummaryPills({ isBrand, walletAnalytics }) {
    if (!walletAnalytics?.balances) return [];

    const { balances, totals } = walletAnalytics;

    if (isBrand) {
        return [
            { label: "Wallet available", value: formatUsd(balances.available) },
            { label: "Top-ups (30d)", value: formatUsd(totals?.top_ups ?? 0) },
            { label: "Wallet spend (30d)", value: formatUsd(totals?.order_payments ?? 0) },
        ];
    }

    return [
        { label: "Available", value: formatUsd(balances.available) },
        { label: "Pending", value: formatUsd(balances.pending ?? 0) },
        { label: "Released (30d)", value: formatUsd(totals?.releases ?? 0) },
    ];
}
