import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { formReducer, authReducer, userReducer, bioReducer } from "./slices";
import {
  authPersistConfig,
  bioPersistConfig,
  formPersistConfig,
  userPersistConfig,
} from "./persistConfigs";

const persistedFormReducer = persistReducer(formPersistConfig, formReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedBioReducer = persistReducer(bioPersistConfig, bioReducer);

export const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  user: persistedUserReducer,
  multiStepForm: persistedFormReducer,
  bio: persistedBioReducer,
});
