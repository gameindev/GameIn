/**
 * Preview-only analytics payloads for UI development.
 * Enable with VITE_ANALYTICS_MOCK=true in .env (restart dev server).
 */

/** Small delay so loaders feel realistic */
export function mockDelay(ms = 280) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function buildMockGameinDemographics(scopePref) {
    const scope = scopePref === "self" ? "self" : scopePref === "followers" ? "followers" : "platform";
    if (scope === "self") {
        return {
            scope: "self",
            age_bucket: "25-34",
            gender: "Female",
            country: "Germany",
            language: "en",
            user_type: "CREATOR",
        };
    }
    if (scope === "followers") {
        return {
            scope: "followers",
            subject_user_id: 1,
            totals: { followers: 26 },
            creators: {
                age_buckets: [
                    { label: "unknown", count: 2 },
                    { label: "18-24", count: 6 },
                    { label: "25-34", count: 11 },
                    { label: "35-44", count: 5 },
                    { label: "45+", count: 2 },
                ],
                gender: [
                    { label: "female", count: 9 },
                    { label: "male", count: 12 },
                    { label: "non-binary", count: 3 },
                    { label: "Not specified", count: 2 },
                ],
                countries: [
                    { label: "United States", count: 8 },
                    { label: "Germany", count: 5 },
                    { label: "Argentina", count: 4 },
                    { label: "India", count: 5 },
                    { label: "Canada", count: 4 },
                ],
            },
            brands: {
                age_buckets: [],
                countries: [
                    { label: "United States", count: 2 },
                    { label: "Germany", count: 1 },
                ],
            },
            definitions: {
                age: "Mock follower preview",
                gender: "Mock follower preview",
                country: "Mock follower preview",
                brands: "Mock follower preview",
            },
        };
    }
    return {
        scope: "platform",
        totals: { users: 1842 },
        creators: {
            age_buckets: [
                { label: "unknown", count: 28 },
                { label: "13-17", count: 41 },
                { label: "18-24", count: 312 },
                { label: "25-34", count: 498 },
                { label: "35-44", count: 176 },
                { label: "45+", count: 89 },
            ],
            gender: [
                { label: "female", count: 412 },
                { label: "male", count: 356 },
                { label: "non-binary", count: 24 },
                { label: "unknown", count: 91 },
            ],
            countries: [
                { label: "United States", count: 298 },
                { label: "Germany", count: 156 },
                { label: "United Kingdom", count: 134 },
                { label: "Brazil", count: 87 },
                { label: "Canada", count: 72 },
            ],
        },
        brands: {
            age_buckets: [
                { label: "25-34", count: 84 },
                { label: "35-44", count: 112 },
                { label: "45+", count: 64 },
            ],
            countries: [
                { label: "United States", count: 142 },
                { label: "Germany", count: 61 },
                { label: "France", count: 44 },
            ],
        },
        definitions: {
            age: "Mock preview",
            gender: "Mock preview",
            country: "Mock preview",
        },
    };
}

export function buildMockSocialTrends(days) {
    const series = [];
    const start = new Date();
    start.setUTCDate(start.getUTCDate() - (days - 1));
    start.setUTCHours(0, 0, 0, 0);

    for (let i = 0; i < days; i++) {
        const d = new Date(start);
        d.setUTCDate(start.getUTCDate() + i);
        const date = d.toISOString().slice(0, 10);
        const wave = Math.sin(i / 6) * 0.06;
        series.push({
            date,
            followers: Math.round(22800 * (1 + wave) + i * 52),
            views: Math.round(1180000 + i * 9200 + i * i * 140),
            likes: Math.round(19200 + i * 95),
        });
    }

    const platforms = ["INSTAGRAM", "YOUTUBE", "TIKTOK", "X", "TWITCH"];
    const detail_by_platform = series.slice(-14).map((row, idx) => ({
        date: row.date,
        platform: platforms[idx % platforms.length],
        followers: Math.round(row.followers / 5 + idx * 100),
        views: Math.round(row.views / 5 + idx * 5000),
        likes: Math.round(row.likes / 5 + idx * 50),
        source: idx % 3 === 0 ? "sync_success" : "scheduled_daily",
    }));

    return {
        days,
        metric_definitions: {
            followers: "Preview mock — not live API data.",
            views: "Preview mock — not live API data.",
            likes: "Preview mock — not live API data.",
        },
        series,
        detail_by_platform,
    };
}

