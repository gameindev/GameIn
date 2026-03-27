import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { 
    fetchAllStatuses, 
    fetchStatus, 
    connectPlatform, 
    fetchPlatformStats,
    syncPlatform,
    disconnectPlatform,
} from '../store/socialIntegrationSlice';

export const useSocialIntegrations = () => {
    const dispatch = useAppDispatch();
    const { integrations, loading, error, connecting, syncing, disconnecting, stats } = useAppSelector(
        (state) => state.socialIntegration
    );

    useEffect(() => {
        dispatch(fetchAllStatuses());
        // OAuth code is consumed by the backend; return URL uses ?status= on the hash.
        // SocialCallback page dispatches fetchAllStatuses + clearSocialStats after success.
    }, [dispatch]);

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

    const handleSync = useCallback(async (platform) => {
        return dispatch(syncPlatform(platform)).unwrap();
    }, [dispatch]);

    const handleDisconnect = useCallback(async (platform) => {
        return dispatch(disconnectPlatform(platform)).unwrap();
    }, [dispatch]);

    const getStatus = useCallback((platform) => {
        return integrations[platform] || { state: 'ADD', label: 'Not Set' };
    }, [integrations]);

    return {
        integrations,
        loading,
        error,
        connecting,
        syncing,
        disconnecting,
        stats,
        handleConnect,
        handleRefreshStatus,
        handleFetchStats,
        handleSync,
        handleDisconnect,
        getStatus,
    };
};
