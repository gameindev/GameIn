import api from "../../../app/services/api";
import {
    mockDelay,
    buildMockGameinDemographics,
    buildMockSocialTrends,
    buildMockSocialEngagement,
    buildMockSponsorshipsSummary,
    buildMockSponsorshipPrivateTracking,
} from "./analytics.mock";

const unwrap = (response) => response?.data?.data ?? response?.data;

/** Set VITE_ANALYTICS_MOCK=true in .env and restart Vite to preview charts without the API */
const MOCK_ENABLED = import.meta.env.VITE_ANALYTICS_MOCK === "true";

/**
 * @param {object} [opts]
 * @param {number} [opts.forUserId] — subject user id (defaults to JWT user). Creators/brands/admins receive follower demographics for that user.
 * @param {'platform'} [opts.aggregate] — marketplace-wide GameIn demographics (creator/brand/admin only)
 */
export const analyticsService = {
    getGameinDemographics: (opts = {}) => {
        if (MOCK_ENABLED) {
            return mockDelay().then(() => {
                if (opts.aggregate === "platform") {
                    return buildMockGameinDemographics("platform");
                }
                if (import.meta.env.VITE_ANALYTICS_MOCK_SCOPE === "self") {
                    return buildMockGameinDemographics("self");
                }
                return buildMockGameinDemographics("followers");
            });
        }
        const params = {};
        if (opts.forUserId != null) params.forUserId = opts.forUserId;
        if (opts.aggregate === "platform") params.aggregate = "platform";
        return api.get("/analytics/gamein-demographics", { params }).then(unwrap);
    },

    getSocialTrends: (days = 30, opts = {}) => {
        if (MOCK_ENABLED) {
            return mockDelay().then(() => buildMockSocialTrends(days));
        }
        const params = { days };
        if (opts.forUserId != null) params.forUserId = opts.forUserId;
        return api.get("/analytics/social/trends", { params }).then(unwrap);
    },

    getSocialEngagement: (opts = {}) => {
        if (MOCK_ENABLED) {
            return mockDelay().then(() => buildMockSocialEngagement());
        }
        const params = {};
        if (opts.forUserId != null) params.forUserId = opts.forUserId;
        return api.get("/analytics/social/engagement", { params }).then(unwrap);
    },

    getSponsorshipsSummary: (days = 365, opts = {}) => {
        if (MOCK_ENABLED) {
            return mockDelay().then(() => buildMockSponsorshipsSummary(days));
        }
        const params = { days };
        if (opts.forUserId != null) params.forUserId = opts.forUserId;
        return api.get("/analytics/sponsorships-summary", { params }).then(unwrap);
    },

    /** Owner-private (and admin); omit when viewing another user’s public stats */
    getSponsorshipPrivateTracking: (opts = {}) => {
        if (MOCK_ENABLED) {
            return mockDelay().then(() => buildMockSponsorshipPrivateTracking());
        }
        const params = {};
        if (opts.forUserId != null) params.forUserId = opts.forUserId;
        return api.get("/analytics/sponsorship-private-tracking", { params }).then(unwrap);
    },
};
