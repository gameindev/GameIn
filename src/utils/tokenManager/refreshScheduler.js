import { getAccessTokenExpiry, getRefreshToken } from "./tokenStorage";
import { refreshTokens } from "./refreshService";

let refreshTimer = null;

export function startRefreshScheduler() {
  stopRefreshScheduler();

  const refreshToken = getRefreshToken();
  const accessTokenExpiry = getAccessTokenExpiry();

  if (!refreshToken || !accessTokenExpiry || accessTokenExpiry <= Date.now()) {
    console.warn("Scheduler not started due to invalid state");
    return;
  }

  const refreshTime = accessTokenExpiry - Date.now() - 60 * 1000;

  if (refreshTime <= 0) {
    console.warn("Token expiry too soon or already expired");
    return;
  }

  refreshTimer = setTimeout(async () => {
    try {
      await refreshTokens();
      startRefreshScheduler();
    } catch (err) {
      console.error("🔒 Refresh failed:", err.message);
    }
  }, refreshTime);
}

export function stopRefreshScheduler() {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
}
