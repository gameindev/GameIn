/**
 * Notification types for different events in the system
 * Add new types as needed for your application
 */
export enum NotificationType {
    // User events
    USER_WELCOME = 'USER_WELCOME',
    USER_VERIFIED = 'USER_VERIFIED',
    PASSWORD_RESET = 'PASSWORD_RESET',
    
    // Chat events
    NEW_MESSAGE = 'NEW_MESSAGE',
    MESSAGE_READ = 'MESSAGE_READ',
    CONVERSATION_INVITE = 'CONVERSATION_INVITE',
    
    // Offer/Order events
    OFFER_RECEIVED = 'OFFER_RECEIVED',
    OFFER_ACCEPTED = 'OFFER_ACCEPTED',
    OFFER_REJECTED = 'OFFER_REJECTED',
    ORDER_CREATED = 'ORDER_CREATED',
    ORDER_COMPLETED = 'ORDER_COMPLETED',
    ORDER_CANCELLED = 'ORDER_CANCELLED',
    
    // Payment events
    PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
    PAYMENT_FAILED = 'PAYMENT_FAILED',
    INVOICE_GENERATED = 'INVOICE_GENERATED',
    
    // Social events
    NEW_FOLLOWER = 'NEW_FOLLOWER',
    PROFILE_VIEW = 'PROFILE_VIEW',
    POST_LIKED = 'POST_LIKED',
    POST_COMMENTED = 'POST_COMMENTED',
    
    // Team events
    TEAM_INVITE = 'TEAM_INVITE',
    TEAM_MEMBER_ADDED = 'TEAM_MEMBER_ADDED',
    
    // System events
    SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
    MAINTENANCE_NOTICE = 'MAINTENANCE_NOTICE',
    
    // Custom
    CUSTOM = 'CUSTOM',
}

