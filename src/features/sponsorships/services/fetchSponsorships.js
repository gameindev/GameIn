import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { OFFERINGS_ENDPOINTS } from "../../offerings/api/offering_endpoints";
import { OFFERINGS_ORDER_ENDPOINTS } from "../../offerings/api/offering_order_endpoint";

const isBrand = (type) => type === USERTYPES.BRAND;
const isCreator = (type) => type === USERTYPES.CREATOR;

async function fetchBrandOfferings(get, brandId, page, limit) {
  const orderResponse = await get({
    url: OFFERINGS_ORDER_ENDPOINTS.LIST({ page, limit, brand_id: brandId }),
  });

  const offeringIds = (orderResponse?.data?.data ?? [])
    .map((o) => o.offering?.id)
    .filter(Boolean);

  if (offeringIds.length === 0) return [];

  const CHUNK = 100;
  const result = [];

  for (let i = 0; i < offeringIds.length; i += CHUNK) {
    const chunkIds = offeringIds.slice(i, i + CHUNK);

    const offeringsResponse = await get({
      url: OFFERINGS_ENDPOINTS.DISPLAY_OFFERINGS({
        page: 1,
        limit: CHUNK,
        ids: chunkIds,
        relations: [
          "user",
          "offering_offers",
          "offering_prices",
          "last_adjusted_by",
          "logo",
        ],
      }),
    });

    result.push(...(offeringsResponse?.data?.data ?? []));
  }

  return result;
}

async function fetchCreatorOfferings(get, creatorId, page, limit) {
  const response = await get({
    url: OFFERINGS_ENDPOINTS.DISPLAY_OFFERINGS({
      page,
      limit,
      userId: creatorId,
      relations: [
        "user",
        "offering_offers",
        "offering_prices",
        "last_adjusted_by",
        "logo",
      ],
    }),
  });
  return response?.data?.data ?? [];
}

export async function fetchSponsorships({
  get,
  user,
  userId,
  profileUserType,
  page = 1,
  limit = 20,
}) {
  const id = userId || user?.id;
  const type = profileUserType || user?.user_type;

  if (isBrand(type)) return fetchBrandOfferings(get, id, page, limit);
  if (isCreator(type)) return fetchCreatorOfferings(get, id, page, limit);

  return [];
}

export async function acceptOffering({ patch, offeringId }) {
  const response = await patch({ url: OFFERINGS_ENDPOINTS.ACCEPT(offeringId) });
  return response?.data ?? null;
}

export async function negotiateOffering({ patch, offeringId }) {
  const response = await patch({
    url: OFFERINGS_ENDPOINTS.NEGOTIATE(offeringId),
  });
  return response?.data ?? null;
}

export async function resetOffering({ patch, offeringId }) {
  const response = await patch({ url: OFFERINGS_ENDPOINTS.RESET(offeringId) });
  return response?.data ?? null;
}
