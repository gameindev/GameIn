import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

// ✅ Determine environment
const isProduction = import.meta.env.VITE_NODE_ENV === 'production';

// ✅ Conditionally include logger middleware only in development
const middlewares = [];

if (!isProduction) {
    middlewares.push(logger);
}

// Create persist config for the root reducer
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] // Only persist auth state
};

// Create persisted root reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/FLUSH',
                    'persist/REGISTER',
                ],
            },
        }).concat(middlewares),
    devTools: !isProduction,
})

export const persistor = persistStore(store);

// // handy hooks
// export const getState = () => store.getState()
// export const dispatch = store.dispatch