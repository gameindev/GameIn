import { getAccessToken } from "../../../utils/tokenManager";

export const requestInterceptor = (config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

export const requestErrorInterceptor = (error) => {
  console.error("Request Error Interceptor:", error);
  return Promise.reject(error);
};
