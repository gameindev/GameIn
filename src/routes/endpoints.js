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
    ACCOUNT: "/settings/account",
    INTEGRATIONS: "/settings/intergrations",
    NOTIFICATIONS: "/settings/notifications",
    PRIVACY: "/settings/privacy",
    PAYMENTS: "/settings/payments",
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
  },
};

export default routePaths;
