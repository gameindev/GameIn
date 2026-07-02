import { useCallback, useState } from "react";
import walletService from "../services/wallet.service";
import { showNotificationHelper, getApiErrorMessage } from "../../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../../shared/enums/notificationTypesEnum";

export default function useWalletFunding(onSuccess) {
    const [loading, setLoading] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [methodsLoading, setMethodsLoading] = useState(false);

    const loadPaymentMethods = useCallback(async () => {
        setMethodsLoading(true);
        try {
            const data = await walletService.getPaymentMethods();
            setPaymentMethods(data?.items ?? []);
        } catch {
            setPaymentMethods([]);
        } finally {
            setMethodsLoading(false);
        }
    }, []);

    const topUp = useCallback(async (amount, paymentMethodId) => {
        setLoading(true);
        try {
            const data = await walletService.topUp(amount, paymentMethodId);
            onSuccess?.(data);
            return data;
        } catch (err) {
            showNotificationHelper(
                "Top-up failed",
                getApiErrorMessage(err, "Top-up failed"),
                NOTIFICATION_TYPES.ERROR
            );
            throw err;
        } finally {
            setLoading(false);
        }
    }, [onSuccess]);

    const setupPaymentMethod = useCallback(async () => {
        setLoading(true);
        try {
            return await walletService.createSetupIntent();
        } catch (err) {
            showNotificationHelper(
                "Setup failed",
                getApiErrorMessage(err, "Could not start payment method setup"),
                NOTIFICATION_TYPES.ERROR
            );
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const removePaymentMethod = useCallback(async (paymentMethodId) => {
        setLoading(true);
        try {
            await walletService.detachPaymentMethod(paymentMethodId);
            await loadPaymentMethods();
            showNotificationHelper("Removed", "Payment method removed.", NOTIFICATION_TYPES.SUCCESS);
        } catch (err) {
            showNotificationHelper(
                "Remove failed",
                getApiErrorMessage(err, "Could not remove payment method"),
                NOTIFICATION_TYPES.ERROR
            );
        } finally {
            setLoading(false);
        }
    }, [loadPaymentMethods]);

    const confirmTopUp = useCallback(async (paymentId, walletId) => {
        setLoading(true);
        try {
            return await walletService.confirmTopUp(paymentId, walletId);
        } catch (err) {
            showNotificationHelper(
                "Top-up confirmation failed",
                getApiErrorMessage(err, "Could not confirm top-up"),
                NOTIFICATION_TYPES.ERROR
            );
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        paymentMethods,
        methodsLoading,
        loadPaymentMethods,
        topUp,
        confirmTopUp,
        setupPaymentMethod,
        removePaymentMethod,
    };
}
