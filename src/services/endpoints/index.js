export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/sign-in",
    REGISTER: "/auth/register",
    SELECT_ROLE: "/users/assign-role",
    FORGOT_PASSWORD: "/auth/forgot-password",
    REFRESH_TOKENS: "/auth/refresh-tokens",
    GOOGLE_OAUTH: "/auth/google-authentication",
  },
  USERS: {
    BY_IDENTIFIER: "/users/by-identifier",
    CREATE: "/users",
    PROFILE: "/users/profile",
    UPDATE: (id) => `/users/${id}`,
    LIST: "/users",
  },
  FOLLOW: {
    FOLLOW_USER: `/users/follow`,
    UNFOLLOW_USER: (id) => `/users/${id}/follow`,
    GET_FOLLOWERS: (id) => `/users/${id}/followers`,
    GET_FOLLOWING: (id) => `/users/${id}/following`,
  },
  PRODUCTS: {
    LIST: "/products",
    DETAILS: (id) => `/products/${id}`,
    CREATE: "/products/create",
  },
  SEARCH: ({ keyword, userType, country, page = 1, limit = 20 }) =>
    `/search/users?keyword=${keyword}${userType && `&userType=${userType}`}${
      country && `&country=${country}`
    }&page=${page}&limit=${limit}`,
};
