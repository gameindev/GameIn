import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import { setAuth } from '../../features/auth/store/authSlice';

// ✅ Determine environment
const isProduction = import.meta.env.VITE_NODE_ENV === 'production';

// ✅ Conditionally include logger middleware only in development
const middlewares = [];

const persistResumeMiddleware = (storeApi) => (next) => (action) => {
    const result = next(action);

    if (setAuth.match(action)) {
        try {
            persistor.persist();
        } catch (error) {
            console.warn('Error resuming persistence after login:', error);
        }
    }

    return result;
};

middlewares.push(persistResumeMiddleware);

if (!isProduction) {
    middlewares.push(logger);
}

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