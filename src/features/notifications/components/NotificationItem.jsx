import { Group, Text, Stack, ActionIcon, Badge, Box, Button } from '@mantine/core';
import { IconX, IconCheck } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router';
import { useNotifications } from '../hooks/useNotifications';

dayjs.extend(relativeTime);

/**
 * Individual Notification Item Component
 */
const NotificationItem = ({ notification }) => {
    const { markAsRead, deleteNotification } = useNotifications(false);
    const navigate = useNavigate();

    const isRatingRequest =
        notification.type === 'CREATOR_RATING_REQUEST' ||
        String(notification.type || '').toUpperCase() === 'CREATOR_RATING_REQUEST';

    const isUnread = !notification.read_at;
    const timeAgo = notification.created_at 
        ? dayjs(notification.created_at).fromNow()
        : '';

    const handleMarkAsRead = (e) => {
        e.stopPropagation();
        if (isUnread) {
            markAsRead(notification.id);
        }
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        deleteNotification(notification.id);
    };

    return (
        <Box
            p="sm"
            sx={(theme) => ({
                backgroundColor: isUnread ? theme.colors.dark[7] : 'transparent',
                borderLeft: isUnread ? `3px solid ${theme.colors.blue[6]}` : '3px solid transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                    backgroundColor: theme.colors.dark[6],
                },
            })}
            onClick={handleMarkAsRead}
        >
            <Group position="apart" noWrap>
                <Stack spacing={4} style={{ flex: 1, minWidth: 0 }}>
                    <Group spacing={8} noWrap>
                        <Text size="sm" weight={isUnread ? 600 : 400} lineClamp={1}>
                            {notification.title}
                        </Text>
                        {isUnread && (
                            <Badge size="xs" color="blue" variant="dot" />
                        )}
                    </Group>
                    <Text size="xs" color="dimmed" lineClamp={2}>
                        {notification.message}
                    </Text>
                    {isRatingRequest && notification.data?.orderId && (
                        <Button
                            size="xs"
                            variant="light"
                            mt={6}
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/feedback?orderId=${notification.data.orderId}`);
                                if (isUnread) {
                                    markAsRead(notification.id);
                                }
                            }}
                        >
                            Rate creator
                        </Button>
                    )}
                    {timeAgo && (
                        <Text size="xs" color="dimmed">
                            {timeAgo}
                        </Text>
                    )}
                </Stack>
                <Group spacing={4} noWrap>
                    {isUnread && (
                        <ActionIcon
                            size="sm"
                            variant="subtle"
                            color="blue"
                            onClick={handleMarkAsRead}
                        >
                            <IconCheck size={16} />
                        </ActionIcon>
                    )}
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="red"
                        onClick={handleDelete}
                    >
                        <IconX size={16} />
                    </ActionIcon>
                </Group>
            </Group>
        </Box>
    );
};

export default NotificationItem;

