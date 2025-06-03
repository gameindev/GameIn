export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/sign-in",
    REGISTER: "/auth/register",
    SELECT_ROLE: "/api/users/assign-role",
    FORGOT_PASSWORD: "/auth/forgot-password",
    REFRESH_TOKENS: "/auth/refresh-tokens",
  },
  USERS: {
    CREATE: '/users',
    PROFILE: "/users/profile",
    UPDATE: id => `/users/${id}`,
    LIST: "/users",
  },
  PRODUCTS: {
    LIST: "/products",
    DETAILS: id => `/products/${id}`,
    CREATE: "/products/create",
  },
};
