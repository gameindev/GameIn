// stores/user/userPersistConfig.js
import storage from "redux-persist/lib/storage";

export const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["accessToken", "refreshToken", "currentUser"], // or whatever fields you want
};
