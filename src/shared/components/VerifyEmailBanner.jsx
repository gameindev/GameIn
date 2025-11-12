import { Alert, Button, Card, Group, Space, Text } from "@mantine/core";
import { IconInfoTriangle } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { currentUser, isLoggedIn } from "../../features/auth/store/selector";
import { useNavigate } from "react-router";
import routePaths from "../../app/router/routes";
import { showNotificationHelper } from "../utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../enums/notificationTypesEnum";
import useApi from "../hooks/useApi";
import { refreshUser } from "../../features/auth/store/thunks/userThunks";

const VerifyEmailBanner = () => {
  const navigate = useNavigate();
  const loggedIn = useAppSelector(isLoggedIn);
  const user = useAppSelector(currentUser);
  const [navigating, setNavigating] = useState(false);
  const { post } = useApi();
  const dispatch = useAppDispatch();

  const showBanner = useMemo(() => {
    if (!loggedIn || !user) return false;

    return user?.email && !user?.is_verified;
  }, [loggedIn, user]);

  if (!showBanner) return null;

  const handleVerify = async () => {
    try {
      // setSent(true);
      // setNavigating(true);
      // navigate(routePaths.SETTINGS.ACCOUNT);
      const response = await post({
        url: `/user-verification/resend-verification-email?email=${user?.email}`,
      });
      await dispatch(refreshUser()).unwrap();
      showNotificationHelper(
        "Verification email sent",
        "Check your inbox and follow the link to verify your account.",
        NOTIFICATION_TYPES.SUCCESS
      );
    } catch (err) {
      showNotificationHelper(
        "Could not send verification email",
        (typeof err === "string" ? err : err?.message) ||
          "Redirecting to Account settings to verify.",
        NOTIFICATION_TYPES.WARNING
      );
      navigate(routePaths.SETTINGS.ACCOUNT);
    }
  };

  const handleGoToSettings = () => navigate(routePaths.SETTINGS.ACCOUNT);

  return (
    <>
      <Card radius="md" withBorder p={10}>
        <Alert
          color="yellow"
          variant="light"
          icon={<IconInfoTriangle size={20} />}
        >
          <Group justify="space-between" align="center" wrap="nowrap">
            <div>
              <Text mb={8} fw={600} c="textWhite">
                Account Verification Required
              </Text>
              <Text size="sm" c="textWhite">
                Email sending and some features are disabled until you verify
                your email address ({user?.email}).
              </Text>
            </div>
            <Group gap="sm" wrap="nowrap">
              <Button
                variant="primary"
                size="sm"
                onClick={handleVerify}
                loading={navigating}
              >
                Verify Now
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleGoToSettings}
              >
                Account Settings
              </Button>
            </Group>
          </Group>
        </Alert>
      </Card>
      <Space h="md" />
    </>
  );
};

export default VerifyEmailBanner;
