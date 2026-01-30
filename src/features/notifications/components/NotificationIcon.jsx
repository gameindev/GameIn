import { Badge, UnstyledButton } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';
import { useAppSelector } from '../../../app/store/hooks';

/**
 * Notification Icon Component
 * Displays bell icon with unread count badge
 */
const NotificationIcon = ({ onClick, className = '' }) => {
    const unreadCount = useAppSelector((state) => state.notifications?.unreadCount || 0);

    return (
        <div
            onClick={onClick}
            className={className}
            style={{
                position: 'relative',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                transition: 'background-color 0.2s',
            }}
        >
            <IconBell size={24} stroke={1.5} />
            {unreadCount > 0 && (
                <Badge
                    size="sm"
                    color="red"
                    variant="filled"
                    style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        minWidth: 18,
                        height: 18,
                        padding: '0 4px',
                        fontSize: '10px',
                        fontWeight: 600,
                        borderRadius: '9px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {unreadCount > 99 ? '99+' : unreadCount}
                </Badge>
            )}
        </div>
    );
};

export default NotificationIcon;

