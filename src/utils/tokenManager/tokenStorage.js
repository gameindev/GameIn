import { store } from "../../stores/store";
import {
  setAccessToken,
  setRefreshToken,
  logoutUser,
} from "../../stores/user/user.action";
import { USER_ACTION_TYPES } from "../../stores/user/user.types";

export function getAccessToken() {
  return store.getState().user.accessToken;
}

export function getRefreshToken() {
  return store.getState().user.refreshToken;
}

export function getAccessTokenExpiry() {
  return store.getState().user.accessTokenExpiry;
}

export function storeTokens(accessToken, refreshToken) {
  store.dispatch(setAccessToken(accessToken));
  store.dispatch(setRefreshToken(refreshToken));
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
