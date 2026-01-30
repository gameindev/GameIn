import { Modal, Button, Text, Group, Stack, Box, Divider, Alert } from '@mantine/core';
import { IconCreditCard, IconInfoCircle, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { theme } from '../../../shared/styles/theme/customTheme';
import routePaths from '../../../app/router/routes';
import { useAppSelector } from '../../../app/store/hooks';
import { currentUser } from '../../../features/auth/store/selector';

/**
 * Payment Prompt Modal
 * Shows when an offering is accepted and prompts brand to make payment
 */
const PaymentPromptModal = ({ opened, onClose, onRemindLater, notification }) => {
  const navigate = useNavigate();
  const user = useAppSelector(currentUser);

  if (!notification || !notification.data) {
    return null;
  }

  const { offeringId, offeringTitle, creatorName, price, currency } = notification.data;
  const username = user?.username || user?.email?.split('@')[0] || '';

  const handleProceedToPayment = () => {
    onClose();
    // Navigate to the offering edit page where payment can be made
    if (offeringId && username) {
      // Use the TPP (Third Person Profile) route format
      navigate(`/${username}/offerings/${offeringId}/edit-offering`);
    } else if (offeringId) {
      // Fallback to FPP route
      navigate(`/offerings/${offeringId}/edit-offering`);
    }
  };

  const handleViewOffering = () => {
    onClose();
    if (offeringId && username) {
      navigate(`/${username}/offerings`);
    } else if (offeringId) {
      navigate(routePaths.ACCOUNTS.OFFERINGS.ROOT);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group spacing="sm">
          <IconCreditCard size={24} color={theme.colors.primary[0]} />
          <Text fw={600} fz="lg">
            Payment Required
          </Text>
        </Group>
      }
      centered
      size="md"
      overlayProps={{ backgroundOpacity: 0.55, blur: 4 }}
      radius="lg"
      padding="xl"
      closeButtonProps={{ icon: <IconX size={18} /> }}
      closeOnClickOutside={true}
      closeOnEscape={true}
      withCloseButton={true}
    >
      <Stack spacing="md">
        <Alert
          icon={<IconInfoCircle size={16} />}
          title="Offering Accepted!"
          color="green"
          variant="light"
        >
          <Text size="sm">
            You have accepted {creatorName}'s offering. Please proceed with payment to complete the sponsorship.
          </Text>
        </Alert>

        <Box
          p="md"
          style={{
            border: `1px solid ${theme.colors.grey[1]}`,
            borderRadius: '8px',
            backgroundColor: theme.colors.grey[0],
          }}
        >
          <Stack spacing="xs">
            <Text fw={500} size="sm" color="dimmed">
              Offering Details
            </Text>
            <Text fw={600} size="lg">
              {offeringTitle || 'Your Offering'}
            </Text>
            <Divider />
            <Group position="apart">
              <Text size="sm" color="dimmed">
                Amount Due
              </Text>
              <Text fw={700} size="xl" c={theme.colors.primary[0]}>
                {currency} {price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
              </Text>
            </Group>
          </Stack>
        </Box>

        <Text size="sm" color="dimmed">
          Complete your payment to finalize the sponsorship. You can also view the offering details and make payment later.
        </Text>

        <Group position="right" spacing="sm" mt="md">
          <Button 
            variant="default" 
            onClick={() => {
              if (onRemindLater) {
                onRemindLater();
              } else {
                onClose();
              }
            }}
          >
            Remind Me Later
          </Button>
          <Button variant="subtle" onClick={handleViewOffering}>
            View Offering
          </Button>
          <Button
            variant="primary"
            onClick={handleProceedToPayment}
            leftSection={<IconCreditCard size={18} />}
          >
            Proceed to Payment
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default PaymentPromptModal;
