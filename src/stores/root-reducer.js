import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from './user/user.reducer';
import formReducer from "./form/formSlice";
import { formPersistConfig } from "./form/formPersistConfig";
import { persistReducer } from "redux-persist";
import { userPersistConfig } from "./user/userPersistConfig";
import authReducer from './auth/authSlice';
import { authPersistConfig } from "./auth/authPersistConfig";


const persistedFormReducer = persistReducer(formPersistConfig, formReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    user: persistedUserReducer,
    multiStepForm: persistedFormReducer,
})