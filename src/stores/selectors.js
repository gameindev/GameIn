// Check login
export const isLoggedIn = (state) => !!state.auth?.accessToken;

// Get Current User 
export const currentUser = (state) => state.user.profile;