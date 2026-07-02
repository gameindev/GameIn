import { Button, Group, Modal, NumberInput, Radio, Stack, Text } from "@mantine/core";
import { IconCreditCard } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import StripeCheckout from "../../../payments/components/StripeCheckout";

const NEW_CARD_VALUE = "__new_card__";

function formatCardLabel(method) {
    const brand = method.card?.brand ?? "Card";
    const last4 = method.card?.last4 ?? "????";
    return `${brand} •••• ${last4}`;
}

export default function TopUpModal({
    opened,
    onClose,
    onTopUp,
    onConfirmTopUp,
    topUpData,
    onComplete,
    paymentMethods = [],
}) {
    const [amount, setAmount] = useState(100);
    const [step, setStep] = useState("amount");
    const [loading, setLoading] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(NEW_CARD_VALUE);
    const [activePaymentMethodId, setActivePaymentMethodId] = useState(null);

    useEffect(() => {
        if (opened && paymentMethods.length > 0) {
            setSelectedMethod(paymentMethods[0].id);
        } else if (opened) {
            setSelectedMethod(NEW_CARD_VALUE);
        }
    }, [opened, paymentMethods]);

    const resetAndClose = () => {
        setStep("amount");
        setSelectedMethod(paymentMethods[0]?.id ?? NEW_CARD_VALUE);
        setActivePaymentMethodId(null);
        onClose();
    };

    const handleStartTopUp = async () => {
        setLoading(true);
        try {
            const useSavedCard = selectedMethod !== NEW_CARD_VALUE;
            const paymentMethodId = useSavedCard ? selectedMethod : undefined;
            const data = await onTopUp(amount, paymentMethodId);
            if (data?.clientSecret) {
                setActivePaymentMethodId(useSavedCard ? selectedMethod : null);
                setStep("payment");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleContinueFromAmount = () => {
        if (paymentMethods.length > 0) {
            setStep("method");
            return;
        }
        handleStartTopUp();
    };

    const handlePaymentSuccess = async (paymentIntent) => {
        if (!topUpData?.walletId || !paymentIntent?.id) {
            await onComplete?.();
            resetAndClose();
            return;
        }

        setConfirming(true);
        try {
            await onConfirmTopUp?.(paymentIntent.id, topUpData.walletId);
            await onComplete?.();
            resetAndClose();
        } finally {
            setConfirming(false);
        }
    };

    const selectedSavedMethod = paymentMethods.find((method) => method.id === activePaymentMethodId);

    return (
        <Modal opened={opened} onClose={resetAndClose} title="Add funds to wallet" centered>
            {step === "amount" ? (
                <>
                    <NumberInput
                        label="Amount (USD)"
                        value={amount}
                        onChange={setAmount}
                        min={10}
                        step={10}
                        mb="lg"
                    />
                    <Group justify="flex-end">
                        <Button variant="default" onClick={resetAndClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" loading={loading} onClick={handleContinueFromAmount}>
                            Continue
                        </Button>
                    </Group>
                </>
            ) : null}

            {step === "method" ? (
                <>
                    <Text mb="md" size="sm" c="dimmed">
                        Choose how to pay ${amount}.
                    </Text>
                    <Radio.Group value={selectedMethod} onChange={setSelectedMethod}>
                        <Stack gap="sm">
                            {paymentMethods.map((method) => (
                                <Radio
                                    key={method.id}
                                    value={method.id}
                                    label={
                                        <Group gap="xs">
                                            <IconCreditCard size={16} />
                                            <Text size="sm">{formatCardLabel(method)}</Text>
                                        </Group>
                                    }
                                />
                            ))}
                            <Radio value={NEW_CARD_VALUE} label="Use a different card" />
                        </Stack>
                    </Radio.Group>
                    <Group justify="space-between" mt="lg">
                        <Button variant="default" onClick={() => setStep("amount")}>
                            Back
                        </Button>
                        <Button variant="primary" loading={loading} onClick={handleStartTopUp}>
                            Continue
                        </Button>
                    </Group>
                </>
            ) : null}

            {step === "payment" ? (
                <>
                    <Text mb="md" size="sm" c="dimmed">
                        {confirming
                            ? "Updating your wallet balance..."
                            : activePaymentMethodId
                              ? `Confirm payment of $${amount} with your saved card.`
                              : `Complete payment to add $${amount} to your wallet.`}
                    </Text>
                    {topUpData?.clientSecret && !confirming ? (
                        <StripeCheckout
                            clientSecret={topUpData.clientSecret}
                            savedPaymentMethodId={activePaymentMethodId}
                            savedCardLabel={
                                selectedSavedMethod ? formatCardLabel(selectedSavedMethod) : undefined
                            }
                            onSuccess={handlePaymentSuccess}
                            onError={(err) => console.error(err)}
                        />
                    ) : null}
                </>
            ) : null}
        </Modal>
    );
}
