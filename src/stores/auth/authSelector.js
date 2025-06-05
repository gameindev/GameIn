
export const selectCurrentUser = (state) => state.user?.profile?.user;

export const selectUserLoading = (state) => state.user?.isLoading ?? false;

export const isLoggedIn = (state) => !!state.auth?.accessToken;
