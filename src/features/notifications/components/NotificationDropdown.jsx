import { useState, useEffect, useRef } from "react";
import {
  Popover,
  Stack,
  Text,
  Button,
  ScrollArea,
  Divider,
  Group,
  Loader,
  Center,
} from "@mantine/core";
import { useNotifications } from "../hooks/useNotifications";
import NotificationItem from "./NotificationItem";
import NotificationIcon from "./NotificationIcon";
import PaymentPromptModal from "./PaymentPromptModal";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../../features/auth/store/selector";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";

/**
 * Notification Dropdown Component
 * Shows list of notifications with actions
 */
const NotificationDropdown = () => {
  const [opened, setOpened] = useState(false);
  const [paymentModalOpened, setPaymentModalOpened] = useState(false);
  const [paymentNotification, setPaymentNotification] = useState(null);
  const [dismissedNotificationIds, setDismissedNotificationIds] = useState(new Set());
  const scrollAreaRef = useRef(null);
  const user = useAppSelector(currentUser);
  const {
    notifications,
    unreadCount,
    loading,
    hasMore,
    total,
    markAllAsRead,
    loadMore,
    markAsRead,
  } = useNotifications();

  const [markingAll, setMarkingAll] = useState(false);

  // Check for payment-required notifications when new notifications arrive
  // Only show payment modal for BRAND users (brands need to pay, creators don't)
  useEffect(() => {
    // Only show payment modal if current user is a BRAND
    const isBrand = user?.user_type?.toUpperCase() === USERTYPES.BRAND;
    
    if (!isBrand) {
      // If user is not a brand, close the modal if it's open
      if (paymentModalOpened) {
        setPaymentModalOpened(false);
        setPaymentNotification(null);
      }
      return;
    }

    // Find the most recent unread notification that requires payment
    // Exclude notifications that have been dismissed
    console.log(notifications);
    
    const paymentRequiredNotification = notifications
      .filter(n => 
        !n.read_at && 
        n.data?.requiresPayment &&
        n.type === 'OFFER_ACCEPTED' && // Only show for OFFER_ACCEPTED notifications
        !dismissedNotificationIds.has(n.id) // Don't show dismissed notifications
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

    if (paymentRequiredNotification && !paymentModalOpened) {
      setPaymentNotification(paymentRequiredNotification);
      setPaymentModalOpened(true);
    }
  }, [notifications, paymentModalOpened, user?.user_type, dismissedNotificationIds]);

  // Load more when scrolling to bottom
  useEffect(() => {
    if (!opened || !hasMore) return; // Don't set up scroll listener if no more to load

    // Wait for the scroll area to be rendered
    const timer = setTimeout(() => {
      if (!scrollAreaRef.current) return;

      // Try multiple selectors for Mantine ScrollArea
      const scrollArea =
        scrollAreaRef.current.querySelector("[data-scrollbar-viewport]") ||
        scrollAreaRef.current.querySelector(".mantine-ScrollArea-viewport") ||
        scrollAreaRef.current.querySelector('[class*="viewport"]') ||
        scrollAreaRef.current;

      if (!scrollArea) return;

      let isLoadingMore = false; // Prevent multiple simultaneous loads
      let scrollTimeout = null; // For debouncing

      const handleScroll = () => {
        // Early exit if conditions aren't met
        if (isLoadingMore || loading || !hasMore) {
          return;
        }

        // Clear previous timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        // Debounce scroll events
        scrollTimeout = setTimeout(() => {
          const { scrollTop, scrollHeight, clientHeight } = scrollArea;
          const scrollBottom = scrollHeight - scrollTop - clientHeight;

          // Load more when within 100px of bottom
          if (scrollBottom <= 100 && !isLoadingMore && hasMore) {
            isLoadingMore = true;
            loadMore();
            // Reset flag after loading completes or timeout
            setTimeout(() => {
              isLoadingMore = false;
            }, 2000);
          }
        }, 150); // Debounce by 150ms
      };

      scrollArea.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        scrollArea.removeEventListener("scroll", handleScroll);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [opened, hasMore, loading, loadMore]);

  const handleMarkAllAsRead = async () => {
    setMarkingAll(true);
    try {
      await markAllAsRead();
    } catch (err) {
      showNotificationHelper(
        "Could not mark all as read",
        typeof err === "string" ? err : err?.message || "Please try again.",
        NOTIFICATION_TYPES.ERROR
      );
    } finally {
      setMarkingAll(false);
    }
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpened(false);
    // Mark notification as read when user closes via X button
    if (paymentNotification?.id) {
      markAsRead(paymentNotification.id);
      // Add to dismissed set to prevent immediate re-opening
      setDismissedNotificationIds(prev => new Set(prev).add(paymentNotification.id));
    }
    setPaymentNotification(null);
  };

  const handleRemindMeLater = () => {
    setPaymentModalOpened(false);
    // Don't mark as read, but add to dismissed set to prevent immediate re-opening
    // This allows the notification to reappear later when user refreshes or new notifications arrive
    if (paymentNotification?.id) {
      setDismissedNotificationIds(prev => new Set(prev).add(paymentNotification.id));
      // Clear dismissed set after 5 minutes to allow notification to reappear
      setTimeout(() => {
        setDismissedNotificationIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(paymentNotification.id);
          return newSet;
        });
      }, 5 * 60 * 1000); // 5 minutes
    }
    setPaymentNotification(null);
  };

  return (
    <>
      <PaymentPromptModal
        opened={paymentModalOpened}
        onClose={handleClosePaymentModal}
        onRemindLater={handleRemindMeLater}
        notification={paymentNotification}
      />
      <Popover
        width="min(25rem, calc(100vw - 1.5rem))"
        position="bottom"
        shadow="md"
        opened={opened}
        onChange={setOpened}
        withinPortal
      >
        <Popover.Target>
          <Button p={0} variant="none">
            <NotificationIcon onClick={() => setOpened(!opened)} />
          </Button>
        </Popover.Target>

        <Popover.Dropdown className="notification-popover">
          <Stack spacing={0} style={{ maxHeight: 500 }}>
            {/* Header */}
            <Group
              position="apart"
              p="sm"
              style={{ borderBottom: "1px solid var(--mantine-color-dark-4)" }}
            >
              <Text size="lg" weight={600}>
                Notifications
                {unreadCount > 0 && (
                  <Text component="span" size="sm" color="dimmed" ml={8}>
                    ({unreadCount} unread)
                  </Text>
                )}
              </Text>
              {unreadCount > 0 && (
                <Button
                  size="xs"
                  variant="subtle"
                  onClick={handleMarkAllAsRead}
                  loading={markingAll}
                  disabled={markingAll}
                >
                  Mark all read
                </Button>
              )}
            </Group>

            {/* Notifications List */}
            <ScrollArea.Autosize mah={400} viewportRef={scrollAreaRef}>
              {loading && notifications.length === 0 ? (
                <Center p="xl">
                  <Loader size="sm" />
                </Center>
              ) : notifications.length === 0 ? (
                <Center p="xl">
                  <Text size="sm" color="dimmed">
                    No notifications yet
                  </Text>
                </Center>
              ) : (
                <Stack spacing={0}>
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                  {loading && notifications.length > 0 && (
                    <Center p="sm">
                      <Loader size="sm" />
                    </Center>
                  )}
                  {!hasMore && notifications.length > 0 && (
                    <Center p="sm">
                      <Text size="xs" color="dimmed">
                        No more notifications ({notifications.length} of {total}
                        )
                      </Text>
                    </Center>
                  )}
                </Stack>
              )}
            </ScrollArea.Autosize>

            {/* Footer */}
            {notifications.length > 0 && (
              <>
                <Divider />
                <Group position="center" p="xs">
                  <Button
                    size="xs"
                    variant="subtle"
                    onClick={() => setOpened(false)}
                  >
                    Close
                  </Button>
                </Group>
              </>
            )}
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </>
  );
};

export default NotificationDropdown;
