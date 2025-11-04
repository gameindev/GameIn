import { USERTYPES } from "../../enums/userTypesEnum";

const getImageUrl = (path) =>
    path ? `${import.meta.env.VITE_ASSET_URL}/${path}` : null;

export default function profileMediaUrlsHelper(userProfile) {
    
    if (!userProfile) {
        return {
            avatarUrl: "/images/default-avatar.png",
            coverImageUrl: "/images/default-cover.png",
        };
    }

    const { user_type, creator_profile, brand_profile, community_profile } =
        userProfile;

    let profile =
        user_type === USERTYPES.CREATOR
            ? creator_profile
            : user_type === USERTYPES.BRAND
                ? brand_profile
                : community_profile;

    const avatarUrl = getImageUrl(profile?.profile_image?.path);
    const coverImageUrl = getImageUrl(profile?.cover_image?.path);

    return { avatarUrl, coverImageUrl };
}
