import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Box, Button, Flex, Group, Paper, Text, Title } from "@mantine/core";
import { IconCircleCheck, IconCircleX, IconMail, IconRefresh } from "@tabler/icons-react";
import { theme } from "../../../../shared/styles/theme/customTheme";
import useApi from "../../../../shared/hooks/useApi";
import { USER_ENDPOINTS } from "../../api/userEndpoints";
import { showNotificationHelper } from "../../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../../shared/enums/notificationTypesEnum";
import Preloader from "../../../../shared/components/Preloader";
import routePaths from "../../../../app/router/routes";

const EmailVerificationPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { get, post, loading } = useApi();
    
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    
    const [verificationStatus, setVerificationStatus] = useState("loading"); // loading, success, error, expired
    const [errorMessage, setErrorMessage] = useState("");
    const [resending, setResending] = useState(false);

    useEffect(() => {
        const verifyEmail = async () => {
            // Check if we have required parameters
            if (!email || !token) {
                setVerificationStatus("error");
                setErrorMessage("Invalid verification link. Please check your email for the correct link.");
                return;
            }

            try {
                const response = await get({
                    url: USER_ENDPOINTS.VERIFY_EMAIL({ email, token }),
                });

                if (response?.data?.message === "Email verified successfully") {
                    setVerificationStatus("success");
                    showNotificationHelper(
                        "Email Verified",
                        "Your email has been verified successfully. You can now log in.",
                        NOTIFICATION_TYPES.SUCCESS
                    );
                } else {
                    setVerificationStatus("error");
                    setErrorMessage(response?.data?.message || "Verification failed. Please try again.");
                }
            } catch (error) {
                console.error("Verification error:", error);
                const errorMsg = error?.response?.data?.message || error?.message || "Verification failed";
                setVerificationStatus("error");
                setErrorMessage(errorMsg);
                
                // Check if it's a "not found" error (expired/invalid token)
                if (error?.response?.status === 404 || errorMsg.toLowerCase().includes("not found")) {
                    setVerificationStatus("expired");
                }
            }
        };

        verifyEmail();
    }, [email, token, get]);

    const handleResendVerification = async () => {
        if (!email) {
            showNotificationHelper(
                "Error",
                "Email address not found. Please request a new verification email.",
                NOTIFICATION_TYPES.ERROR
            );
            return;
        }

        setResending(true);
        try {
            const response = await post({
                url: USER_ENDPOINTS.RESEND_VERIFICATION(email),
            });

            if (response?.data?.message) {
                showNotificationHelper(
                    "Verification Email Sent",
                    "A new verification email has been sent to your inbox. Please check your email.",
                    NOTIFICATION_TYPES.SUCCESS
                );
            }
        } catch (error) {
            console.error("Resend verification error:", error);
            showNotificationHelper(
                "Error",
                error?.response?.data?.message || "Failed to resend verification email. Please try again.",
                NOTIFICATION_TYPES.ERROR
            );
        } finally {
            setResending(false);
        }
    };

    if (loading && verificationStatus === "loading") {
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
                <Preloader />
            </Box>
        );
    }

    const getStatusIcon = () => {
        switch (verificationStatus) {
            case "success":
                return (
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
                );
            case "expired":
            case "error":
                return (
                    <Box
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            backgroundColor: theme.colors.error?.[0] || "#f44336",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <IconCircleX size={50} color="white" />
                    </Box>
                );
            default:
                return (
                    <Box
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            backgroundColor: theme.colors.primary?.[0] || "#3399cc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <IconMail size={50} color="white" />
                    </Box>
                );
        }
    };

    const getStatusTitle = () => {
        switch (verificationStatus) {
            case "success":
                return "Email Verified Successfully!";
            case "expired":
                return "Verification Link Expired";
            case "error":
                return "Verification Failed";
            default:
                return "Verifying Your Email...";
        }
    };

    const getStatusMessage = () => {
        switch (verificationStatus) {
            case "success":
                return "Your email has been verified successfully. You can now log in to your account.";
            case "expired":
                return "This verification link has expired or is invalid. Please request a new verification email.";
            case "error":
                return errorMessage || "An error occurred during verification. Please try again.";
            default:
                return "Please wait while we verify your email address...";
        }
    };

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
                    {getStatusIcon()}

                    <Title order={2} ta="center">
                        {getStatusTitle()}
                    </Title>

                    <Text c="dimmed" ta="center" size="sm">
                        {getStatusMessage()}
                    </Text>

                    {email && (
                        <Text c="dimmed" ta="center" size="xs" mt="xs">
                            Email: {email}
                        </Text>
                    )}

                    {/* Action Buttons */}
                    <Flex gap="md" mt="xl" w="100%" direction="column">
                        {verificationStatus === "success" && (
                            <>
                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={() => navigate(routePaths.LOGIN)}
                                >
                                    Go to Login
                                </Button>
                                <Button
                                    variant="default"
                                    fullWidth
                                    onClick={() => navigate(routePaths.WELCOMEPAGE)}
                                >
                                    Go to Home
                                </Button>
                            </>
                        )}

                        {(verificationStatus === "expired" || verificationStatus === "error") && (
                            <>
                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={handleResendVerification}
                                    loading={resending}
                                    leftSection={<IconRefresh size={16} />}
                                >
                                    Resend Verification Email
                                </Button>
                                <Button
                                    variant="default"
                                    fullWidth
                                    onClick={() => navigate(routePaths.LOGIN)}
                                >
                                    Go to Login
                                </Button>
                            </>
                        )}
                    </Flex>
                </Flex>
            </Paper>
        </Box>
    );
};

export default EmailVerificationPage;

