import { clearTokens } from "./tokenStorage";
import { stopRefreshScheduler } from "./tokenRefreshScheduler";

let inactivityTimer = null;
let activityListenersAdded = false;

const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Logs out the user after period of inactivity
 */
function handleInactivity() {
    console.warn("⏰ User inactive for 1 hour. Logging out...");
    
    // Stop token refresh scheduler
    stopRefreshScheduler();
    
    // Clear tokens (triggers logout)
    clearTokens();
    
    // Remove event listeners
    removeActivityListeners();
}

/**
 * Resets the inactivity timer on user activity
 */
function resetInactivityTimer() {
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
    }
    
    inactivityTimer = setTimeout(() => {
        handleInactivity();
    }, INACTIVITY_TIMEOUT);
}

/**
 * Handles user activity events
 */
function onUserActivity() {
    resetInactivityTimer();
}

/**
 * Adds activity listeners to track user interaction
 */
function addActivityListeners() {
    if (activityListenersAdded || typeof window === "undefined") {
        return;
    }

    // List of events that indicate user activity
    const events = [
        'mousedown',
        'mousemove',
        'keypress',
        'scroll',
        'touchstart',
        'click'
    ];

    events.forEach(event => {
        document.addEventListener(event, onUserActivity, true);
    });

    activityListenersAdded = true;
}

/**
 * Removes activity listeners
 */
function removeActivityListeners() {
    if (!activityListenersAdded || typeof window === "undefined") {
        return;
    }

    const events = [
        'mousedown',
        'mousemove',
        'keypress',
        'scroll',
        'touchstart',
        'click'
    ];

    events.forEach(event => {
        document.removeEventListener(event, onUserActivity, true);
    });

    activityListenersAdded = false;
}

/**
 * Starts the inactivity tracker
 */
export function startInactivityTracker() {
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
    }

    // Add event listeners for user activity
    addActivityListeners();

    // Start the timer
    inactivityTimer = setTimeout(() => {
        handleInactivity();
    }, INACTIVITY_TIMEOUT);

    console.log("✅ Inactivity tracker started (1 hour timeout)");
}

/**
 * Stops the inactivity tracker
 */
export function stopInactivityTracker() {
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
        inactivityTimer = null;
    }

    // Remove event listeners
    removeActivityListeners();

    console.log("🛑 Inactivity tracker stopped");
}

/**
 * Resets the inactivity timer manually
 * Useful for explicit user actions that should reset the timer
 */
export function resetInactivityTimerManually() {
    resetInactivityTimer();
}

