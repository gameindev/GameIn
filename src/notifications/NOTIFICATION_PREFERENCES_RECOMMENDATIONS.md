# Notification Preferences - Recommendations and Implementation Guide

**Document Type**: Implementation Recommendations  
**Status**: Ready for Implementation  
**Priority**: High

---

## 🎯 Overview

This document provides detailed recommendations and implementation steps to fix the notification preferences system issues identified in the status report.

---

## 📋 Priority 1: Add Missing Notification Types

### Goal
Add all active notification types to the frontend UI so users can control their preferences.

### Implementation Steps

#### Step 1: Update Frontend Data File

**File**: `gamein-frontend/src/features/settings/types/notificationPrefs.data.js`

**Current Content** (7 types):
```javascript
export const notificationsPrefs = [
    { key: "inbox", label: "Inbox Messages", email: true, mobile: true },
    { key: "orderMessages", label: "Order Messages", email: true, mobile: false, required: true },
    { key: "orderUpdates", label: "Order Updates", email: true, mobile: true, required: true },
    { key: "sponsorUpdates", label: "Sponsorship Offering Updates", email: true, mobile: false },
    { key: "ratingReminders", label: "Rating Reminders", email: false, mobile: true },
    { key: "sponsorSuggestions", label: "Sponsor Suggestions", email: true, mobile: true },
    { key: "newsFeed", label: "News Feed", email: false, mobile: false },
]
```

**Recommended Update** (12 types):
```javascript
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
        required: true 
    },
    { 
        key: "orderUpdates", 
        label: "Order Updates (Completed/In Progress)", 
        email: true, 
        mobile: false, 
        required: true 
    },
    { 
        key: "orderCancelled", 
        label: "Order Cancelled", 
        email: true, 
        mobile: false, 
        required: true 
    },
    
    // Payments
    { 
        key: "paymentReceived", 
        label: "Payment Received", 
        email: true, 
        mobile: false 
    },
    { 
        key: "paymentFailed", 
        label: "Payment Failed", 
        email: true, 
        mobile: false 
    },
    
    // Social
    { 
        key: "newFollower", 
        label: "New Followers", 
        email: true, 
        mobile: false 
    },
    { 
        key: "postLiked", 
        label: "Post Likes", 
        email: false,  // Only IN_APP currently, but allow email preference
        mobile: false 
    },
    
    // Offers & Sponsorships
    { 
        key: "sponsorUpdates", 
        label: "Sponsorship Offering Updates", 
        email: true, 
        mobile: false 
    },
    { 
        key: "sponsorSuggestions", 
        label: "Sponsor Suggestions", 
        email: true, 
        mobile: false 
    },
    
    // System
    { 
        key: "newsFeed", 
        label: "News Feed & Announcements", 
        email: true, 
        mobile: false 
    },
    
    // Remove ratingReminders - not a real notification type
    // { key: "ratingReminders", label: "Rating Reminders", email: false, mobile: true },
]
```

#### Step 2: Update Mapper File

**File**: `gamein-frontend/src/features/settings/types/notificationPrefs.mapper.js`

**Current Content**:
```javascript
export const NOTIFICATION_TYPE_MAP = {
    inbox: 'NEW_MESSAGE',
    orderMessages: 'ORDER_CREATED',
    orderUpdates: 'ORDER_COMPLETED',
    sponsorUpdates: 'OFFER_RECEIVED',
    ratingReminders: 'CUSTOM',
    sponsorSuggestions: 'OFFER_RECEIVED',
    newsFeed: 'SYSTEM_ANNOUNCEMENT',
};
```

**Recommended Update**:
```javascript
export const NOTIFICATION_TYPE_MAP = {
    // Chat & Messages
    inbox: 'NEW_MESSAGE',
    
    // Orders
    orderMessages: 'ORDER_CREATED',
    orderUpdates: 'ORDER_COMPLETED',
    orderCancelled: 'ORDER_CANCELLED',  // NEW: Separate from ORDER_COMPLETED
    
    // Payments
    paymentReceived: 'PAYMENT_RECEIVED',  // NEW
    paymentFailed: 'PAYMENT_FAILED',      // NEW
    
    // Social
    newFollower: 'NEW_FOLLOWER',         // NEW
    postLiked: 'POST_LIKED',             // NEW
    
    // Offers & Sponsorships
    sponsorUpdates: 'OFFER_RECEIVED',
    sponsorSuggestions: 'OFFER_RECEIVED',  // Keep both for now, or remove one
    
    // System
    newsFeed: 'SYSTEM_ANNOUNCEMENT',
    
    // REMOVED: ratingReminders: 'CUSTOM' - not a real notification type
};
```

