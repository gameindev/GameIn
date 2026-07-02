import { useCallback, useState } from "react";
import walletService from "../services/wallet.service";
import { showNotificationHelper, getApiErrorMessage } from "../../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../../shared/enums/notificationTypesEnum";

export default function useWalletPayout(onSuccess) {
    const [loading, setLoading] = useState(false);
    const [connectStatus, setConnectStatus] = useState(null);

    const loadConnectStatus = useCallback(async () => {
        try {
            const data = await walletService.getConnectStatus();
            setConnectStatus(data);
            return data;
        } catch {
            setConnectStatus(null);
            return null;
        }
    }, []);

    const startOnboarding = useCallback(async () => {
        setLoading(true);
        try {
            const returnUrl = `${window.location.origin}${window.location.pathname}#/settings/payments`;
            const data = await walletService.connectOnboard(returnUrl, returnUrl);
            if (data?.url) {
                window.location.href = data.url;
            }
            return data;
        } catch (err) {
            showNotificationHelper(
                "Connect setup failed",
                getApiErrorMessage(err, "Could not start Stripe Connect onboarding"),
                NOTIFICATION_TYPES.ERROR
            );
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const openDashboard = useCallback(async () => {
        setLoading(true);
        try {
            const data = await walletService.getDashboardLink();
            if (data?.url) {
                window.open(data.url, "_blank", "noopener,noreferrer");
            }
        } catch (err) {
            showNotificationHelper(
                "Dashboard unavailable",
                getApiErrorMessage(err, "Could not open Stripe dashboard"),
                NOTIFICATION_TYPES.ERROR
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const withdraw = useCallback(async (amount) => {
        setLoading(true);
        try {
            const data = await walletService.withdraw(amount);
            showNotificationHelper(
                "Withdrawal initiated",
                "Your payout is being processed.",
                NOTIFICATION_TYPES.SUCCESS
            );
            onSuccess?.(data);
            return data;
        } catch (err) {
            showNotificationHelper(
                "Withdrawal failed",
                getApiErrorMessage(err, "Could not process withdrawal"),
                NOTIFICATION_TYPES.ERROR
            );
            throw err;
        } finally {
            setLoading(false);
        }
    }, [onSuccess]);

    return {
        loading,
        connectStatus,
        loadConnectStatus,
        startOnboarding,
        openDashboard,
        withdraw,
    };
}
