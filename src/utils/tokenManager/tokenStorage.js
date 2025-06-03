import { logoutUser, setAuth } from "../../stores/auth/authSlice";
import { store } from "../../stores/store";
import { USER_ACTION_TYPES } from "../../stores/user/user.types";

export function getAccessToken() {
  return store.getState().auth.accessToken;
}

export function getRefreshToken() {
  return store.getState().auth.refreshToken;
}

export function getAccessTokenExpiry() {
  return store.getState().user.accessTokenExpiry;
}

export function storeTokens(accessToken, refreshToken) {
  store.dispatch(setAuth({ accessToken, refreshToken }));
}

export function storeTokenExpiry(decodedExpiry) {
  store.dispatch({
    type: USER_ACTION_TYPES.SET_ACCESS_TOKEN_EXPIRY,
    payload: decodedExpiry * 1000,
  });
}

export function clearTokens() {
  store.dispatch(logoutUser());
}
