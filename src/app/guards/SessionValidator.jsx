import { useEffect, useRef } from 'react';
import { store, persistor } from '../store';
import { performLogout } from '../../features/auth/store/logoutThunk';
import { decodeToken } from '../services/token/tokenDecoder';
import { refreshTokens } from '../services/token/tokenRefreshService';

const PUBLIC_PATHS = ['/', '/home-alt', '/login', '/register', '/verify-account'];

function getCurrentPath() {
    const hash = window.location.hash.replace('#', '') || '/';
    return hash.split('?')[0];
}

function isPublicRoute() {
    return PUBLIC_PATHS.includes(getCurrentPath());
}

function isAccessTokenExpired(token) {
    try {
        const decoded = decodeToken(token);
        if (!decoded?.exp) return true;
        return decoded.exp * 1000 <= Date.now();
    } catch {
        return true;
    }
}

function waitForRehydration() {
    return new Promise((resolve) => {
        if (persistor.getState().bootstrapped) {
            resolve();
            return;
        }

        const unsubscribe = persistor.subscribe(() => {
            if (persistor.getState().bootstrapped) {
                unsubscribe();
                resolve();
            }
        });
    });
}

/**
 * Runs after redux-persist rehydrates.
 * Only logs out when tokens are present but the session is no longer valid.
 */
const SessionValidator = () => {
    const hasValidated = useRef(false);

    useEffect(() => {
        if (hasValidated.current) return;
        hasValidated.current = true;

        const validateSession = async () => {
            await waitForRehydration();

            const { accessToken, refreshToken } = store.getState().auth ?? {};

            if (!accessToken && !refreshToken) {
                return;
            }

            if (accessToken && !isAccessTokenExpired(accessToken)) {
                return;
            }

            if (refreshToken) {
                try {
                    await refreshTokens();
                    return;
                } catch {
                    // refreshTokens clears invalid tokens on failure
                    return;
                }
            }

            if (accessToken) {
                await store.dispatch(
                    performLogout({ redirectToLogin: !isPublicRoute() })
                );
            }
        };

        validateSession();
    }, []);

    return null;
};

export default SessionValidator;
