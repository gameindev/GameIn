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