#### Step 3: Update Backend Default Preferences

**File**: `backend/src/notifications/providers/notification.service.ts`

**Add to `initializeDefaultPreferences()` method** (around line 210):

```typescript
async initializeDefaultPreferences(userId: number): Promise<void> {
    const defaultPreferences: Array<{ type: NotificationType; channel: NotificationChannel; enabled: boolean }> = [
        // Chat notifications
        { type: NotificationType.NEW_MESSAGE, channel: NotificationChannel.EMAIL, enabled: false },
        
        // Order notifications (required - always enabled)
        { type: NotificationType.ORDER_CREATED, channel: NotificationChannel.EMAIL, enabled: true },
        { type: NotificationType.ORDER_COMPLETED, channel: NotificationChannel.EMAIL, enabled: true },
        { type: NotificationType.ORDER_CANCELLED, channel: NotificationChannel.EMAIL, enabled: true },  // NEW
        
        // Payment notifications
        { type: NotificationType.PAYMENT_RECEIVED, channel: NotificationChannel.EMAIL, enabled: true },  // NEW
        { type: NotificationType.PAYMENT_FAILED, channel: NotificationChannel.EMAIL, enabled: true },    // NEW
        
        // Social notifications
        { type: NotificationType.NEW_FOLLOWER, channel: NotificationChannel.EMAIL, enabled: true },        // NEW
        { type: NotificationType.POST_LIKED, channel: NotificationChannel.EMAIL, enabled: false },       // NEW (disabled by default)
        
        // Offer notifications
        { type: NotificationType.OFFER_RECEIVED, channel: NotificationChannel.EMAIL, enabled: true },
        { type: NotificationType.OFFER_ACCEPTED, channel: NotificationChannel.EMAIL, enabled: true },
        { type: NotificationType.OFFER_REJECTED, channel: NotificationChannel.EMAIL, enabled: true },
        
        // System notifications
        { type: NotificationType.SYSTEM_ANNOUNCEMENT, channel: NotificationChannel.EMAIL, enabled: true },
    ];

    await this.updatePreferencesBatch(userId, defaultPreferences);
    this.logger.log(`Initialized default preferences for user ${userId}`);
}
```

### Testing Checklist
- [ ] New notification types appear in UI
- [ ] Preferences can be toggled for new types
- [ ] Preferences are saved correctly
- [ ] Backend respects disabled preferences
- [ ] Default preferences are initialized for new users

---

## 📋 Priority 2: Fix Mapping Issues

### Goal
Fix incorrect and duplicate mappings between frontend keys and backend notification types.

### Implementation Steps

#### Step 1: Separate ORDER_CANCELLED

Already covered in Priority 1, Step 2.

#### Step 2: Resolve Duplicate OFFER_RECEIVED Mapping

**Option A: Keep Both (Recommended)**
- Keep both `sponsorUpdates` and `sponsorSuggestions` mapping to `OFFER_RECEIVED`
- They control the same backend type, which is acceptable
- Users can toggle the same preference from two UI items (not ideal but functional)

**Option B: Remove One**
- Remove `sponsorSuggestions` from UI
- Keep only `sponsorUpdates`
- **File**: `notificationPrefs.data.js` - Remove sponsorSuggestions entry

**Option C: Map to Different Types**
- If backend has separate types for updates vs suggestions, map accordingly
- Currently both map to `OFFER_RECEIVED`

**Recommendation**: Option A (keep both) for now, document the behavior.

#### Step 3: Remove Invalid CUSTOM Mapping

**File**: `gamein-frontend/src/features/settings/types/notificationPrefs.data.js`

Remove:
```javascript
{ key: "ratingReminders", label: "Rating Reminders", email: false, mobile: true },
```

**File**: `gamein-frontend/src/features/settings/types/notificationPrefs.mapper.js`

Remove:
```javascript
ratingReminders: 'CUSTOM',
```

### Testing Checklist
- [ ] ORDER_CANCELLED is separately controllable
- [ ] Duplicate mappings work correctly (or are resolved)
- [ ] Invalid CUSTOM mapping is removed
- [ ] No console errors when loading preferences

---

## 📋 Priority 3: Enforce Required Preferences

