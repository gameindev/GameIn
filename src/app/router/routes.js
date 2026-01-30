const routePaths = {
    WELCOMEPAGE: "/",
    HOME_ALT: "/home-alt",
    LOGIN: "/login",
    REGISTER: "/register",
    VERIFY_ACCOUNT: "/verify-account",
    FEEDBACK: "/feedback",
    SEARCH: "/search/:userType",
    ACCOUNTS: {
        DASHBOARD: {
            ROOT: "/dashboard",
        },
        PROFILE: {
            ROOT: "/profile",
            BIO: "/profile/bio",
            FAQ: "/profile/faq",
            CREATE_TEAM: "/profile/create-team",
            VIEW: "/:username/profile",
        },
        SPONSORSHIPS: {
            ROOT: "/stats",
            VIEW: "/:username/stats",
        },
        OFFERINGS: {
            ROOT: "/offerings",
            CREATE_OFFERING: "/offerings/create-offering",
            FPP_EDIT_OFFERING: "/offerings/:offeringId/edit-offering",
            TPP_EDIT_OFFERING: "/:username/offerings/:offeringId/edit-offering",
            EDIT_PRICEPOOLEVENT: "/offerings/edit-pricepool-event",
            VIEW: "/:username/offerings",
        },
        STATS: {
            ROOT: "/stats",
        },
        NEWSFEED: {
            ROOT: "/newsfeed",
        },
        INBOX: {
            ROOT: "/inbox",
            CONVERSATION: "/inbox/:conversationId",
            VIEW: "/:username/inbox",
        },
    },
    SETTINGS: {
        ACCOUNT: "/settings/account",
        INTEGRATIONS: "/settings/integrations",
        NOTIFICATIONS: "/settings/notifications",
        PRIVACY: "/settings/privacy",
        PAYMENTS: "/settings/payments",
        SOCIAL_CALLBACK: "/social-integration/callback",
    },
    PAYMENT: {
        SUCCESS: "/payment/success",
        CANCEL: "/payment/cancel",
    },
    FOOTER: {
        ROOT: "/footer",
        ABOUT: "/footer/about",
        INFO: "/footer/info",
        TERMS: "/footer/terms",
    },

    helpers: {
        profile: (username) => `/${username}/profile`,
        sponsorship: (username) => `/${username}/stats`,
        offering: (username) => `/${username}/offerings`,
        inbox: (username) => `/${username}/inbox`,
        profileTab: (username, tab) => `/profile/${username}/${tab}`,
    },
};

export default routePaths;
