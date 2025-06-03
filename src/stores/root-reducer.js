import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { formReducer, authReducer, userReducer } from './slices'
import { authPersistConfig, formPersistConfig, userPersistConfig } from "./persistConfigs";


const persistedFormReducer = persistReducer(formPersistConfig, formReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    user: persistedUserReducer,
    multiStepForm: persistedFormReducer,
})