### Goal
Ensure that "required" notifications cannot be disabled, either in UI or via API.

### Implementation Options

#### Option A: Backend Validation (Recommended)

**File**: `backend/src/notifications/providers/notification.service.ts`

**Add constant for required types**:
```typescript
private readonly REQUIRED_NOTIFICATION_TYPES = [
    NotificationType.ORDER_CREATED,
    NotificationType.ORDER_COMPLETED,
    NotificationType.ORDER_CANCELLED,
] as const;
```

**Update `updatePreference()` method**:
```typescript
async updatePreference(
    userId: number,
    type: NotificationType,
    channel: NotificationChannel,
    enabled: boolean,
): Promise<NotificationPreferenceEntity> {
    // Prevent disabling required notification types
    if (!enabled && this.REQUIRED_NOTIFICATION_TYPES.includes(type)) {
        throw new BadRequestException(
            `Cannot disable ${type} notifications - they are required for order management`
        );
    }

    // ... rest of existing code
}
```

**Update `updatePreferencesBatch()` method**:
```typescript
async updatePreferencesBatch(
    userId: number,
    preferences: Array<{ type: NotificationType; channel: NotificationChannel; enabled: boolean }>,
): Promise<NotificationPreferenceEntity[]> {
    const results = [];

    for (const pref of preferences) {
        // Skip IN_APP channel - it's always enabled
        if (pref.channel === NotificationChannel.IN_APP) {
            continue;
        }

        // Prevent disabling required types
        if (!pref.enabled && this.REQUIRED_NOTIFICATION_TYPES.includes(pref.type)) {
            this.logger.warn(
                `Skipping disable of required notification type: ${pref.type} for user ${userId}`
            );
            continue; // Skip this preference update
        }

        const saved = await this.updatePreference(
            userId,
            pref.type,
            pref.channel,
            pref.enabled,
        );
        results.push(saved);
    }

    return results;
}
```

#### Option B: Remove Required Flag

If required notifications aren't actually required, remove the flag from frontend.

**File**: `gamein-frontend/src/features/settings/types/notificationPrefs.data.js`

Remove `required: true` from:
- `orderMessages`
- `orderUpdates`
- `orderCancelled` (if added)

**File**: `gamein-frontend/src/features/settings/notifications/Notifications.jsx`

Remove the required badge display logic (lines 70-74).

### Testing Checklist
- [ ] Required notifications cannot be disabled in UI
- [ ] Required notifications cannot be disabled via API
- [ ] Error message is clear when attempting to disable
- [ ] Required badge displays correctly in UI

---

## 📋 Priority 4: Align Default Preferences

### Goal
Ensure frontend defaults match backend defaults to prevent user confusion.

### Implementation Steps

#### Step 1: Update Frontend Defaults

**File**: `gamein-frontend/src/features/settings/types/notificationPrefs.data.js`

Update defaults to match backend:
- `inbox.email`: `false` (backend default)
- `postLiked.email`: `false` (backend default)
- All others: `true` (match backend)

#### Step 2: Sync on Load

**File**: `gamein-frontend/src/features/settings/hooks/useNotificationPreferences.js`

The hook already merges backend preferences with frontend defaults (lines 58-73). Ensure this logic prioritizes backend values:

```javascript
// Current logic is correct - backend preferences override frontend defaults
return {
    ...frontendPref,
    email: prefsMap.has(emailKey) ? prefsMap.get(emailKey) : (frontendPref.email ?? true),
    mobile: prefsMap.has(mobileKey) ? prefsMap.get(mobileKey) : (frontendPref.mobile ?? true),
};
```

#### Step 3: Document Default Behavior

Add comments in both files explaining default behavior.

### Testing Checklist
- [ ] New users see correct defaults
- [ ] Existing users see their saved preferences
- [ ] Frontend defaults match backend defaults
- [ ] No confusion when loading preferences

---

## 📋 Priority 5: Performance Optimizations

### Goal
Optimize preference checking and batch updates for better performance.

### Implementation Steps

#### Step 1: Add Redis Caching (Optional)

**File**: `backend/src/notifications/providers/notification.service.ts`

