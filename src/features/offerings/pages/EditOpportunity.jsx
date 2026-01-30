import {
    ActionIcon,
    Box,
    Button,
    Flex,
    Grid,
    Group,
    Image,
    memoize,
    Text,
    Textarea,
} from "@mantine/core";
import StatBox from "../../../shared/components/StatBox";
import { useNavigate, useParams } from "react-router";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import { useOfferings } from "../hooks/useOfferings";
import { useOfferingFormHandler } from "../hooks/useOfferingFormHandler";
import { editDefaultValues } from "../types/defaultData.mapper";
import { useEditLock } from "../hooks/useEditLock";
import { useEffect, useMemo, useState } from "react";
import { offeringService } from "../services";
import Preloader from "../../../shared/components/Preloader";
import { offeringSectionMapper } from "../types/offeringSection.mapper";
import { FormDisableProvider } from "../../../shared/context/FormDisableContext";
import ExpiryTimer from "../components/ExpiryTimer";
import OfferingSection from "../components/OfferingSection";
import OpportunityFormFields from "../components/OpportunityFormFields";
import FormField from "../../../shared/components/FormField";
import { IconMessage } from "@tabler/icons-react";
import { theme } from "../../../shared/styles/theme/customTheme";
import UploadLogoField from "../components/UploadLogoField";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import CheckoutModal from "../components/CheckoutModal";
import routeService from "../../../app/services/route/routeService";
import { OfferingStatus } from "../../../shared/enums/offeringStatusEnum";
import useApi from "../../../shared/hooks/useApi";
import usePayment from "../../payments/hooks/usePayment";
import { PaymentProvider } from "../../../shared/enums/paymentProviderEnum";
import { OFFERINGS_ORDER_ENDPOINTS } from "../api/offering_order_endpoint";
import { getTimeRemaining } from "../../sponsorships/utils/date.helper";

