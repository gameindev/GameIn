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
      VIEW: "/profile/:username",
    },
    SPONSORSHIPS: {
      ROOT: "/sponsorships",
      VIEW: "/sponsorships/:username",
    },
    OFFERINGS: {
      ROOT: "/offerings",
      CREATE_OFFERING: "/offerings/create-offering",
      EDIT_OFFERING: "/offerings/edit-offering",
      EDIT_PRICEPOOLEVENT: "/offerings/edit-pricepool-event",
      VIEW: "/offerings/:username",
    },
    STATS: {
      ROOT: "/stats",
    },
    NEWSFEED: {
      ROOT: "/newsfeed",
    },
    INBOX: {
      ROOT: "/inbox",
      VIEW: "/inbox/:username",
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
    profile: (username) => `/profile/${username}`,
    sponsorship: (username) => `/sponsorships/${username}`,
    offering: (username) => `/offerings/${username}`,
    inbox: (username) => `/inbox/${username}`,
    profileTab: (username, tab) => `/profile/${username}/${tab}`,
  },
};

export default routePaths;
