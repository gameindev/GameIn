import api from "../../../app/services/api";

const unwrap = (res) => res?.data?.data ?? res?.data;

/**
 * @param {number} orderId
 */
export const getSponsorshipFeedbackOrderContext = async (orderId) => {
    const response = await api.get(`/sponsorship-feedback/order/${orderId}`);
    return unwrap(response);
};

/**
 * @param {{ offering_order_id: number, scores: Record<string, number> }} payload
 */
export const submitSponsorshipFeedback = async (payload) => {
    const response = await api.post("/sponsorship-feedback", payload);
    return unwrap(response);
};

/**
 * Creator dashboard: aggregated ratings from all brands (sponsorship feedback).
 */
export const getCreatorRatingSummary = async () => {
    const response = await api.get("/sponsorship-feedback/creator/summary");
    return unwrap(response);
};
