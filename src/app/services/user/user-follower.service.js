/** Maps API SocialPlatform enum to labels used in search UI (socialInfoData.mapper). */
const PLATFORM_TO_DISPLAY_LABEL = {
    TWITCH: "Twitch",
    INSTAGRAM: "Instagram",
    X: "Twitter",
    YOUTUBE: "Youtube",
    TIKTOK: "Tiktok",
};

function socialsFromSearchPreview(preview) {
    if (!Array.isArray(preview) || !preview.length) return [];
    const acc = {};
    for (const row of preview) {
        const platform = String(row.platform ?? "").toUpperCase();
        const label = PLATFORM_TO_DISPLAY_LABEL[platform];
        if (!label) continue;
        const n = Number(row.followers ?? 0) || 0;
        acc[label] = (acc[label] ?? 0) + n;
    }
    return Object.entries(acc).map(([text, followers]) => ({ text, followers }));
}

export const getFollowerStats = (user) => {
    if (!user) return { totalFollowers: 0, socials: [] };

    const profileMap = {
        CREATOR: "creator_profile",
        BRAND: "brand_profile",
        COMMUNITY: "community_profile",
    };

    const profileKey = profileMap[user.user_type?.toUpperCase()];
    const profile = user[profileKey] || {};
    const profileFollowers = Number(profile.followers) || 0;

    const previewSocials = socialsFromSearchPreview(user.social_stats_preview);
    if (previewSocials.length) {
        /** Main “FOLLOWERS” under level = GameIn profile followers, not sum of social rollups. */
        return {
            totalFollowers: profileFollowers,
            socials: previewSocials,
        };
    }

    const followers = profile.followers;

    if (followers && typeof followers === "object" && !Array.isArray(followers)) {
        const socials = Object.entries(followers).map(([platform, count]) => ({
            text: platform,
            followers: Number(count) || 0,
        }));

        const totalFollowers = socials.reduce(
            (total, { followers: count }) => total + count,
            0,
        );

        return { totalFollowers, socials };
    }

    return { totalFollowers: profileFollowers, socials: [] };
};
