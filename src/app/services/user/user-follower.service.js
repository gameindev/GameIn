export const getFollowerStats = (user) => {
    if (!user) return { totalFollowers: 0, socials: [] };

    const profileMap = {
        CREATOR: "creator_profile",
        BRAND: "brand_profile",
        COMMUNITY: "community_profile",
    };

    const profileKey = profileMap[user.user_type?.toUpperCase()];
    const profile = user[profileKey] || {};

    const totalFollowers = profile.followers || 0;

    const socials = Object.entries(profile.followers || {}).map(
        ([platform, count]) => ({
            text: platform,
            followers: count,
        })
    );

    return { totalFollowers, socials };
};
