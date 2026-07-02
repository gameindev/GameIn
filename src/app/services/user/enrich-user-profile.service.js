import api from "../api";
import { getProfileAvatarPath } from "../../../shared/utils/helpers/useProfileMediaUrl.helper";

const PROFILE_POPULATE = "creator_profile,brand_profile,community_profile";
const profileCache = new Map();

const getResponseData = (response) => response?.data?.data || response?.data || response;

export const normalizeRelatedUser = (entry) =>
    entry?.favourite_user ||
    entry?.favorite_user ||
    entry?.favouriteUser ||
    entry?.favoriteUser ||
    entry?.following_user ||
    entry?.follower_user ||
    entry?.followingUser ||
    entry?.followerUser ||
    entry?.following ||
    entry?.follower ||
    entry?.user ||
    (entry?.favourite_user_id ||
    entry?.favorite_user_id ||
    entry?.following_id ||
    entry?.follower_id
        ? {
              id:
                  entry.favourite_user_id ||
                  entry.favorite_user_id ||
                  entry.following_id ||
                  entry.follower_id,
          }
        : entry);

export const clearEnrichedUserProfileCache = (userId) => {
    if (userId) {
        profileCache.delete(userId);
        return;
    }

    profileCache.clear();
};

export const enrichUserProfile = async (user, { forceRefresh = false } = {}) => {
    if (!user?.id || (!forceRefresh && getProfileAvatarPath(user))) {
        return user;
    }

    if (!forceRefresh && profileCache.has(user.id)) {
        return {
            ...user,
            ...profileCache.get(user.id),
        };
    }

    try {
        const response = await api.get(`/users/${user.id}`, {
            params: { populate: PROFILE_POPULATE },
        });
        const profileUser = getResponseData(response);
        profileCache.set(user.id, profileUser);

        return {
            ...user,
            ...profileUser,
        };
    } catch (error) {
        console.error("Error fetching user profile for avatar:", error);
        return user;
    }
};

export const normalizeAndEnrichUsers = (entries = [], options) =>
    Promise.all(
        entries
            .map(normalizeRelatedUser)
            .filter(Boolean)
            .map((user) => enrichUserProfile(user, options))
    );
