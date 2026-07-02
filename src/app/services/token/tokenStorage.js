import { setAccessTokenExpiry, setAuth } from '../../../features/auth/store/authSlice';
import { performLogout } from '../../../features/auth/store/logoutThunk';
import { store } from '../../store';
import { stopInactivityTracker } from './inactivityTracker';

export function getAccessToken() {
    return store.getState().auth.accessToken;
}

export function getRefreshToken() {
    return store.getState().auth.refreshToken;
}

export function getAccessTokenExpiry() {
    return store.getState().auth.accessTokenExpiry;
}

export function storeTokens(accessToken, refreshToken, user) {
    console.log(user);
    console.log(accessToken);
    console.log(refreshToken);
    console.log("storeTokens");
    
    // Store tokens in localStorage
    store.dispatch(setAuth({ accessToken, refreshToken, user }));
}

export function storeTokenExpiry(decodedExpiry) {
    store.dispatch(setAccessTokenExpiry(decodedExpiry * 1000));
}

export function clearTokens(options = {}) {
    stopInactivityTracker();
    return store.dispatch(performLogout(options));
}