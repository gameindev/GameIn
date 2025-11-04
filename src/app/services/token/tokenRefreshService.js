import { AUTH_ENDPOINTS } from "../../../features/auth/api/authEndpoints";
import api from "../api";
import { getTokenExpiry } from "./tokenDecoder";
import { clearTokens, getRefreshToken, storeTokenExpiry, storeTokens } from "./tokenStorage";



let refreshTokenPromise = null;

export async function refreshTokens() {
    const refreshToken = getRefreshToken();
    console.log(refreshToken);
    if (!refreshToken) {
        clearTokens();
        throw new Error("No refresh token found");
    }

    try {
        if (!refreshTokenPromise) {
            // Backend expects snake_case key: refresh_token
            refreshTokenPromise = api.post(AUTH_ENDPOINTS.REFRESH_TOKENS, {
                refresh_token: refreshToken,
            });
        }

        const { data } = await refreshTokenPromise;
        const { accessToken, refreshToken: newRefresh } = data;
        console.log(data);

        storeTokens(accessToken, newRefresh);
        const expiry = getTokenExpiry(accessToken);
        storeTokenExpiry(expiry * 1000);

        refreshTokenPromise = null;
        return accessToken;
    } catch (error) {
        console.error("Token refresh failed:", error);
        refreshTokenPromise = null;
        clearTokens();
        throw error;
    }
}

// Variant used by social-integration calls: tries to refresh, never logs out.
export async function refreshTokensNoLogout() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        throw new Error("No refresh token found");
    }

    try {
        const { data } = await api.post(AUTH_ENDPOINTS.REFRESH_TOKENS, {
            refresh_token: refreshToken,
        });

        const { accessToken, refreshToken: newRefresh, user } = data;
        storeTokens(accessToken, newRefresh, user);
        const expiry = getTokenExpiry(accessToken);
        storeTokenExpiry(expiry * 1000);
        return accessToken;
    } catch (error) {
        // Do not clear tokens here to avoid unintended logout from social calls
        throw error;
    }
}