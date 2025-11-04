import axios from 'axios';
import { requestErrorInterceptor, requestInterceptor } from './interceptor/request';
import { refreshTokensNoLogout } from '../token/tokenRefreshService';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

// Axios instance for social-integration calls only.
// It attaches the Bearer token but DOES NOT auto-refresh or clear tokens on 401.
const socialApi = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000,
});

// Apply request interceptors only
socialApi.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

// Response pass-through (no refresh logic here)
socialApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error?.response?.status;
        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshTokensNoLogout();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return socialApi(originalRequest);
            } catch (_) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default socialApi;


