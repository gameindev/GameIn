import { useEffect, useState } from "react";
import { Box, Button, Text } from "@mantine/core";
import { theme } from "../../../shared/styles/theme/customTheme";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";

// Note: Install Stripe packages: npm install @stripe/stripe-js @stripe/react-stripe-js
// The component will show an error message if packages are not installed

const getStripePublishableKey = () => {
    return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";
};

// Initialize Stripe (lazy load - only when component needs it)
const initializeStripe = async () => {
    const publishableKey = getStripePublishableKey();
    if (!publishableKey) {
        return null;
    }

    try {
        // Dynamic import with error handling
        const stripeModule = await import("@stripe/stripe-js").catch(() => null);
        if (!stripeModule) {
            return null;
        }
        return await stripeModule.loadStripe(publishableKey);
    } catch (error) {
        console.error("Failed to load Stripe:", error);
        return null;
    }
};

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

const CheckoutForm = ({
    clientSecret,
    paymentIntentId,
    savedPaymentMethodId,
    savedCardLabel,
    onSuccess,
    onError,
    stripe,
    Elements,
    CardElement,
    useStripe,
    useElements,
}) => {
    const stripeHook = useStripe ? useStripe() : null;
    const elements = useElements ? useElements() : null;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!useStripe || !useElements || !Elements || !CardElement) {
        return (
            <Box p="md">
                <Text c="red" size="sm">
                    Stripe packages not installed. Please run: npm install @stripe/stripe-js @stripe/react-stripe-js
                </Text>
            </Box>
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripeHook) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            let stripeError;
            let paymentIntent;

            if (savedPaymentMethodId) {
                ({ error: stripeError, paymentIntent } = await stripeHook.confirmCardPayment(clientSecret, {
                    payment_method: savedPaymentMethodId,
                }));
            } else {
                if (!elements) {
                    return;
                }

                const cardElement = elements.getElement(CardElement);
                ({ error: stripeError, paymentIntent } = await stripeHook.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                    },
                }));
            }

            if (stripeError) {
                setError(stripeError.message);
                showNotificationHelper(
                    "Payment Failed",
                    stripeError.message || "An error occurred during payment.",
                    NOTIFICATION_TYPES.ERROR
                );
                onError?.(stripeError);
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                showNotificationHelper(
                    "Payment Successful",
                    "Your payment has been processed successfully.",
                    NOTIFICATION_TYPES.SUCCESS
                );
                onSuccess?.(paymentIntent);
            }
        } catch (err) {
            const errorMessage = err.message || "An unexpected error occurred.";
            setError(errorMessage);
            showNotificationHelper("Payment Error", errorMessage, NOTIFICATION_TYPES.ERROR);
            onError?.(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {savedPaymentMethodId ? (
                <Box mb="md" p="sm" style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}>
                    <Text size="sm" fw={500}>
                        {savedCardLabel || "Saved card"}
                    </Text>
                </Box>
            ) : (
                <Box mb="md">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </Box>
            )}
            {error && (
                <Text c="red" size="sm" mt="xs" mb="md">
                    {error}
                </Text>
            )}
            <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={!stripeHook || loading}
            >
                {loading ? "Processing..." : savedPaymentMethodId ? "Pay with saved card" : "Pay Now"}
            </Button>
        </form>
    );
};

const StripeCheckout = ({ clientSecret, paymentIntentId, savedPaymentMethodId, savedCardLabel, onSuccess, onError }) => {
    const [stripe, setStripe] = useState(null);
    const [stripeModules, setStripeModules] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadModules = async () => {
            try {
                // Try to load Stripe modules
                const [stripeInstance, reactStripeModule] = await Promise.all([
                    initializeStripe(),
                    import("@stripe/react-stripe-js").catch(() => null),
                ]);

                if (!reactStripeModule) {
                    setError("Stripe packages not installed");
                    setLoading(false);
                    return;
                }

                setStripe(stripeInstance);
                
                setStripeModules({
                    Elements: reactStripeModule.Elements,
                    CardElement: reactStripeModule.CardElement,
                    useStripe: reactStripeModule.useStripe,
                    useElements: reactStripeModule.useElements,
                });
            } catch (error) {
                console.error("Failed to load Stripe modules:", error);
                setError("Failed to load Stripe. Please install: npm install @stripe/stripe-js @stripe/react-stripe-js");
            } finally {
                setLoading(false);
            }
        };

        loadModules();
    }, []);

    if (loading) {
        return (
            <Box p="md">
                <Text>Loading payment form...</Text>
            </Box>
        );
    }

    if (error || !stripeModules) {
        return (
            <Box p="md">
                <Text c="red" size="sm">
                    {error || "Stripe packages not installed. Please run: npm install @stripe/stripe-js @stripe/react-stripe-js"}
                </Text>
                <Text c="dimmed" size="xs" mt="xs">
                    After installing, restart your development server.
                </Text>
            </Box>
        );
    }

    if (!stripe) {
        return (
            <Box p="md">
                <Text c="red" size="sm">
                    Stripe is not configured. Please set VITE_STRIPE_PUBLISHABLE_KEY environment variable.
                </Text>
            </Box>
        );
    }

    if (!clientSecret) {
        return (
            <Box p="md">
                <Text c="red" size="sm">
                    Payment intent not found. Please try again.
                </Text>
            </Box>
        );
    }

    return (
        <stripeModules.Elements stripe={stripe}>
            <CheckoutForm
                clientSecret={clientSecret}
                paymentIntentId={paymentIntentId}
                savedPaymentMethodId={savedPaymentMethodId}
                savedCardLabel={savedCardLabel}
                onSuccess={onSuccess}
                onError={onError}
                stripe={stripe}
                Elements={stripeModules.Elements}
                CardElement={stripeModules.CardElement}
                useStripe={stripeModules.useStripe}
                useElements={stripeModules.useElements}
            />
        </stripeModules.Elements>
    );
};

export default StripeCheckout;
