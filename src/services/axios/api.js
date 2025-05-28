import axios from 'axios';
import { applyInterceptors } from './interceptors';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Apply interceptors to this instance
applyInterceptors(api);

export default api;