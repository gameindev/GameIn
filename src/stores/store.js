
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    storage,
    // blacklist: [''], // don't persist user slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Determine environment
const isProduction = import.meta.env.VITE_NODE_ENV === 'production';

// ✅ Conditionally include logger middleware only in development
const middlewares = [];

if (!isProduction) {
    middlewares.push(logger);
}

// ✅ Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(middlewares),
    devTools: !isProduction,
});

export const persistor = persistStore(store);

