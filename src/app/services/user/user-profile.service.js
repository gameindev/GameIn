





export const getUserProfileService = async (
    get,
    identifier,
    accessToken,
    userType
) => {
    const isNumeric = /^\d+$/.test(identifier);
    const url = isNumeric
        ? `/users/${identifier}`
        : `/users/username?username=${identifier}`;

    let resolvedUserType = userType;

    const getAuthHeaders = (accessToken) => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    });

    if (!resolvedUserType) {
        try {
            const { data: userData } = await get({
                url,
                headers: getAuthHeaders(accessToken),
            });
            resolvedUserType = userData?.user_type || "COMMUNITY";
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw new Error("Failed to fetch user data");
        }
    }

    const profileMap = {
        CREATOR: "creator_profile",
        BRAND: "brand_profile",
        COMMUNITY: "community_profile",
    };

    const profileType = profileMap[resolvedUserType?.toUpperCase()] || "";

    const { data: profileData } = await get({
        url,
        params: profileType ? { populate: profileType } : {},
        headers: getAuthHeaders(accessToken),
    });

    return profileData;
};