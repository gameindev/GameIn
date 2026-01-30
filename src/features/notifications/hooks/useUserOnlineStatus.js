import { useAppSelector } from '../../../app/store/hooks';
import { selectIsUserOnline } from '../store/onlineUsersSlice';

/**
 * Hook to check if a specific user is online
 * @param {number} userId - User ID to check
 * @returns {boolean} - True if user is online
 */
export const useUserOnlineStatus = (userId) => {
    const isOnline = useAppSelector((state) => selectIsUserOnline(state, userId));
    return isOnline;
};

