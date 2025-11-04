import { useEffect, useRef } from "react";
import { Box, Button, Text } from "@mantine/core";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";

const RazorpayCheckout = ({
    razorpayOrderId,
    amount,
    currency = "INR",
    customerName,
    customerEmail,
    customerContact,
    onSuccess,
    onError,
}) => {
    const scriptLoaded = useRef(false);
    const razorpayLoaded = useRef(false);

    useEffect(() => {
        // Load Razorpay script
        if (!scriptLoaded.current) {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => {
                razorpayLoaded.current = true;
                scriptLoaded.current = true;
            };
            script.onerror = () => {
                showNotificationHelper(
                    "Razorpay Error",
                    "Failed to load Razorpay script. Please refresh the page.",
                    NOTIFICATION_TYPES.ERROR
                );
            };
            document.body.appendChild(script);

            return () => {
                // Cleanup: remove script if component unmounts
                const existingScript = document.querySelector(
                    'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
                );
                if (existingScript) {
                    existingScript.remove();
                }
            };
        }
    }, []);

    const openRazorpayCheckout = () => {
        if (!razorpayLoaded.current || !window.Razorpay) {
            showNotificationHelper(
                "Razorpay Not Ready",
                "Please wait for Razorpay to load and try again.",
                NOTIFICATION_TYPES.WARNING
            );
            return;
        }

        if (!razorpayOrderId) {
            showNotificationHelper(
                "Payment Error",
                "Razorpay order ID is missing. Please try again.",
                NOTIFICATION_TYPES.ERROR
            );
            onError?.("Razorpay order ID is missing");
            return;
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || "",
            amount: Math.round(amount * 100), // Convert to paise
            currency: currency,
            name: "GameIn",
            description: "Payment for Sponsorship",
            order_id: razorpayOrderId,
            handler: function (response) {
                // Payment success callback
                onSuccess?.(response);
            },
            prefill: {
                name: customerName || "",
                email: customerEmail || "",
                contact: customerContact || "",
            },
            theme: {
                color: "#3399cc",
            },
            modal: {
                ondismiss: function () {
                    // User closed the modal
                    onError?.("Payment cancelled by user");
                },
            },
        };

        try {
            const razorpay = new window.Razorpay(options);
            razorpay.open();

            razorpay.on("payment.failed", function (response) {
                const errorMessage =
                    response.error?.description ||
                    response.error?.reason ||
                    "Payment failed. Please try again.";
                showNotificationHelper("Payment Failed", errorMessage, NOTIFICATION_TYPES.ERROR);
                onError?.(response);
            });
        } catch (error) {
            console.error("Razorpay error:", error);
            showNotificationHelper(
                "Payment Error",
                error.message || "Failed to initialize payment.",
                NOTIFICATION_TYPES.ERROR
            );
            onError?.(error);
        }
    };

    if (!razorpayLoaded.current) {
        return (
            <Box p="md">
                <Text>Loading payment gateway...</Text>
                <Button mt="md" onClick={openRazorpayCheckout} disabled>
                    Pay with Razorpay
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Button variant="primary" fullWidth onClick={openRazorpayCheckout}>
                Pay with Razorpay
            </Button>
        </Box>
    );
};

export default RazorpayCheckout;