**Add caching layer**:
```typescript
// Inject Redis service
constructor(
    // ... existing injections
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
) {}

async isChannelEnabled(
    userId: number,
    type: NotificationType,
    channel: NotificationChannel,
): Promise<boolean> {
    // Check cache first
    const cacheKey = `notification_pref:${userId}:${type}:${channel}`;
    const cached = await this.redis.get(cacheKey);
    
    if (cached !== null) {
        return cached === 'true';
    }

    // Check database
    const preference = await this.preferenceRepository.findOne({
        where: { user_id: userId, type, channel },
    });

    const enabled = preference ? preference.enabled : true;
    
    // Cache for 5 minutes
    await this.redis.setex(cacheKey, 300, enabled.toString());
    
    return enabled;
}

// Invalidate cache on update
async updatePreference(...) {
    // ... existing update logic
    
    // Invalidate cache
    const cacheKey = `notification_pref:${userId}:${type}:${channel}`;
    await this.redis.del(cacheKey);
    
    return preference;
}
```

#### Step 2: Optimize Batch Updates

**File**: `backend/src/notifications/providers/notification.service.ts`

**Use batch operations**:
```typescript
async updatePreferencesBatch(
    userId: number,
    preferences: Array<{ type: NotificationType; channel: NotificationChannel; enabled: boolean }>,
): Promise<NotificationPreferenceEntity[]> {
    // Filter out IN_APP and required types
    const validPrefs = preferences.filter(pref => 
        pref.channel !== NotificationChannel.IN_APP &&
        (pref.enabled || !this.REQUIRED_NOTIFICATION_TYPES.includes(pref.type))
    );

    // Use upsert for batch operation
    const entities = validPrefs.map(pref => 
        this.preferenceRepository.create({
            user_id: userId,
            type: pref.type,
            channel: pref.channel,
            enabled: pref.enabled,
        })
    );

    // Batch save
    return this.preferenceRepository.save(entities);
}
```

### Testing Checklist
- [ ] Cache reduces database queries
- [ ] Batch updates are faster
- [ ] Cache invalidation works correctly
- [ ] No performance regressions

---

## 📋 Implementation Order

### Phase 1: Critical Fixes (Week 1)
1. ✅ Add missing notification types (Priority 1)
2. ✅ Fix mapping issues (Priority 2)
3. ✅ Test end-to-end

### Phase 2: Enforcement (Week 2)
4. ✅ Enforce required preferences (Priority 3)
5. ✅ Align defaults (Priority 4)
6. ✅ Test edge cases

### Phase 3: Optimization (Week 3+)
7. ⏳ Performance optimizations (Priority 5)
8. ⏳ SMS channel implementation
9. ⏳ Additional testing

---

## 📝 Code Review Checklist

Before submitting changes, ensure:

- [ ] All new notification types are added to frontend
- [ ] Mappings are correct and complete
- [ ] Required preferences are enforced
- [ ] Defaults match between frontend and backend
- [ ] Error handling is in place
- [ ] Tests are written/updated
- [ ] Documentation is updated
- [ ] No console errors
- [ ] UI is responsive and accessible

---

## 🧪 Testing Scenarios

### Scenario 1: New User
1. User registers
2. Default preferences are initialized
3. User opens notification settings
4. **Expected**: All preferences show correct defaults

### Scenario 2: Disable Email Notification
1. User disables email for "Payment Received"
2. User receives a payment
3. **Expected**: Email not sent, IN_APP notification still sent

### Scenario 3: Required Notification
1. User tries to disable "Order Messages"
2. **Expected**: Checkbox is disabled, or error message shown

### Scenario 4: Missing Preference
1. User has no preference for "Post Liked"
2. System sends "Post Liked" notification
3. **Expected**: Defaults to enabled (email sent if enabled)

---

## 📚 Related Files

### Backend
- `backend/src/notifications/entities/notification-preference.entity.ts`
- `backend/src/notifications/providers/notification.service.ts`
- `backend/src/notifications/notifications.controller.ts`
- `backend/src/notifications/dtos/update-preference.dto.ts`
- `backend/src/notifications/dtos/update-preferences-batch.dto.ts`

### Frontend
- `gamein-frontend/src/features/settings/notifications/Notifications.jsx`
- `gamein-frontend/src/features/settings/hooks/useNotificationPreferences.js`
- `gamein-frontend/src/features/settings/services/notificationPreferences.service.js`
- `gamein-frontend/src/features/settings/types/notificationPrefs.data.js`
- `gamein-frontend/src/features/settings/types/notificationPrefs.mapper.js`

---

**Last Updated**: 2025-01-27  
**Status**: Ready for Implementation  
**Estimated Total Time**: 8-12 hours
