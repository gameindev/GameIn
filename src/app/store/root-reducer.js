import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/store/authSlice";
import multiStepFormReducer from "../../features/auth/store/formSlice";
import persistReducer from "redux-persist/es/persistReducer";
import { authPersistConfig, bioPersistConfig, followPersistConfig, formPersistConfig, userPersistConfig, socialIntegrationPersistConfig } from "./persistence/persistConfig";
import userReducer from "../../features/auth/store/userSlice";
import followReducer from "../../features/account/store/followSlice";
import bioReducer from "../../features/account/profile/store/bioSlice";
import socialIntegrationReducer from "../../features/settings/integration/store/socialIntegrationSlice";


const persistedFormReducer = persistReducer(formPersistConfig, multiStepFormReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedFollowReducer = persistReducer(followPersistConfig, followReducer);
const persistedBioReducer = persistReducer(bioPersistConfig, bioReducer);
const persistedSocialIntegrationReducer = persistReducer(socialIntegrationPersistConfig, socialIntegrationReducer);

export const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    user: persistedUserReducer,
    multiStepForm: persistedFormReducer,
    bio: bioReducer,
    follow: persistedFollowReducer,
    socialIntegration: persistedSocialIntegrationReducer,
});