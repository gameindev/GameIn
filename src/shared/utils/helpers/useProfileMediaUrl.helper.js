import { USERTYPES } from "../../enums/userTypesEnum";

const PROFILE_KEYS = ["creator_profile", "brand_profile", "community_profile"];

export const getImageUrl = (path) => {
    if (!path) return null;
    if (/^(https?:)?\/\//.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
        return path;
    }

    const normalizedPath = String(path).replace(/^\/+/, "");
    const assetUrl = import.meta.env.VITE_ASSET_URL;
    return assetUrl ? `${assetUrl}/${normalizedPath}` : normalizedPath;
};

const getPriorityProfileKeys = (userProfile = {}) => {
    const orderedKeys = [];

    if (userProfile?.user_type === USERTYPES.CREATOR) {
        orderedKeys.push("creator_profile");
    } else if (userProfile?.user_type === USERTYPES.BRAND) {
        orderedKeys.push("brand_profile");
    } else if (userProfile?.user_type === USERTYPES.COMMUNITY) {
        orderedKeys.push("community_profile");
    }

    PROFILE_KEYS.forEach((key) => {
        if (!orderedKeys.includes(key)) {
            orderedKeys.push(key);
        }
    });

    return orderedKeys;
};

export const getOrderedProfiles = (userProfile = {}) =>
    getPriorityProfileKeys(userProfile)
        .map((key) => userProfile?.[key])
        .filter(Boolean);

export const getResolvedProfile = (userProfile = {}) =>
    getOrderedProfiles(userProfile)[0] || null;

const getMediaPath = (media) => {
    if (!media) return null;
    if (typeof media === "string") return media;
    return media.path || media.url || null;
};

export const getProfileAvatarPath = (userProfile = {}) =>
    getMediaPath(userProfile?.profilepic) ||
    getMediaPath(userProfile?.profile_pic) ||
    getMediaPath(userProfile?.profilePic) ||
    getMediaPath(userProfile?.profileImage) ||
    getMediaPath(userProfile?.profile_image_url) ||
    getMediaPath(userProfile?.profile_picture) ||
    getMediaPath(userProfile?.profile_image) ||
    getMediaPath(userProfile?.avatar_url) ||
    getMediaPath(userProfile?.avatar) ||
    getMediaPath(
        getOrderedProfiles(userProfile).find((profile) => getMediaPath(profile?.profile_image))
            ?.profile_image
    ) ||
    null;

export const getProfileCoverImagePath = (userProfile = {}) =>
    getOrderedProfiles(userProfile).find((profile) => profile?.cover_image?.path)
        ?.cover_image?.path || null;

export const getProfileAvatarUrl = (userProfile = {}) =>
    getImageUrl(getProfileAvatarPath(userProfile));

export const getProfileCoverImageUrl = (userProfile = {}) =>
    getImageUrl(getProfileCoverImagePath(userProfile));

export const getProfileNameParts = (userProfile = {}) => {
    const profileWithName = getOrderedProfiles(userProfile).find(
        (profile) => profile?.first_name || profile?.last_name
    );

    return {
        firstName: profileWithName?.first_name || "",
        lastName: profileWithName?.last_name || "",
    };
};

export const getProfileDisplayName = (userProfile = {}) => {
    const { firstName, lastName } = getProfileNameParts(userProfile);
    const fullName = `${firstName} ${lastName}`.trim();

    if (fullName) {
        return fullName;
    }

    const namedProfile = getOrderedProfiles(userProfile).find(
        (profile) => profile?.brand_name || profile?.community_name
    );

    return (
        namedProfile?.brand_name ||
        namedProfile?.community_name ||
        userProfile?.name ||
        userProfile?.username ||
        ""
    );
};

export default function profileMediaUrlsHelper(userProfile) {
    if (!userProfile) {
        return {
            avatarUrl: null,
            coverImageUrl: null,
        };
    }

    const avatarUrl = getProfileAvatarUrl(userProfile);
    const coverImageUrl = getProfileCoverImageUrl(userProfile);

    return { avatarUrl, coverImageUrl };
}
