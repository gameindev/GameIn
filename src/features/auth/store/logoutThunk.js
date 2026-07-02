function redirectToLoginPage() {
    if (typeof window === 'undefined') return;

    const base = `${window.location.origin}${window.location.pathname}`;
    window.location.replace(`${base}#/login`);
}

export const performLogout = (options = {}) => async (dispatch, getState) => {
    const { redirectToLogin = false } = options;

    // Lazy import to avoid circular deps at module load time
    const { logout } = await import('./authSlice');
    const { clearUser } = await import('./userSlice');
    const { persistor } = await import('../../../app/store');
    const api = await import('../../../app/services/api');
    const { AUTH_ENDPOINTS } = await import('../api/authEndpoints');
    const { disconnectSocket } = await import('../../../app/services/ws/ws.service');
    const { clearOnlineUsers } = await import('../../../features/notifications/store/onlineUsersSlice');
    const { clearPersistedStorage } = await import('../../../app/store/persistence/clearPersistedStorage');

    const state = getState();
    const accessToken = state?.auth?.accessToken;

    try {
        disconnectSocket();
    } catch (error) {
        console.warn('Error disconnecting socket:', error);
    }

    dispatch(clearOnlineUsers());
    dispatch(logout());
    dispatch(clearUser());
    clearPersistedStorage();

    try {
        await persistor.purge();
        persistor.persist();
    } catch (err) {
        console.error('Error during logout purge:', err);
        clearPersistedStorage();
    }

    // Do not block local cleanup on the backend logout call
    if (accessToken) {
        api.default.post(AUTH_ENDPOINTS.LOGOUT).catch((error) => {
            console.warn('Backend logout call failed:', error);
        });
    }

    if (redirectToLogin) {
        redirectToLoginPage();
    }
};


