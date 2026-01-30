import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { 
    fetchAllStatuses, 
    fetchStatus, 
    connectPlatform, 
    fetchPlatformStats 
} from '../store/socialIntegrationSlice';

export const useSocialIntegrations = () => {
    const dispatch = useAppDispatch();
    const { integrations, loading, error, connecting, stats } = useAppSelector(
        (state) => state.socialIntegration
    );

    // Fetch all statuses on mount and check for OAuth callback
    useEffect(() => {
        dispatch(fetchAllStatuses());
        
        // Check if we're returning from OAuth callback
        const urlParams = new URLSearchParams(window.location.search);
        const platform = urlParams.get('platform');
        const code = urlParams.get('code');
        
        if (platform && code) {
            // OAuth callback detected - refresh statuses after a short delay
            setTimeout(() => {
                dispatch(fetchAllStatuses());
                // Clean up URL params
                window.history.replaceState({}, '', window.location.pathname);
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleConnect = useCallback(async (platform) => {
        try {
            await dispatch(connectPlatform(platform)).unwrap();
        } catch (err) {
            const msg = err?.message ?? (typeof err === 'string' ? err : 'Connection failed');
            console.error(`Failed to connect ${platform}:`, msg);
            // Error is already stored in Redux (normalized to string); do not rethrow object
        }
    }, [dispatch]);

    const handleRefreshStatus = useCallback(async (platform) => {
        try {
            await dispatch(fetchStatus(platform)).unwrap();
        } catch (err) {
            console.error(`Failed to refresh status for ${platform}:`, err);
            throw err;
        }
    }, [dispatch]);

    const handleFetchStats = useCallback(async (platform, integrationId) => {
        if (!integrationId) return;
        try {
            await dispatch(fetchPlatformStats({ platform, integrationId })).unwrap();
        } catch (err) {
            console.error(`Failed to fetch stats for ${platform}:`, err);
            throw err;
        }
    }, [dispatch]);

    const getStatus = useCallback((platform) => {
        return integrations[platform] || { state: 'ADD', label: 'Not Set' };
    }, [integrations]);

    return {
        integrations,
        loading,
        error,
        connecting,
        stats,
        handleConnect,
        handleRefreshStatus,
        handleFetchStats,
        getStatus,
    };
};
