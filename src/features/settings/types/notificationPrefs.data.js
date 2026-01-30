
export const notificationsPrefs = [
    // Chat & Messages
    {
        key: "inbox",
        label: "Inbox Messages",
        email: false,  // Match backend default (disabled)
        mobile: false
    },
    
    // Orders
    {
        key: "orderMessages",
        label: "Order Messages",
        email: true,
        mobile: false,
        required: true,
    },
    {
        key: "orderUpdates",
        label: "Order Updates (Completed/In Progress)",
        email: true,
        mobile: false,
        required: true,
    },
    {
        key: "orderCancelled",
        label: "Order Cancelled",
        email: true,
        mobile: false,
        required: true,
    },
    
    // Payments
    {
        key: "paymentReceived",
        label: "Payment Received",
        email: true,
        mobile: false,
    },
    {
        key: "paymentFailed",
        label: "Payment Failed",
        email: true,
        mobile: false,
    },
    
    // Social
    {
        key: "newFollower",
        label: "New Followers",
        email: true,
        mobile: false,
    },
    {
        key: "postLiked",
        label: "Post Likes",
        email: false,  // Only IN_APP currently, but allow email preference
        mobile: false,
    },
    
    // Offers & Sponsorships
    {
        key: "sponsorUpdates",
        label: "Sponsorship Offering Updates",
        email: true,
        mobile: false,
    },
    {
        key: "sponsorSuggestions",
        label: "Sponsor Suggestions",
        email: true,
        mobile: false,
    },
    
    // System
    { 
        key: "newsFeed", 
        label: "News Feed & Announcements", 
        email: true, 
        mobile: false 
    },
]