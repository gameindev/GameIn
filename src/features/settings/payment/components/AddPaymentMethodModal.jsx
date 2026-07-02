import { Modal, Text, Loader, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import StripeSetupCheckout from "../../../payments/components/StripeSetupCheckout";
import { getApiErrorMessage, showNotificationHelper } from "../../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../../shared/enums/notificationTypesEnum";

export default function AddPaymentMethodModal({
    opened,
    onClose,
    onCreateSetupIntent,
    onComplete,
}) {
    const [setupData, setSetupData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!opened) {
            setSetupData(null);
            return;
        }

        let cancelled = false;
        (async () => {
            setLoading(true);
            setSetupData(null);
            try {
                const data = await onCreateSetupIntent();
                if (!cancelled) {
                    setSetupData(data);
                }
            } catch (err) {
                if (!cancelled) {
                    showNotificationHelper(
                        "Setup failed",
                        getApiErrorMessage(err, "Could not start payment method setup"),
                        NOTIFICATION_TYPES.ERROR
                    );
                    onClose();
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [opened, onCreateSetupIntent]);

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Add payment method"
            centered
            size="md"
        >
            <Text size="sm" c="dimmed" mb="md">
                Save a card for wallet top-ups and sponsorship payments.
            </Text>

            {loading ? (
                <Flex justify="center" py="xl">
                    <Loader color="primary" size="sm" />
                </Flex>
            ) : (
                <StripeSetupCheckout
                    clientSecret={setupData?.clientSecret}
                    onSuccess={() => {
                        onComplete?.();
                        onClose();
                    }}
                />
            )}
        </Modal>
    );
}
