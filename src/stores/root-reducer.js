import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from './user/user.reducer';
import { persistReducer } from "redux-persist";
import authReducer from './auth/authSlice';
import { formReducer } from './slices'
import { authPersistConfig, formPersistConfig, userPersistConfig } from "./persistConfigs";


const persistedFormReducer = persistReducer(formPersistConfig, formReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    user: persistedUserReducer,
    multiStepForm: persistedFormReducer,
})