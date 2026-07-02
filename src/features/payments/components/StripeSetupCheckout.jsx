import { useEffect, useState } from "react";
import { Box, Button, Text } from "@mantine/core";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#ffffff",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

const SetupForm = ({
    clientSecret,
    onSuccess,
    onError,
    CardElement,
    useStripe,
    useElements,
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError(null);

        try {
            const cardElement = elements.getElement(CardElement);
            const { error: stripeError, setupIntent } = await stripe.confirmCardSetup(
                clientSecret,
                {
                    payment_method: { card: cardElement },
                }
            );

            if (stripeError) {
                setError(stripeError.message);
                showNotificationHelper(
                    "Card setup failed",
                    stripeError.message || "Could not save card.",
                    NOTIFICATION_TYPES.ERROR
                );
                onError?.(stripeError);
            } else if (setupIntent?.status === "succeeded") {
                showNotificationHelper(
                    "Payment method saved",
                    "Your card has been added successfully.",
                    NOTIFICATION_TYPES.SUCCESS
                );
                onSuccess?.(setupIntent);
            }
        } catch (err) {
            const message = err.message || "An unexpected error occurred.";
            setError(message);
            showNotificationHelper("Setup error", message, NOTIFICATION_TYPES.ERROR);
            onError?.(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box mb="md">
                <CardElement options={CARD_ELEMENT_OPTIONS} />
                {error ? (
                    <Text c="red" size="sm" mt="xs">
                        {error}
                    </Text>
                ) : null}
            </Box>
            <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={!stripe || loading}
            >
                {loading ? "Saving..." : "Save card"}
            </Button>
        </form>
    );
};

export default function StripeSetupCheckout({ clientSecret, onSuccess, onError }) {
    const [stripe, setStripe] = useState(null);
    const [modules, setModules] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";
            if (!publishableKey) {
                setError("Stripe is not configured (missing VITE_STRIPE_PUBLISHABLE_KEY).");
                setLoading(false);
                return;
            }

            try {
                const [stripeJs, reactStripe] = await Promise.all([
                    import("@stripe/stripe-js"),
                    import("@stripe/react-stripe-js"),
                ]);
                const stripeInstance = await stripeJs.loadStripe(publishableKey);
                setStripe(stripeInstance);
                setModules(reactStripe);
            } catch {
                setError("Failed to load Stripe. Install @stripe/stripe-js and @stripe/react-stripe-js.");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <Box p="md">
                <Text size="sm">Loading card form...</Text>
            </Box>
        );
    }

    if (error || !modules || !stripe) {
        return (
            <Box p="md">
                <Text c="red" size="sm">
                    {error || "Stripe could not be loaded."}
                </Text>
            </Box>
        );
    }

    if (!clientSecret) {
        return (
            <Box p="md">
                <Text c="red" size="sm">
                    Could not start card setup. Please try again.
                </Text>
            </Box>
        );
    }

    const { Elements, CardElement, useStripe, useElements } = modules;

    return (
        <Elements stripe={stripe}>
            <SetupForm
                clientSecret={clientSecret}
                onSuccess={onSuccess}
                onError={onError}
                CardElement={CardElement}
                useStripe={useStripe}
                useElements={useElements}
            />
        </Elements>
    );
}
