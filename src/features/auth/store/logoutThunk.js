export const performLogout = () => async (dispatch, getState, extra) => {
    // Lazy import to avoid circular deps at module load time
    const { logout } = await import('./authSlice');
    const { clearUser } = await import('./userSlice');
    const { persistor } = await import('../../../app/store');

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


