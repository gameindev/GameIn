const routePaths = {
  WELCOMEPAGE: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  SEARCH:"/search/:userType",
  ACCOUNTS:{
    DASHBOARD: {
      ROOT: "/dashboard",
    },
    PROFILE: {
      ROOT: "/profile",
      CREATE_TEAM: "/profile/create-team",
    },
    SPONSORSHIPS: {
      ROOT: "/sponsorships",
    },
    OFFERINGS: {
      ROOT: "/offerings",
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
  DASHBOARD: {
    ROOT: "/dashboard",
  },
  PROFILE: {
    ROOT: "/profile",
    CREATE_TEAM: "/profile/create-team",
  },
  SPONSORSHIPS: {
    ROOT: "/sponsorships",
  },
  OFFERINGS: {
    ROOT: "/offerings",
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
};

export default routePaths;
