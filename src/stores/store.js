
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";
import persistStore from "redux-persist/es/persistStore";

// ✅ Determine environment
const isProduction = import.meta.env.VITE_NODE_ENV === 'production';

// ✅ Conditionally include logger middleware only in development
const middlewares = [];

if (!isProduction) {
    middlewares.push(logger);
}

// ✅ Configure store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(middlewares),
    devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

export const persistor = persistStore(store);

