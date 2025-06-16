// import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { store } from "../../stores/store";
import { logoutUser, setAuth } from "../../stores/slices/auth";

let refreshTimer = null;

export const startTokenRefreshScheduler = () => {
    const { refreshToken, accessTokenExpiry } = store.getState().user;
    
    if (!refreshToken || !accessTokenExpiry) return;

    // Schedule 1 minute before expiry
    const refreshTime = accessTokenExpiry - Date.now() - 60 * 1000;
    console.log(refreshTime);
    
    if (refreshTime <= 0) return;

    clearTimeout(refreshTimer);

    refreshTimer = setTimeout(async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/refresh-tokens`, {
                refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = res.data;
            // const decoded = jwtDecode(accessToken);

            store.dispatch(setAuth({ accessToken, refreshToken: newRefreshToken}));
            // store.dispatch({
            //     type: USER_ACTION_TYPES.SET_ACCESS_TOKEN_EXPIRY,
            //     payload: decoded.exp * 1000,
            // });

            // 🌀 restart the scheduler
            startTokenRefreshScheduler();

        } catch (err) {
            console.error("🔒 Refresh failed:", err.message);
            store.dispatch(logoutUser());
        }
    }, refreshTime);
};
