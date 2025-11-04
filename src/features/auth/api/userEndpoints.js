export const USER_ENDPOINTS = {
    BY_IDENTIFIER: "/users/by-identifier",
    CREATE: "/users",    
    UPDATE: `/users`,
    LIST: "/users",
    BIO: "/users-bio",
    UPDATE_CREATOR_PROFILE: "/creator-profiles",
    UPDATE_BRAND_PROFILE: "/brand-profiles",
    VERIFY_EMAIL: ({ email, token }) => `/user-verification/verify-email?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`,
    RESEND_VERIFICATION: (email) => `/user-verification/resend-verification-email?email=${encodeURIComponent(email)}`,
};
