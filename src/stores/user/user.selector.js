
export const selectCurrentUser = (state) => state.user.currentUser;
// useSelector will call this function and pass in the state and return the currentUser ex: const currentUser = useSelector(selectCurrentUser);
export const selectUserLoading = (state) => state.user?.isLoading ?? false;

export const isLoggedIn = (state) => !!state.user?.accessToken;
