const PERSIST_PREFIX = 'persist:';
const LEGACY_AUTH_KEYS = ['accessToken', 'refreshToken'];

/**
 * Removes all redux-persist keys and legacy auth entries from localStorage.
 * Nested slice-level persist configs each write their own persist:* key;
 * persistor.purge() alone does not always clear them reliably.
 */
export function clearPersistedStorage() {
    if (typeof window === 'undefined' || !window.localStorage) {
        return;
    }

    Object.keys(localStorage)
        .filter((key) => key.startsWith(PERSIST_PREFIX))
        .forEach((key) => localStorage.removeItem(key));

    LEGACY_AUTH_KEYS.forEach((key) => localStorage.removeItem(key));
}
