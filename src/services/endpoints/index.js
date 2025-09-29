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
        DISPLAY_OFFERINGS: ({ page = 1, limit = 20, userId = undefined, relations = [] }) => {
            if (!userId) throw new Error('userId is required for DISPLAY_OFFERINGS');
            return `/offerings?page=${page}&limit=${limit}&user_id=${userId}${relations.length ? `&relations=${relations.join('&relations=')}` : ''}`;
        },
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
