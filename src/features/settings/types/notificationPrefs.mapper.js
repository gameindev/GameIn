/**
 * Maps frontend notification preference keys to backend notification types
 */
export const NOTIFICATION_TYPE_MAP = {
    // Chat & Messages
    inbox: 'NEW_MESSAGE',
    
    // Orders
    orderMessages: 'ORDER_CREATED',
    orderUpdates: 'ORDER_COMPLETED',
    orderCancelled: 'ORDER_CANCELLED',  // Separate from ORDER_COMPLETED
    
    // Payments
    paymentReceived: 'PAYMENT_RECEIVED',
    paymentFailed: 'PAYMENT_FAILED',
    
    // Social
    newFollower: 'NEW_FOLLOWER',
    postLiked: 'POST_LIKED',
    
    // Offers & Sponsorships
    sponsorUpdates: 'OFFER_RECEIVED',
    sponsorSuggestions: 'OFFER_RECEIVED',  // Both map to same type
    
    // System
    newsFeed: 'SYSTEM_ANNOUNCEMENT',
};

/**
 * Maps frontend channel names to backend channel enums
 */
export const CHANNEL_MAP = {
    email: 'EMAIL',
    mobile: 'SMS', // Mobile notifications use SMS channel
    inApp: 'IN_APP', // In-app is always enabled, but we show it
};

/**
 * Get backend notification type from frontend key
 */
export const getNotificationType = (key) => {
    return NOTIFICATION_TYPE_MAP[key] || 'CUSTOM';
};

/**
 * Get backend channel from frontend channel name
 */
export const getChannel = (channelName) => {
    return CHANNEL_MAP[channelName] || channelName.toUpperCase();
};

