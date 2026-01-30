import { useEffect, useState } from "react";
import { Box, Button, Flex, Group, Paper, Text, Title } from "@mantine/core";
import { IconCheck, IconCircleCheck } from "@tabler/icons-react";
import { theme } from "../../../shared/styles/theme/customTheme";
import usePayment from "../hooks/usePayment";
import paymentService from "../services/payment.service";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";
import Preloader from "../../../shared/components/Preloader";
import { useNavigate, useSearchParams } from "react-router";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const paymentIntentId = searchParams.get("paymentIntentId");
    const providerPaymentId = searchParams.get("paymentId");
    const [loading, setLoading] = useState(!!paymentIntentId);
    const [paymentData, setPaymentData] = useState(null);
    const { verifyPayment } = usePayment();

    useEffect(() => {
        const verifyPaymentStatus = async () => {
            if (!paymentIntentId) {
                // If no paymentIntentId, check if we have payment data from URL
                if (providerPaymentId) {
                    // For direct payment verification (e.g., from PayPal callback)
                    setLoading(false);
                    return;
                }
                setLoading(false);
                return;
            }

            try {
                // Get payment intent details
                const intentData = await paymentService.getPaymentIntent(parseInt(paymentIntentId));
                
                if (intentData?.provider_intent_id && providerPaymentId) {
                    // Verify payment
                    await verifyPayment(parseInt(paymentIntentId), providerPaymentId);
                }

                setPaymentData(intentData);
            } catch (error) {
                console.error("Error verifying payment:", error);
                showNotificationHelper(
                    "Payment Verification Error",
                    "Unable to verify payment status. Please contact support.",
                    NOTIFICATION_TYPES.ERROR
                );
            } finally {
                setLoading(false);
            }
        };

        verifyPaymentStatus();
    }, [paymentIntentId, providerPaymentId, verifyPayment]);

    if (loading) {
        return <Preloader />;
    }

    return (
        <Box
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                backgroundColor: theme.colors.grey[0],
            }}
        >
            <Paper
                p="xl"
                radius="lg"
                shadow="md"
                style={{ maxWidth: 500, width: "100%" }}
            >
                <Flex direction="column" align="center" gap="md">
                    <Box
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            backgroundColor: theme.colors.success?.[0] || "#4CAF50",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <IconCircleCheck size={50} color="white" />
                    </Box>

                    <Title order={2} ta="center">
                        Payment Successful!
                    </Title>

                    <Text c="dimmed" ta="center" size="sm">
                        Your payment has been processed successfully.
                    </Text>

                    {paymentData && (
                        <Box w="100%" mt="md">
                            <Group justify="space-between" mb="xs">
                                <Text c="dimmed">Payment Intent ID:</Text>
                                <Text fw={500}>#{paymentData.id}</Text>
                            </Group>
                            {paymentData.invoice && (
                                <Group justify="space-between" mb="xs">
                                    <Text c="dimmed">Invoice:</Text>
                                    <Text fw={500}>#{paymentData.invoice.id}</Text>
                                </Group>
                            )}
                            <Group justify="space-between" mb="xs">
                                <Text c="dimmed">Amount:</Text>
                                <Text fw={500}>
                                    ${parseFloat(paymentData.amount || 0).toFixed(2)}{" "}
                                    {paymentData.currency?.toUpperCase() || "USD"}
                                </Text>
                            </Group>
                        </Box>
                    )}

                    <Flex gap="md" mt="xl" w="100%">
                        <Button
                            variant="default"
                            onClick={() => navigate("/dashboard")}
                            style={{ flex: 1 }}
                        >
                            Go to Dashboard
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => navigate("/stats")}
                            style={{ flex: 1 }}
                        >
                            View Sponsorships
                        </Button>
                    </Flex>
                </Flex>
            </Paper>
        </Box>
    );
};

export default PaymentSuccess;

