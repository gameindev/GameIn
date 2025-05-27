import axios from "axios";
import { store } from "../stores/store";
import { logoutUser, setAccessToken, setRefreshToken } from "../stores/user/user.action";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use((config) => {
    const token = store.getState().user.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh-tokens")
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = store.getState().user.refreshToken;

                const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/refresh-tokens`, {
                    refreshToken,
                });

                store.dispatch(setAccessToken(data.accessToken));
                store.dispatch(setRefreshToken(data.refreshToken));

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (err) {
                store.dispatch(logoutUser());
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
