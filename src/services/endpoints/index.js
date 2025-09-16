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
    BIO: "/users-bio",
  },
  FOLLOW: {
    FOLLOW_USER: `/users/follow`,
    UNFOLLOW_USER: (id) => `/users/${id}/follow`,
    GET_FOLLOWERS: (id) => `/users/${id}/followers`,
    GET_FOLLOWING: (id) => `/users/${id}/following`,
  },
  OFFERINGS: {
    LIST: "/offerings",
    DETAILS: (id) => `/offerings/${id}`,
    CREATE: "/offerings",
    UPDATE: (id) => `/offerings/${id}`,
    DELETE: (id) => `/offerings/${id}`,
  },
  PRODUCTS: {
    LIST: "/products",
    DETAILS: (id) => `/products/${id}`,
    CREATE: "/products/create",
  },
  SEARCH: {
    SEARCH_USERS: "/search/users",
  },
  // SEARCH: ({ keyword, userType, country, page = 1, limit = 20 }) =>
  //   `/search/users?keyword=${keyword}${userType && `&user_type=${userType}`}${
  //     country && `&country=${country}`
  //   }&page=${page}&limit=${limit}`,
};
