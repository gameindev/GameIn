# Notification Preferences - Issues and Gaps

**Document Type**: Issue Tracking  
**Status**: Active Issues  
**Priority**: High

---

## 🔴 Critical Issues

### Issue #1: Missing Notification Types in Frontend UI

**Severity**: High  
**Impact**: Users cannot control preferences for 5 active notification types  
**Status**: Open

#### Description
The frontend notification preferences UI only displays 7 notification types, but the backend actively sends notifications for 10+ types. Users have no way to control preferences for the missing types.

#### Missing Types

1. **POST_LIKED**
   - **Backend Location**: `backend/src/newsfeed/providers/newsfeed.service.ts:610-636`
   - **Channels**: IN_APP
   - **Trigger**: When a user likes a post
   - **Current Behavior**: Always sent (no preference control)
   - **User Impact**: Cannot disable post like notifications

2. **PAYMENT_RECEIVED**
   - **Backend Location**: `backend/src/payments/providers/payment-flow.service.ts:269-289`
   - **Channels**: IN_APP, EMAIL
   - **Trigger**: When payment verification succeeds
   - **Current Behavior**: Email sent regardless of preferences
   - **User Impact**: Cannot disable payment received emails

3. **PAYMENT_FAILED**
   - **Backend Location**: `backend/src/payments/providers/payment-flow.service.ts:292-310`
   - **Channels**: IN_APP, EMAIL
   - **Trigger**: When payment verification fails
   - **Current Behavior**: Email sent regardless of preferences
   - **User Impact**: Cannot disable payment failed emails

4. **NEW_FOLLOWER**
   - **Backend Location**: `backend/src/user-follow/providers/user-follow.service.ts:133-159`
   - **Channels**: IN_APP
   - **Trigger**: When a user gains a new follower
   - **Current Behavior**: Always sent (no preference control)
   - **User Impact**: Cannot disable follower notifications

5. **ORDER_CANCELLED**
   - **Backend Location**: `backend/src/offerings-order/providers/offerings-order.service.ts:88-149`
   - **Channels**: IN_APP, EMAIL
   - **Trigger**: When order status changes to CANCELLED
   - **Current Behavior**: Mapped to ORDER_COMPLETED in frontend
   - **User Impact**: Cannot separately control order cancellation emails

#### Affected Files
- `gamein-frontend/src/features/settings/types/notificationPrefs.data.js`
- `gamein-frontend/src/features/settings/types/notificationPrefs.mapper.js`
- `gamein-frontend/src/features/settings/notifications/Notifications.jsx`

#### Solution
Add missing notification types to frontend data and mapper files. See `NOTIFICATION_PREFERENCES_RECOMMENDATIONS.md` for implementation details.

---

### Issue #2: Mapping Inconsistencies

**Severity**: Medium  
**Impact**: Incorrect preference control, user confusion  
**Status**: Open

#### Description
Frontend notification keys don't properly map to backend notification types, causing incorrect preference behavior.

#### Specific Issues

1. **Order Updates Mapping**
   ```javascript
   // Current (INCORRECT):
   orderUpdates: 'ORDER_COMPLETED'
   
   // Problem: ORDER_CANCELLED is also sent but not mapped
   ```

2. **Duplicate Mapping**
   ```javascript
   // Current (DUPLICATE):
   sponsorUpdates: 'OFFER_RECEIVED'
   sponsorSuggestions: 'OFFER_RECEIVED'
   
   // Problem: Two UI items control the same backend type
   ```

3. **Invalid Mapping**
   ```javascript
   // Current (INVALID):
   ratingReminders: 'CUSTOM'
   
   // Problem: CUSTOM is not a real notification type being sent
   ```

#### Affected Files
- `gamein-frontend/src/features/settings/types/notificationPrefs.mapper.js`

#### Solution
Fix mappings to accurately reflect backend notification types. See recommendations document.

---

### Issue #3: Required Preferences Not Enforced

**Severity**: Medium  
**Impact**: Inconsistency between UI and backend  
**Status**: Open

#### Description
Frontend marks some notifications as "required" (cannot be disabled), but the backend doesn't enforce this restriction. Users can disable these via API even though the UI prevents it.

#### Required Notifications (Frontend)
- Order Messages (`ORDER_CREATED`)
- Order Updates (`ORDER_COMPLETED`)

#### Backend Behavior
- No validation prevents disabling required notifications
- `updatePreference()` accepts any enabled/disabled value
- No "required" flag in database schema

#### Code Location
- Frontend: `gamein-frontend/src/features/settings/notifications/Notifications.jsx:70-74`
- Backend: `backend/src/notifications/providers/notification.service.ts:150-176`

#### Solution Options
1. **Add backend validation** to prevent disabling required types
2. **Remove "required" flag** from frontend if not needed
3. **Add "required" column** to database schema

---

## 🟡 Medium Priority Issues

