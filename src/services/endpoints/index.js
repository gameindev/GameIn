export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/sign-in",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    REFRESH_TOKENS: "/auth/refresh-tokens",
  },
  USERS: {
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
