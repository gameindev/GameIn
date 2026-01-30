export const performLogout = () => async (dispatch, getState, extra) => {
    // Lazy import to avoid circular deps at module load time
    const { logout } = await import('./authSlice');
    const { clearUser } = await import('./userSlice');
    const { persistor } = await import('../../../app/store');
    const api = await import('../../../app/services/api');
    const { AUTH_ENDPOINTS } = await import('../api/authEndpoints');
    const { disconnectSocket } = await import('../../../app/services/ws/ws.service');
    const { clearOnlineUsers } = await import('../../../features/notifications/store/onlineUsersSlice');

    try {
        // Disconnect WebSocket first to trigger backend disconnect handler
        // This ensures the backend properly removes the user from online users list
        try {
            disconnectSocket();
        } catch (error) {
            console.warn('Error disconnecting socket:', error);
        }

        // Call backend logout endpoint to update is_logged_in status
        // This should be done before clearing local state to ensure we have the token
        const state = getState();
        const accessToken = state?.auth?.accessToken;
        
        if (accessToken) {
            try {
                await api.default.post(AUTH_ENDPOINTS.LOGOUT);
            } catch (error) {
                // Log error but don't block logout - user should still be logged out locally
                // This handles cases where the token is already invalid or network issues
                console.warn('Backend logout call failed:', error);
            }
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Error calling logout endpoint:', err);
    }

    // Clear online users state
    dispatch(clearOnlineUsers());

    // Clear local state regardless of backend call result
    dispatch(logout());
    dispatch(clearUser());

    try {
        // Clear any manual tokens stored outside redux-persist
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('accessToken');
            window.localStorage.removeItem('refreshToken');
        }

        await persistor.purge();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error during logout purge:', err);
    }
};