export function buildMockSocialEngagement() {
    const likes = 128400;
    const comments = 8420;
    const shares = 1180;
    const saves = 3320;
    const retweets = 2180;
    const quotes = 390;
    const views = 2150000;
    const followers = 48200;
    const engagement_total = likes + comments + shares + saves + retweets + quotes;

    return {
        totals: {
            followers,
            likes,
            views,
            comments,
            shares,
            saves,
            retweets,
            quotes,
            engagement_total,
        },
        rates: {
            engagement_rate_followers: engagement_total / followers,
            engagement_rate_views: engagement_total / views,
        },
        metric_definitions: {
            engagement_total:
                "Preview mock — totals are illustrative. Remove VITE_ANALYTICS_MOCK for live data.",
            engagement_rate_followers: "Mock engagement rate vs followers.",
            engagement_rate_views: "Mock engagement rate vs sampled views.",
        },
    };
}

export function buildMockSponsorshipsSummary(days) {
    const revenue = 24750.5;
    const estimated_views = 1850000;

    return {
        window_days: days,
        paid_orders: 22,
        total_revenue: revenue,
        currency_note: "Preview mock — offering_order totals.",
        estimated_views_from_social_rollups: estimated_views,
        roi_proxy_revenue_per_view: revenue / estimated_views,
        metric_definitions: {
            roi_proxy:
                "Preview mock revenue / mock social rollup views. Disable VITE_ANALYTICS_MOCK for real figures.",
        },
    };
}

export function buildMockSponsorshipPrivateTracking(windowDays = 30) {
    const days = Math.min(Math.max(Math.trunc(windowDays) || 30, 1), 90);
    const hourly = Array.from({ length: 24 }, (_, hour) => ({
        hour,
        amount: hour >= 9 && hour <= 17 ? Math.round(120 + hour * 18 + (hour % 3) * 40) : hour === 20 ? 850 : 0,
        label:
            hour === 0
                ? "12am"
                : hour < 12
                  ? `${hour}am`
                  : hour === 12
                    ? "12pm"
                    : `${hour - 12}pm`,
    }));
    const incomeTotal = hourly.reduce((s, h) => s + h.amount, 0);
    const series_daily = [];
    const start = new Date();
    start.setUTCDate(start.getUTCDate() - (days - 1));
    start.setUTCHours(0, 0, 0, 0);
    for (let i = 0; i < days; i++) {
        const d = new Date(start);
        d.setUTCDate(d.getUTCDate() + i);
        series_daily.push({
            date: d.toISOString().slice(0, 10),
            revenue: 400 + i * 95 + (i % 4) * 120,
            paid_orders: i % 3,
        });
    }

    return {
        subject_user_id: 1,
        window_days: days,
        income_today: {
            date_utc: new Date().toISOString().slice(0, 10),
            total: incomeTotal,
            hourly,
        },
        series_daily,
        series_30d: series_daily,
        metric_definitions: {
            income_today: "Mock hourly sponsorship payments for UI preview.",
            series_daily: "Mock daily revenue and paid invoice counts.",
        },
    };
}

export function buildMockSponsorshipOverview() {
    return {
        subject_user_id: 1,
        counts: {
            active: 7,
            pending: 2,
            completed: 12,
            cancelled: 1,
        },
        metric_definitions: {
            active: "Paid/in-progress orders within offering start and end dates.",
            pending: "Awaiting payment or open offers without a paid order.",
            completed: "Delivered orders or completed offerings.",
            cancelled: "Cancelled, refunded, dismissed, or expired.",
        },
    };
}
