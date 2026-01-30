import { useState, useEffect, useCallback } from 'react';
import { useNotificationPreferencesService } from '../services/notificationPreferences.service';
import { getNotificationType, getChannel } from '../types/notificationPrefs.mapper';
import { notificationsPrefs } from '../types/notificationPrefs.data';
import { showNotification } from '@mantine/notifications';

/**
 * Hook to manage notification preferences
 */
export const useNotificationPreferences = () => {
    const [prefs, setPrefs] = useState([...notificationsPrefs]);
    const [loading, setLoading] = useState(true); // Start with true since we load on mount
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const { getPreferences, updatePreferencesBatch } = useNotificationPreferencesService();

    /**
     * Load preferences from backend and merge with frontend defaults
     */
    const loadPreferences = useCallback(async () => {
        setLoading(true);
        setError(null);
        console.log('Loading preferences...');
        
        let timeoutFired = false;
        
        // Add timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
            timeoutFired = true;
            console.warn('Preferences loading timeout after 10s - using defaults');
            setLoading(false);
            setPrefs([...notificationsPrefs]);
            setError('Request timed out. Using default preferences.');
        }, 10000); // 10 second timeout

        try {
            const backendPrefs = await getPreferences();
            
            // If timeout already fired, don't process the response
            if (timeoutFired) {
                console.log('Response received after timeout, ignoring');
                return;
            }
            
            clearTimeout(timeoutId);
            console.log('Preferences loaded:', backendPrefs);
            
            // Ensure backendPrefs is an array
            const preferencesArray = Array.isArray(backendPrefs) ? backendPrefs : [];
            
            // Create a map of backend preferences for quick lookup
            const prefsMap = new Map();
            preferencesArray.forEach((pref) => {
                const key = `${pref.type}_${pref.channel}`;
                prefsMap.set(key, pref.enabled);
            });

            // Merge backend preferences with frontend defaults
            const mergedPrefs = notificationsPrefs.map((frontendPref) => {
                const type = getNotificationType(frontendPref.key);
                const emailChannel = getChannel('email');
                const mobileChannel = getChannel('mobile');
                
                const emailKey = `${type}_${emailChannel}`;
                const mobileKey = `${type}_${mobileChannel}`;

                // If preference exists in backend, use it; otherwise use frontend default (true = enabled)
                return {
                    ...frontendPref,
                    email: prefsMap.has(emailKey) ? prefsMap.get(emailKey) : (frontendPref.email ?? true),
                    mobile: prefsMap.has(mobileKey) ? prefsMap.get(mobileKey) : (frontendPref.mobile ?? true),
                };
            });

            setPrefs(mergedPrefs);
            setLoading(false);
            console.log('Preferences merged and set');
        } catch (err) {
            // If timeout already fired, don't process the error
            if (timeoutFired) {
                console.log('Error received after timeout, ignoring');
                return;
            }
            
            clearTimeout(timeoutId);
            console.error('Failed to load preferences:', err);
            setError(err.message || 'Failed to load preferences');
            // Keep default preferences on error - UI will show defaults
            setPrefs([...notificationsPrefs]);
            setLoading(false);
        }
    }, [getPreferences]);

    /**
     * Load preferences on mount only
     */
    useEffect(() => {
        let isMounted = true;
        
        // Load preferences on mount
        loadPreferences().catch((err) => {
            // This catch is a safety net - the try/catch in loadPreferences should handle it
            if (isMounted) {
                console.error('Unhandled error in loadPreferences:', err);
                setLoading(false);
                setPrefs([...notificationsPrefs]);
            }
        });
        
        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount

    /**
     * Toggle a preference
     */
    const toggle = useCallback((rowKey, field) => {
        setPrefs((prev) =>
            prev.map((r) => {
                if (r.key !== rowKey) return r;
                if (r.required) return r; // keep required rows fixed
                return { ...r, [field]: !r[field] };
            })
        );
    }, []);

    /**
     * Save all preferences to backend
     */
    const savePreferences = useCallback(async () => {
        setSaving(true);
        setError(null);

        try {
            // Build array of preference updates
            const updates = [];
            
            prefs.forEach((pref) => {
                if (pref.required) return; // Skip required preferences

                const type = getNotificationType(pref.key);
                const emailChannel = getChannel('email');
                const mobileChannel = getChannel('mobile'); // Now maps to SMS

                // Add email preference
                updates.push({
                    type,
                    channel: emailChannel,
                    enabled: pref.email,
                });

                // Skip SMS for now (disabled/hidden)
                // When SMS is enabled, uncomment this:
                // updates.push({
                //     type,
                //     channel: mobileChannel,
                //     enabled: pref.mobile,
                // });
            });

            // Save all preferences
            await updatePreferencesBatch(updates);

            showNotification({
                title: 'Success',
                message: 'Notification preferences saved successfully',
                color: 'green',
            });
        } catch (err) {
            console.error('Failed to save preferences:', err);
            setError(err.message || 'Failed to save preferences');
            showNotification({
                title: 'Error',
                message: err.message || 'Failed to save preferences',
                color: 'red',
            });
        } finally {
            setSaving(false);
        }
    }, [prefs, updatePreferencesBatch]);

    /**
     * Reset to defaults
     */
    const resetToDefaults = useCallback(() => {
        setPrefs([...notificationsPrefs]);
    }, []);

    return {
        prefs,
        loading,
        saving,
        error,
        toggle,
        savePreferences,
        resetToDefaults,
        refresh: loadPreferences,
    };
};

