/**
 * Hash-router apps often put the query string after the route in the fragment, e.g.
 *   https://app.test/#/social-integration/callback?status=success
 * In that case `window.location.search` is empty; params live on the hash.
 */
export function getHashOrSearchParams() {
    const hash = window.location.hash || "";
    const q = hash.indexOf("?");
    if (q !== -1) {
        return new URLSearchParams(hash.slice(q + 1));
    }
    return new URLSearchParams(window.location.search || "");
}

/** @returns {{ status: string, message: string }} */
export function getOAuthCallbackQuery() {
    const params = getHashOrSearchParams();
    return {
        status: params.get("status") || "",
        message: params.get("message") || "",
    };
}
