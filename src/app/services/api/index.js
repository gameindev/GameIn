import axios from 'axios';
import { applyInterceptors } from './interceptor';

const baseURL = import.meta.env.VITE_BACKEND_URL || "https://backend-app-ifeze.ondigitalocean.app/api";

const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds timeout for file uploads
});

// Apply interceptors to this instance
applyInterceptors(api);

export default api;