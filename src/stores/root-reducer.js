import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from './user/user.reducer';
import formReducer from "./form/formSlice";
import { formPersistConfig } from "./form/formPersistConfig";
import { persistReducer } from "redux-persist";
import { userPersistConfig } from "./user/userPersistConfig";

const persistedFormReducer = persistReducer(formPersistConfig, formReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const rootReducer = combineReducers({
    user: persistedUserReducer,
    multiStepForm: persistedFormReducer,
})