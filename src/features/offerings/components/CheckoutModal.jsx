import { Box, Button, Divider, Flex, Group, Modal, Text, Textarea } from "@mantine/core";
import { IconCreditCard } from "@tabler/icons-react";
import { theme } from "../../../shared/styles/theme/customTheme";
import FormField from "../../../shared/components/FormField";
import StripeCheckout from "../../payments/components/StripeCheckout";
import RazorpayCheckout from "../../payments/components/RazorpayCheckout";
import { PaymentProvider } from "../../../shared/enums/paymentProviderEnum";


const CheckoutModal = ({
    opened,
    onClose,
    offerings,
    control,
    onProceedPayment,
    loading = false,
    paymentData = null, // Contains clientSecret, razorpayOrderId, etc.
}) => {
    const paymentProvider = offerings?.data?.offering_price?.payment_provider || PaymentProvider.STRIPE;
    const showPaymentForm = paymentData && (paymentData.clientSecret || paymentData.razorpayOrderId);

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Group>
                    <IconCreditCard size={22} color={theme.colors.primary[0]} />
                    <Text fw={600} fz="lg">
                        Checkout Summary
                    </Text>
                </Group>
            }
            centered
            size="lg"
            overlayProps={{ backgroundOpacity: 0.55, blur: 4 }}
            radius="lg"
            padding="xl"
        >
            <Box>
                {/* Item Section */}
                <Box mb="md">
                    <Text fw={600} mb="xs">
                        Sponsorship Items
                    </Text>
                    <Box
                        p="md"
                        style={{
                            border: "1px solid #e0e0e0",
                            borderRadius: "10px",
                            backgroundColor: theme.colors.grey[0],
                        }}
                    >
                        <Flex justify="space-between" align="center">
                            <Box>
                                <Text fw={500}>
                                    {offerings?.data?.title || "Sponsorship Opportunity"}
                                </Text>
                                <Text fz="sm" c="dimmed">
                                    {offerings?.data?.user?.username || "Brand Name"}
                                </Text>
                            </Box>
                            <Text fw={700} c={theme.colors.primary[0]}>
                                ${offerings?.data?.offering_price?.price || "0.00"}
                            </Text>
                        </Flex>
                    </Box>
                </Box>

                <Divider my="md" />

                {/* Note Field */}
                <FormField
                    name="checkoutNote"
                    control={control}
                    Component={Textarea}
                    componentProps={{
                        label: "Add a note (optional)",
                        placeholder: "Write your message here...",
                        autosize: true,
                        minRows: 3,
                        maxRows: 6,
                    }}
                />

                <Divider my="md" />

                {/* Summary */}
                <Box mb="lg">
                    <Flex justify="space-between" mb="xs">
                        <Text c="dimmed">Subtotal</Text>
                        <Text>$ {parseFloat(offerings?.data?.offering_price?.price || 0).toFixed(2)}</Text>
                    </Flex>
                    <Flex justify="space-between" mb="xs">
                        <Text c="dimmed">Platform fee</Text>
                        <Text>$ {parseFloat(offerings?.data?.offering_price?.platform_fee || 0).toFixed(2)}</Text>
                    </Flex>
                    <Flex justify="space-between" mb="xs">
                        <Text c="dimmed">Tax</Text>
                        <Text>$ {parseFloat(offerings?.data?.offering_price?.tax || 0).toFixed(2)}</Text>
                    </Flex>
                    <Flex justify="space-between" mt="md" pt="md" style={{ borderTop: "1px solid #e0e0e0" }}>
                        <Text fw={600} fz="lg">Total</Text>
                        <Text fw={700} fz="lg" c={theme.colors.primary[0]}>
                            $ {parseFloat(offerings?.data?.offering_price?.total || 0).toFixed(2)}
                        </Text>
                    </Flex>
                </Box>

                {/* Payment Form */}
                {showPaymentForm && (
                    <>
                        <Divider my="md" />
                        <Box mb="lg">
                            <Text fw={600} mb="md">
                                Payment Details
                            </Text>
                            {paymentProvider === PaymentProvider.STRIPE && paymentData?.clientSecret && (
                                <StripeCheckout
                                    clientSecret={paymentData.clientSecret}
                                    paymentIntentId={paymentData.paymentIntent?.id}
                                    onSuccess={(paymentIntent) => {
                                        // Handle successful payment
                                        if (paymentIntent?.id && paymentData.paymentIntent?.id) {
                                            // Verify payment on backend
                                            onProceedPayment({
                                                action: "verify",
                                                paymentIntentId: paymentData.paymentIntent.id,
                                                providerPaymentId: paymentIntent.id,
                                            });
                                        }
                                    }}
                                    onError={(error) => {
                                        console.error("Stripe payment error:", error);
                                    }}
                                />
                            )}
                            {paymentProvider === PaymentProvider.RAZORPAY && paymentData?.razorpayOrderId && (
                                <RazorpayCheckout
                                    razorpayOrderId={paymentData.razorpayOrderId}
                                    amount={parseFloat(offerings?.data?.offering_price?.total || 0)}
                                    currency={offerings?.data?.offering_price?.currency || "USD"}
                                    customerName={offerings?.data?.user?.username || ""}
                                    customerEmail={offerings?.data?.user?.email || ""}
                                    onSuccess={(response) => {
                                        // Handle successful payment
                                        if (response?.razorpay_payment_id && paymentData.paymentIntent?.id) {
                                            // Verify payment on backend
                                            onProceedPayment({
                                                action: "verify",
                                                paymentIntentId: paymentData.paymentIntent.id,
                                                providerPaymentId: response.razorpay_payment_id,
                                            });
                                        }
                                    }}
                                    onError={(error) => {
                                        console.error("Razorpay payment error:", error);
                                    }}
                                />
                            )}
                        </Box>
                    </>
                )}
 
                {/* Buttons */}
                <Group justify="flex-end" mt="xl">
                    <Button variant="default" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    {!showPaymentForm && (
                        <Button variant="primary" onClick={onProceedPayment} loading={loading}>
                            Proceed Payment
                        </Button>
                    )}
                </Group>
            </Box>
        </Modal>
    );
};

export default CheckoutModal;