const EditOpportunity = ({ rolePermissions }) => {
    const { offeringId } = useParams();
    const navigate = useNavigate();
    const user = useAppSelector(currentUser);
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const { get } = useApi();
    const {
        initiatePayment,
        verifyPayment,
        loading: paymentLoading,
    } = usePayment();

    const { offerings, loading, error, submitEdit, toFormValues } = useOfferings({
        userId: user?.id,
        offeringId,
    });

    const handleProceedPayment = async (data) => {
        // Handle payment verification callback from payment components
        if (
            data?.action === "verify" &&
            data?.paymentIntentId &&
            data?.providerPaymentId
        ) {
            try {
                await verifyPayment(data.paymentIntentId, data.providerPaymentId);
                setCheckoutOpen(false);
                setPaymentData(null);
                navigate("/payment/success", {
                    state: { paymentIntentId: data.paymentIntentId },
                });
            } catch (error) {
                console.error("Payment verification error:", error);
            }
            return;
        }

        // Original payment initiation flow
        try {
            if (!offerings?.data?.id) {
                showNotificationHelper(
                    "Error",
                    "Offering data not available",
                    NOTIFICATION_TYPES.ERROR
                );
                return;
            }

            // Step 1: Find or get the order for this offering
            // The order should have been created when the brand edited the offering
            const ordersResponse = await get({
                url: OFFERINGS_ORDER_ENDPOINTS.LIST({
                    page: 1,
                    limit: 10,
                    relations: ["offering", "brand"],
                }),
            });

            const orders = ordersResponse?.data?.data || [];
            const order = orders.find(
                (o) => o.offering?.id === offerings.data.id && o.brand?.id === user?.id
            );

            if (!order) {
                showNotificationHelper(
                    "Order Not Found",
                    "Please save your changes first before proceeding to payment.",
                    NOTIFICATION_TYPES.WARNING
                );
                setCheckoutOpen(false);
                return;
            }

            // Step 2: Get payment provider from offering price (default to STRIPE)
            const paymentProvider =
                offerings?.data?.offering_price?.payment_provider ||
                PaymentProvider.STRIPE;

            // Step 3: Initiate payment flow
            const paymentResponse = await initiatePayment(order.id, paymentProvider);

            if (paymentResponse?.redirecting && paymentResponse?.redirectUrl) {
                // PayPal or other redirect-based payments
                // Already redirected by initiatePayment
                return;
            }

            // Handle Stripe and Razorpay - show payment form in modal
            if (
                (paymentProvider === PaymentProvider.STRIPE &&
                    paymentResponse?.clientSecret) ||
                (paymentProvider === PaymentProvider.RAZORPAY &&
                    paymentResponse?.razorpayOrderId)
            ) {
                setPaymentData(paymentResponse);
                // Keep modal open to show payment form
                return;
            }

            // Other providers or unexpected responses
            showNotificationHelper(
                "Payment Initiated",
                "Your payment is being processed.",
                NOTIFICATION_TYPES.SUCCESS
            );
            setCheckoutOpen(false);
        } catch (err) {
            console.error("Payment error:", err);
            // Error is already handled by usePayment hook
        }
    };

    const checkExpiry = getTimeRemaining(offerings?.data?.end_date);

    const { control, handleSubmit, watch, setValue, reset } =
        useOfferingFormHandler({
            defaultValues: editDefaultValues,
            onSubmit: (data) => {
                if (brandLocked) {
                    showNotificationHelper(
                        "Edit Locked",
                        "You cannot edit this sponsorship until the timer expires.",
                        NOTIFICATION_TYPES.WARNING
                    );
                    return;
                }
                console.log(data);

                submitEdit(
                    {
                        ...data,
                        _editorRole: user?.user_type,
                    },
                    () => {
                        showNotificationHelper(
                            "Sponsorship Updated",
                            "Your sponsorship has been updated successfully.",
                            NOTIFICATION_TYPES.SUCCESS
                        );
                        navigate(-1);
                    }
                ).catch((err) => {
                    showNotificationHelper(
                        "Error",
                        err?.response?.data?.message ||
                        err?.message ||
                        "Something went wrong",
                        NOTIFICATION_TYPES.ERROR
                    );
                    console.error("Error updating sponsorship:", err);
                });
            },
        });

    const {
        isCreator,
        brandLocked,
        timerActive,
        lastEditedByType,
        isAccepted,
        isSponsored,
    } = useEditLock({
        user,
        offering: offerings.data,
    });

    const sponsorEdit = watch("sponsorEdit");

    // Reset form once offering data loads
    useEffect(() => {
        if (offerings.data) {
            const formValues = toFormValues(offerings.data);
            // Ensure terms value is explicitly set from offering data
            // The mapper should handle this, but we explicitly ensure it's set
            reset(formValues);
            // console.log(offerings.data, formValues);
        }
    }, [offerings, reset, toFormValues]);

    // Compute enabled sections based on available offer types
    const enabledSections = useMemo(() => {
        const latestOffer = offeringService.getLatestOffers(
            offerings?.data?.offering_offers
        );
        if (!latestOffer) return [];

        const enabledTypes = latestOffer
            .filter((o) => o.offer_type)
            .map((o) => o.offer_type);

        return offeringSectionMapper
            .filter((s) => enabledTypes.includes(s.type))
            .map((s, idx) => ({
                ...s,
                number: String(idx + 1).padStart(2, "0"),
            }));
    }, [offerings.data]);

    const overrideDisabledFields = useMemo(
        () => rolePermissions?.overrideDisabledFields || [],
        [rolePermissions]
    );

    // Loading & Error States
    if (loading) return <Preloader />;
    if (error)
        return (
            <Box p="xl">
                <Text c="red">Failed to load offering. Please try again.</Text>
            </Box>
        );

    if (!offerings.data || offerings.data.length === 0)
        return (
            <Box p="xl">
                <Text c="dimmed">No offering found</Text>
            </Box>
        );

    return (
        <FormDisableProvider
            disabled={brandLocked || (!sponsorEdit && !isCreator) || isAccepted || checkExpiry === "Expired"}
        >
            <Box component="form" onSubmit={handleSubmit}>
                <Group pb="2.75rem" justify="space-between " mb={20}>
                    <Text fz={35}>
                        edit this
                        <br aria-hidden="true" />
                        <Text component="span" c={theme.colors.primary[0]} fw={700}>
                            {" "}
                            sponsorship opportunity
                        </Text>
                    </Text>

                    {timerActive && lastEditedByType === USERTYPES.BRAND && (
                        <ExpiryTimer lastAdjustedAt={offerings?.data?.last_adjusted_at} />
                    )}
                </Group>

                <Grid gutter={20}>
                    {enabledSections.map((s) => (
                        <OfferingSection
                            key={s.type}
                            title={
                                <>
                                    <Text
                                        component="span"
                                        mr={8}
                                        fw={700}
                                        c={theme.colors.primary[0]}
                                    >
                                        {s.number}
                                    </Text>{" "}
                                    {s.title}
                                </>
                            }
                            background={"rgb(157, 127, 239, 0.1)"}
                        >
                            <Image
                                src={s.image}
                                radius="md"
                                w="100%"
                                h="5rem"
                                mb="md"
                                fit="cover"
                            />
                            <OpportunityFormFields
                                control={control}
                                type={s.type}
                                mode="edit"
                                overrideDisabledFields={overrideDisabledFields}
                            />
                        </OfferingSection>
                    ))}

                    {/* Common sections */}
                    <OfferingSection title="Set Date & Title">
                        <OpportunityFormFields
                            control={control}
                            type="dateTitle"
                            mode="edit"
                            overrideDisabledFields={overrideDisabledFields}
                        />
                    </OfferingSection>

                    <OfferingSection title="Set your price">
                        <OpportunityFormFields
                            control={control}
                            type="price"
                            setValue={setValue}
                            mode="edit"
                            overrideDisabledFields={overrideDisabledFields}
                        />
                    </OfferingSection>

                    <OfferingSection title="Leave a note">
                        <FormField
                            name="note"
                            control={control}
                            Component={Textarea}
                            componentProps={{
                                placeholder: "Write your custom message here...",
                                autosize: true,
                                minRows: 4,
                                maxRows: 10,
                                disabled: isCreator,
                            }}
                        />
                        {!isCreator && (
                            <Flex gap={20} align="center" mt="lg">
                                <ActionIcon
                                    size="lg"
                                    color="inputBgColor"
                                    variant="filled"
                                    onClick={() =>
                                        routeService.messageRoute(
                                            offerings.data.user.id,
                                            navigate,
                                            user
                                        )
                                    }
                                >
                                    <IconMessage size={16} />
                                </ActionIcon>
                                <Text>Get in touch with creator</Text>
                            </Flex>
                        )}
                    </OfferingSection>

                    <UploadLogoField
                        control={control}
                        offering={offerings.data}
                        isAccepted={isAccepted}
                        isCreator={isCreator}
                    />

                    <OfferingSection
                        className="terms_condition"
                        title="Terms of use"
                        background="rgba(105, 179, 231, 0.2)"
                    >
                        <OpportunityFormFields
                            control={control}
                            type="terms"
                            mode="edit"
                            overrideDisabledFields={["terms.acknowledgement"]}
                        />
                    </OfferingSection>
                </Grid>

                <Box
                    w="100%"
                    h={1}
                    style={{ borderBottom: "1px dashed #50565a" }}
                    mt={20}
                />

                <Group py="2.75rem" align="center" justify="center">
                    <Flex gap={32}>
                        <Button variant="inputBgColor" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                        {isSponsored || checkExpiry === "Expired" ? null : isAccepted ? (
                            !isCreator && (
                                <Button
                                    variant="primary"
                                    type="button"
                                    onClick={() => setCheckoutOpen(true)}
                                >
                                    Checkout
                                </Button>
                            )
                        ) : (
                            <Button variant="primary" type="submit" disabled={brandLocked}>
                                {brandLocked
                                    ? "Edit Locked (Wait 24h)"
                                    : isCreator
                                        ? "Update Sponsorship"
                                        : "Request Sponsorship"}
                            </Button>
                        )}
                    </Flex>
                </Group>
            </Box>

            <CheckoutModal
                opened={checkoutOpen}
                onClose={() => {
                    setCheckoutOpen(false);
                    setPaymentData(null);
                }}
                offerings={offerings}
                control={control}
                onProceedPayment={handleProceedPayment}
                loading={paymentLoading}
                paymentData={paymentData}
            />
        </FormDisableProvider>
    );
};

export default EditOpportunity;
