// utils/startTokenRefreshScheduler.js
import { setAccessToken, setRefreshToken, logoutUser } from "../../stores/user/user.action";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { USER_ACTION_TYPES } from "../../stores/user/user.types";
import { store } from "../../stores/store";

let refreshTimer = null;

export const startTokenRefreshScheduler = () => {
    const { refreshToken, accessTokenExpiry } = store.getState().user;

    if (!refreshToken || !accessTokenExpiry) return;

    // Schedule 1 minute before expiry
    const refreshTime = accessTokenExpiry - Date.now() - 60 * 1000;

    if (refreshTime <= 0) return;

    clearTimeout(refreshTimer);

    refreshTimer = setTimeout(async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/refresh-tokens`, {
                refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = res.data;
            const decoded = jwtDecode(accessToken);

            store.dispatch(setAccessToken(accessToken));
            store.dispatch(setRefreshToken(newRefreshToken));
            store.dispatch({
                type: USER_ACTION_TYPES.SET_ACCESS_TOKEN_EXPIRY,
                payload: decoded.exp * 1000,
            });

            // 🌀 restart the scheduler
            startTokenRefreshScheduler();

        } catch (err) {
            console.error("🔒 Refresh failed:", err.message);
            store.dispatch(logoutUser());
        }
    }, refreshTime);
};
