
export const notificationsPrefs = [
    {
        key: "inbox",
        label: "Inbox Messages",
        email: true,
        mobile: true
    },
    {
        key: "orderMessages",
        label: "Order Messages",
        email: true,
        mobile: false,
        required: true,
    },
    {
        key: "orderUpdates",
        label: "Order Updates",
        email: true,
        mobile: true,
        required: true,
    },
    {
        key: "sponsorUpdates",
        label: "Sponsorship Offering Updates",
        email: true,
        mobile: false,
    },
    {
        key: "ratingReminders",
        label: "Rating Reminders",
        email: false,
        mobile: true,
    },
    {
        key: "sponsorSuggestions",
        label: "Sponsor Suggestions",
        email: true,
        mobile: true,
    },
    { key: "newsFeed", label: "News Feed", email: false, mobile: false },
]