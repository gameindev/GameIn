import routePaths from "./../../routes/endpoints";

export const roleBasedTabs = {
  self: [
    { label: "DASHBOARD", value: routePaths.ACCOUNTS.DASHBOARD.ROOT },
    { label: "PROFILE", value: routePaths.ACCOUNTS.PROFILE.ROOT },
    { label: "SPONSORSHIPS", value: routePaths.ACCOUNTS.SPONSORSHIPS.ROOT },
    { label: "OFFERINGS", value: routePaths.ACCOUNTS.OFFERINGS.ROOT },
    { label: "STATS", value: routePaths.ACCOUNTS.STATS.ROOT },
    { label: "NEWSFEED", value: routePaths.ACCOUNTS.NEWSFEED.ROOT },
    { label: "INBOX", value: routePaths.ACCOUNTS.INBOX.ROOT },
  ],

  otherCreator: (id) => [
    { label: "PROFILE", value: routePaths.helpers.profile(id) },
    {
      label: "SPONSORSHIPS",
      value: routePaths.helpers.sponsorship(id),
    },
    { label: "INBOX", value: routePaths.helpers.inbox(id) },
  ],

  otherBrand: (id) => [
    { label: "PROFILE", value: routePaths.helpers.profile(id) },
    {
      label: "SPONSORSHIPS",
      value: routePaths.helpers.sponsorship(id),
    },
    { label: "INBOX", value: routePaths.helpers.inbox(id) },
  ],

  otherCommunity: (id) => [
    { label: "PROFILE", value: routePaths.helpers.profile(id) },
    { label: "INBOX", value: routePaths.helpers.inbox(id) },
  ],
};
