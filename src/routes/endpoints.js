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
    },
    SPONSORSHIPS: {
      ROOT: "/sponsorships",
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
};

export default routePaths;
