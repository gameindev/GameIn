import storage from "redux-persist/lib/storage";

// Helper function to create a persist config based on a key and an optional whitelist.
const createPersistConfig = (key, whitelist = []) => ({
  key,
  storage,
  ...(whitelist.length > 0 && { whitelist }),
});

const authList = ["accessToken", "refreshToken", "user"];
const userList = ["profile"];

export const authPersistConfig = createPersistConfig("auth", authList);

export const userPersistConfig = createPersistConfig("user", userList);

export const formPersistConfig = createPersistConfig("multiStepForm");

export const bioPersistConfig = createPersistConfig("bio");

export const followPersistConfig = createPersistConfig("follow");

export const favoriteUsersConfig = createPersistConfig("favUsers");

export const socialIntegrationPersistConfig = createPersistConfig("socialIntegration", ["integrations"]);

// FAQ persistence (per-user map)
export const faqPersistConfig = createPersistConfig("faq");

// Newsfeed persistence
// Only persist posts and pagination state, exclude temporary states (loading, error, likingPosts)
// Note: Posts are persisted for offline viewing, but fresh data is always fetched on mount
export const feedPersistConfig = {
    key: "feed",
    storage,
    whitelist: [
        "posts",
        "total",
        "hasMore",
        "offset",
        "limit",
    ],
    // Exclude temporary states that shouldn't persist
    blacklist: [
        "loading",
        "error",
        "likingPosts", // Temporary state for preventing duplicate likes
    ],
};
