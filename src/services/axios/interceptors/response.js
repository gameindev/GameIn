import api from "../../../services/axios/index";
import { refreshTokens } from "../../../utils/tokenManager";
import { API_PATHS } from "../../endpoints";

export const responseInterceptor = (response) => {
  return response;
};

export const responseErrorInterceptor = async (error) => {
  console.error("Response Error Interceptor:", error.response || error.message);

  const originalRequest = error.config;

  if (error.response) {
    const { status } = error.response;

    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes(API_PATHS.AUTH.REFRESH_TOKENS)
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshTokens();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    } else if (status === 403) {
      console.error("Forbidden: User does not have necessary permissions.");
    } else if (status >= 500) {
      console.error("Server error. Please try again later.");
    }
  }

  return Promise.reject(error);
};
