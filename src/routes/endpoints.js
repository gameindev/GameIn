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
      VIEW: "/:username/profile",
    },
    SPONSORSHIPS: {
      ROOT: "/sponsorships",
      VIEW: "/:username/sponsorships",
    },
    OFFERINGS: {
      ROOT: "/offerings",
      CREATE_OFFERING: "/offerings/create-offering",
      EDIT_OFFERING: "/:username/offerings/:offeringId/edit-offering",
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
      VIEW: "/:username/inbox",
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
    profile: (username) => `/${username}/profile`,
    sponsorship: (username) => `/${username}/sponsorships`,
    offering: (username) => `/${username}/offerings`,
    inbox: (username) => `/${username}/inbox`,
    profileTab: (username, tab) => `/profile/${username}/${tab}`,
  },
};

export default routePaths;
