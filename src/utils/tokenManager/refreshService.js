import api from "../../services/axios/index";
import { API_ENDPOINTS } from "../../services/endpoints";
import {
  getRefreshToken,
  storeTokens,
  storeTokenExpiry,
  clearTokens,
} from "./tokenStorage";
import { getTokenExpiry } from "./tokenDecoder";

let refreshTokenPromise = null;

export async function refreshTokens() {
  const refreshToken = getRefreshToken();
  console.log(refreshToken);
  
  if (!refreshToken) {
    console.error("No refresh token. Logging out.");
    clearTokens();
    return;
  }

  try {
    if (!refreshTokenPromise) {
      refreshTokenPromise = api.post(API_ENDPOINTS.AUTH.REFRESH_TOKENS, {
        refreshToken,
      });
    }

    const { data } = await refreshTokenPromise;
    const { accessToken, refreshToken: newRefresh } = data;
    console.log(data);
    
    storeTokens(accessToken, newRefresh);
    const expiry = getTokenExpiry(accessToken);
    storeTokenExpiry(expiry);

    refreshTokenPromise = null;
    return accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    refreshTokenPromise = null;
    clearTokens();
    throw error;
  }
}
