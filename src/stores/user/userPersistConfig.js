// stores/user/userPersistConfig.js
import storage from "redux-persist/lib/storage";

export const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["profile"], // or whatever fields you want
};
