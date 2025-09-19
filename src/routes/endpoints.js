const routePaths = {
    WELCOMEPAGE: "/",
    LOGIN: "/login",
    REGISTER: "/register",
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
            VIEW: "/profile/:id",
        },
        SPONSORSHIPS: {
            ROOT: "/sponsorships",
            VIEW: "/sponsorships/:id",
        },
        OFFERINGS: {
            ROOT: "/offerings",
            CREATE_OFFERING: "/offerings/create-offering",
            EDIT_OFFERING: "/offerings/edit-offering",
            EDIT_PRICEPOOLEVENT: "/offerings/edit-pricepool-event",
            LIST_OFFERINGS: "/profile/:id/offerings",
        },
        STATS: {
            ROOT: "/stats",
        },
        NEWSFEED: {
            ROOT: "/newsfeed",
        },
        INBOX: {
            ROOT: "/inbox",
            VIEW: "/inbox/:id",
        },
    },
    SETTINGS: {
        ROOT: "/settings",
        ACCOUNT: "/settings/account",
        CONTACT: "/settings/contact",
        PRIVACY: "/settings/privacy",
    },
    FOOTER: {
        ROOT: "/footer",
        ABOUT: "/footer/about",
        INFO: "/footer/info",
        TERMS: "/footer/terms",
    },

    helpers: {
        profile: (id) => `/profile/${id}`,
        sponsorship: (id) => `/sponsorships/${id}`,
        inbox: (id) => `/inbox/${id}`,
        profileTab: (id, tab) => `/profile/${id}/${tab}`,
        listOfferings: (id) => `/profile/${id}/offerings`,
    },
};

export default routePaths;
