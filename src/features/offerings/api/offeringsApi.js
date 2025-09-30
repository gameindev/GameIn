import { API_PATHS } from "../../../services/endpoints/index";
import useApi from "../../../hooks/useApi";

export function useOfferingApi() {
  const { get, patch } = useApi();

  return {
    fetchOfferings: async (userId) => {
      const res = await get({
        url: API_PATHS.OFFERINGS.LIST,
        params: {
          page: 1,
          limit: 20,
          user_id: userId,
          relations: ["users", "offering_offers", "offering_price"],
        },
      });
      return res?.data?.data || [];
    },

    fetchOfferingById: async (offeringId) => {
      const res = await get({
        url: API_PATHS.OFFERINGS.DETAILS(offeringId),
        params: { relations: ["users", "offering_offers", "offering_price"] },
      });
      return res?.data || null;
    },

    editOffering: (offeringId, formData) =>
      patch({
        url: API_PATHS.OFFERINGS.UPDATE(offeringId),
        payload: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }),
  };
}
