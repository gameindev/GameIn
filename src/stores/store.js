/* eslint-disable */
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer) //persist the inf

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean); //if it's not in production, use the logger, else don't use it; 

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWares),
    devTools: true,
});

export const persistor = persistStore(store)