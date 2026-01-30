import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/store/authSlice";
import multiStepFormReducer from "../../features/auth/store/formSlice";
import persistReducer from "redux-persist/es/persistReducer";
import { authPersistConfig, bioPersistConfig, followPersistConfig, formPersistConfig, userPersistConfig, socialIntegrationPersistConfig, favoriteUsersConfig, faqPersistConfig, feedPersistConfig } from "./persistence/persistConfig";
import userReducer from "../../features/auth/store/userSlice";
import followReducer from "../../features/account/store/followSlice";
import bioReducer from "../../features/account/profile/store/bioSlice";
import favoriteUserReducer from "../store/slice/favoriteUsersSlice";
import socialIntegrationReducer from "../../features/settings/integration/store/socialIntegrationSlice";
import faqReducer from "../../features/account/profile/store/faqSlice";
import feedReducer from "../../features/newsfeed/store/feedSlice";
import notificationsReducer from "../../features/notifications/store/notificationsSlice";
import onlineUsersReducer from "../../features/notifications/store/onlineUsersSlice";


const persistedFormReducer = persistReducer(formPersistConfig, multiStepFormReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedFollowReducer = persistReducer(followPersistConfig, followReducer);
const persistedFavUsersReducer = persistReducer(favoriteUsersConfig, favoriteUserReducer);
const persistedBioReducer = persistReducer(bioPersistConfig, bioReducer);
const persistedSocialIntegrationReducer = persistReducer(socialIntegrationPersistConfig, socialIntegrationReducer);
const persistedFaqReducer = persistReducer(faqPersistConfig, faqReducer);
const persistedFeedReducer = persistReducer(feedPersistConfig, feedReducer);

export const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    user: persistedUserReducer,
    multiStepForm: persistedFormReducer,
    bio: persistedBioReducer,
    follow: persistedFollowReducer,
    favUsers: persistedFavUsersReducer,
    socialIntegration: persistedSocialIntegrationReducer,
    faq: persistedFaqReducer,
    feed: persistedFeedReducer,
    notifications: notificationsReducer,
    onlineUsers: onlineUsersReducer,
});
