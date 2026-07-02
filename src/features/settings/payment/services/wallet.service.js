import api from "../../../../app/services/api";
import { WALLET_ENDPOINTS } from "../api/wallet_endpoints";

const unwrap = (response) => response?.data?.data ?? response?.data ?? null;

export const walletService = {
    getMyWallet: async () => {
        const response = await api.get(WALLET_ENDPOINTS.ME);
        return unwrap(response);
    },

    getAnalytics: async (days = 30) => {
        const response = await api.get(WALLET_ENDPOINTS.ANALYTICS, { params: { days } });
        return unwrap(response);
    },

    getLedger: async (page = 1, limit = 20) => {
        const response = await api.get(WALLET_ENDPOINTS.LEDGER, { params: { page, limit } });
        return unwrap(response);
    },

    connectOnboard: async (refreshUrl, returnUrl) => {
        const response = await api.post(WALLET_ENDPOINTS.CONNECT_ONBOARD, { refreshUrl, returnUrl });
        return unwrap(response);
    },

    getConnectStatus: async () => {
        const response = await api.get(WALLET_ENDPOINTS.CONNECT_STATUS);
        return unwrap(response);
    },

    getDashboardLink: async () => {
        const response = await api.post(WALLET_ENDPOINTS.CONNECT_DASHBOARD);
        return unwrap(response);
    },

    topUp: async (amount, paymentMethodId) => {
        const payload = { amount };
        if (paymentMethodId) {
            payload.paymentMethodId = paymentMethodId;
        }
        const response = await api.post(WALLET_ENDPOINTS.TOP_UP, payload);
        return unwrap(response);
    },

    confirmTopUp: async (paymentId, walletId) => {
        const response = await api.post(WALLET_ENDPOINTS.TOP_UP_CONFIRM, { paymentId, walletId });
        return unwrap(response);
    },

    payFromWallet: async (orderId) => {
        const response = await api.post(WALLET_ENDPOINTS.PAY_ORDER(orderId));
        return unwrap(response);
    },

    getPaymentMethods: async () => {
        const response = await api.get(WALLET_ENDPOINTS.PAYMENT_METHODS);
        return unwrap(response);
    },

    createSetupIntent: async () => {
        const response = await api.post(WALLET_ENDPOINTS.PAYMENT_METHODS_SETUP);
        return unwrap(response);
    },

    detachPaymentMethod: async (paymentMethodId) => {
        const response = await api.delete(WALLET_ENDPOINTS.PAYMENT_METHOD(paymentMethodId));
        return unwrap(response);
    },

    withdraw: async (amount) => {
        const response = await api.post(WALLET_ENDPOINTS.WITHDRAW, amount != null ? { amount } : {});
        return unwrap(response);
    },

    getPayouts: async () => {
        const response = await api.get(WALLET_ENDPOINTS.PAYOUTS);
        return unwrap(response);
    },
};

export default walletService;
