import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Modal,
  Radio,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { IconCreditCard, IconWallet } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { theme } from "../../../shared/styles/theme/customTheme";
import FormField from "../../../shared/components/FormField";
import StripeCheckout from "../../payments/components/StripeCheckout";
import RazorpayCheckout from "../../payments/components/RazorpayCheckout";
import { PaymentProvider } from "../../../shared/enums/paymentProviderEnum";
import { calculatePriceBreakdown } from "../../../shared/utils/helpers/opportunityForm.helper";
import { offeringService } from "../services";
import walletService from "../../settings/payment/services/wallet.service";

const CheckoutModal = ({
  opened,
  onClose,
  offerings,
  control,
  onProceedPayment,
  loading = false,
  paymentData = null,
  isBrand = false,
}) => {
  const latestPrice = offeringService.getLatestPrice(offerings?.data?.offering_prices);

  const paymentProvider =
    latestPrice?.payment_provider || PaymentProvider.STRIPE;
  const showPaymentForm =
    paymentData && (paymentData.clientSecret || paymentData.razorpayOrderId);
  const { tax } = calculatePriceBreakdown(latestPrice?.price);
  const total = parseFloat(latestPrice?.total || latestPrice?.tax || 0);

  const [payMethod, setPayMethod] = useState("card");
  const [walletBalance, setWalletBalance] = useState(null);

  useEffect(() => {
    if (!opened || !isBrand) return;
    walletService.getMyWallet().then((data) => {
      setWalletBalance(data?.balances?.available ?? 0);
    }).catch(() => setWalletBalance(0));
  }, [opened, isBrand]);

  const canPayFromWallet = isBrand && walletBalance != null && walletBalance >= total;

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
                ${latestPrice?.price || "0.00"}
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
            disabled: false
          }}
        />

        <Divider my="md" />

        {/* Summary */}
        <Box mb="lg">
          <Flex justify="space-between" mb="xs">
            <Text c="dimmed">Subtotal</Text>
            <Text>
              ${" "}
              {parseFloat(latestPrice?.price || 0).toFixed(
                2
              )}
            </Text>
          </Flex>
          <Flex justify="space-between" mb="xs">
            <Text c="dimmed">Platform fee</Text>
            <Text>
              ${" "}
              {parseFloat(
                latestPrice?.platform_fee || 0
              ).toFixed(2)}
            </Text>
          </Flex>
          <Flex justify="space-between" mb="xs">
            <Text c="dimmed">Tax</Text>
            <Text>
              ${" "}
              {
                calculatePriceBreakdown(latestPrice?.price)
                  ?.tax
              }
            </Text>
          </Flex>
          <Flex
            justify="space-between"
            mt="md"
            pt="md"
            style={{ borderTop: "1px solid #e0e0e0" }}
          >
            <Text fw={600} fz="lg">
              Total
            </Text>
            <Text fw={700} fz="lg" c={theme.colors.primary[0]}>
              ${" "}
              {parseFloat(latestPrice?.tax || 0).toFixed(
                2
              )}
            </Text>
          </Flex>
        </Box>

        {isBrand && !showPaymentForm ? (
          <>
            <Divider my="md" />
            <Text fw={600} mb="sm">
              Payment method
            </Text>
            <Radio.Group value={payMethod} onChange={setPayMethod}>
              <Stack gap="xs">
                <Radio
                  value="card"
                  label={
                    <Flex align="center" gap="xs">
                      <IconCreditCard size={16} />
                      <Text size="sm">Pay with card</Text>
                    </Flex>
                  }
                />
                <Radio
                  value="wallet"
                  disabled={!canPayFromWallet}
                  label={
                    <Flex align="center" gap="xs">
                      <IconWallet size={16} />
                      <Text size="sm">
                        Pay from wallet
                        {walletBalance != null
                          ? ` ($${walletBalance.toFixed(2)} available)`
                          : ""}
                      </Text>
                    </Flex>
                  }
                />
              </Stack>
            </Radio.Group>
          </>
        ) : null}

        {/* Payment Form */}
        {showPaymentForm && (
          <>
            <Divider my="md" />
            <Box mb="lg">
              <Text fw={600} mb="md">
                Payment Details
              </Text>
              {paymentProvider === PaymentProvider.STRIPE &&
                paymentData?.clientSecret && (
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
              {paymentProvider === PaymentProvider.RAZORPAY &&
                paymentData?.razorpayOrderId && (
                  <RazorpayCheckout
                    razorpayOrderId={paymentData.razorpayOrderId}
                    amount={parseFloat(
                      latestPrice?.total || 0
                    )}
                    currency={
                      latestPrice?.currency || "USD"
                    }
                    customerName={offerings?.data?.user?.username || ""}
                    customerEmail={offerings?.data?.user?.email || ""}
                    onSuccess={(response) => {
                      // Handle successful payment
                      if (
                        response?.razorpay_payment_id &&
                        paymentData.paymentIntent?.id
                      ) {
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
            <Button
              variant="primary"
              onClick={() => onProceedPayment({ payMethod })}
              loading={loading}
            >
              {payMethod === "wallet" ? "Pay from Wallet" : "Proceed Payment"}
            </Button>
          )}
        </Group>
      </Box>
    </Modal>
  );
};

export default CheckoutModal;
