import routePaths from "../../../app/router/routes";

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

    otherCreator: (username) => [
        { label: "PROFILE", value: routePaths.helpers.profile(username) },
        {
            label: "SPONSORSHIPS",
            value: routePaths.helpers.sponsorship(username),
        },
        { label: "OFFERINGS", value: routePaths.helpers.offering(username) },
        // { label: "INBOX", value: routePaths.helpers.inbox(username) },
    ],

    otherBrand: (username) => [
        { label: "PROFILE", value: routePaths.helpers.profile(username) },
        {
            label: "SPONSORSHIPS",
            value: routePaths.helpers.sponsorship(username),
        },
        // { label: "INBOX", value: routePaths.helpers.inbox(username) },
    ],

    otherCommunity: (username) => [
        { label: "PROFILE", value: routePaths.helpers.profile(username) },
        // { label: "INBOX", value: routePaths.helpers.inbox(username) },
    ],
};