### Issue #4: Default Preferences Mismatch

**Severity**: Medium  
**Impact**: User confusion, inconsistent behavior  
**Status**: Open

#### Description
Frontend default preferences don't match backend default preferences, causing confusion for new users.

#### Examples

**NEW_MESSAGE**:
- Frontend default: `email: true`
- Backend default: `email: false` (disabled)
- **Impact**: UI shows enabled, but backend has it disabled

**Other mismatches**:
- Frontend has `mobile` preferences, but backend doesn't initialize SMS
- Frontend defaults may not reflect actual backend behavior

#### Affected Files
- Frontend: `gamein-frontend/src/features/settings/types/notificationPrefs.data.js`
- Backend: `backend/src/notifications/providers/notification.service.ts:210-242`

#### Solution
Align frontend defaults with backend defaults, or sync on load.

---

### Issue #5: Preference Check Performance

**Severity**: Low  
**Impact**: Performance degradation at scale  
**Status**: Open

#### Description
Each notification send performs a database query to check preferences. This could be optimized with caching.

#### Current Implementation
```typescript
// Called for EVERY email notification
const preference = await this.preferenceRepository.findOne({
    where: { user_id: userId, type, channel },
});
```

#### Impact
- Database query for every email notification
- Could be hundreds of queries per minute at scale
- No caching mechanism

#### Solution
Implement Redis caching for user preferences.

---

### Issue #6: Batch Update Performance

**Severity**: Low  
**Impact**: Slow preference updates  
**Status**: Open

#### Description
Batch preference updates perform sequential database operations instead of batch operations.

#### Current Implementation
```typescript
for (const pref of preferences) {
    const saved = await this.updatePreference(...); // Sequential
    results.push(saved);
}
```

#### Impact
- N database queries for N preferences
- Could be slow for users with many preferences

#### Solution
Use TypeORM batch insert/update operations.

---

## 🟢 Low Priority Issues

### Issue #7: SMS Channel Not Fully Implemented

**Severity**: Low  
**Impact**: Missing feature  
**Status**: Open

#### Description
SMS channel is supported in backend but not exposed in frontend UI.

#### Current State
- ✅ Backend: SMS channel provider exists
- ✅ Backend: SMS preferences can be saved
- ❌ Frontend: SMS column is commented out/hidden
- ❌ Frontend: Users cannot control SMS preferences

#### Affected Files
- Frontend: `gamein-frontend/src/features/settings/notifications/Notifications.jsx:49-50, 97-108`

#### Solution
Enable SMS column in UI when SMS provider is fully configured.

---

### Issue #8: Missing Preference Initialization

**Severity**: Low  
**Impact**: Some notification types default to enabled but aren't visible  
**Status**: Open

#### Description
Some notification types are sent but preferences are never initialized in `initializeDefaultPreferences()`.

#### Missing from Initialization
- `POST_LIKED` - Not in default preferences
- `POST_COMMENTED` - Defined but never triggered
- `PROFILE_VIEW` - Defined but not actively used

#### Impact
These default to "enabled" (no preference = enabled), but users can't see or control them in UI.

#### Solution
Add missing types to default preferences initialization, or add to frontend UI.

---

## 📋 Issue Summary Table

| Issue # | Severity | Type | Status | Priority |
|---------|----------|------|--------|----------|
| #1 | High | Missing Types | Open | P0 |
| #2 | Medium | Mapping | Open | P1 |
| #3 | Medium | Enforcement | Open | P1 |
| #4 | Medium | Defaults | Open | P2 |
| #5 | Low | Performance | Open | P3 |
| #6 | Low | Performance | Open | P3 |
| #7 | Low | Feature | Open | P3 |
| #8 | Low | Initialization | Open | P3 |

---

## 🔧 Quick Fixes

### Fix #1: Add Missing Notification Types (Quick)

**Files to Modify:**
1. `gamein-frontend/src/features/settings/types/notificationPrefs.data.js`
2. `gamein-frontend/src/features/settings/types/notificationPrefs.mapper.js`

**Estimated Time**: 30 minutes

### Fix #2: Fix Mapping Issues (Quick)

**Files to Modify:**
1. `gamein-frontend/src/features/settings/types/notificationPrefs.mapper.js`

**Estimated Time**: 15 minutes

### Fix #3: Add Backend Validation (Medium)

**Files to Modify:**
1. `backend/src/notifications/providers/notification.service.ts`
2. Add validation in `updatePreference()` method

**Estimated Time**: 1-2 hours

---

## 📝 Testing Requirements

For each issue fix, test:
- [ ] Frontend UI displays new notification types
- [ ] Preferences can be toggled
- [ ] Preferences are saved correctly
- [ ] Backend respects disabled preferences
- [ ] Backend still sends enabled preferences
- [ ] IN_APP always works regardless of preferences

---

**Last Updated**: 2025-01-27  
**Next Review**: After fixes implemented
