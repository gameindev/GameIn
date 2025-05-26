import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from './user/user.reducer';
import formReducer from "./form/formSlice";
import { formPersistConfig } from "./form/formPersistConfig";
import { persistReducer } from "redux-persist";

const persistedFormReducer = persistReducer(formPersistConfig, formReducer);

export const rootReducer = combineReducers({
    user: userReducer,
    multiStepForm: persistedFormReducer,
})