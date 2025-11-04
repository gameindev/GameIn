import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { OFFERINGS_ENDPOINTS } from "../../offerings/api/offering_endpoints";
import { OFFERINGS_ORDER_ENDPOINTS } from "../../offerings/api/offering_order_endpoint";



export async function fetchSponsorships({ get, user, page = 1, limit = 20 }) {
    // If user is BRAND: fetch orders first, then fetch offerings by IDs from those orders
    if (user.user_type === USERTYPES.BRAND) {
        // Fetch all offering orders for this brand
        // Note: backend automatically filters by authenticated user's brand
        // Note: 'brand', 'offering', 'creator' relations are included by default
        const orderResponse = await get({
            url: OFFERINGS_ORDER_ENDPOINTS.LIST({
                page,
                limit,
                // No brand_id needed - backend uses authenticated user's brand automatically
                // No relations needed - 'offering' is included by default along with 'brand' and 'creator'
            })
        });
        const orders = orderResponse?.data?.data ?? [];
        // Extract all offering IDs from the orders
        const offeringIds = orders.map(order => order.offering?.id).filter(Boolean);

        // If there are no offerings, return empty array
        if (offeringIds.length === 0) {
            return [];
        }

        // Now fetch all offerings with the collected IDs
        // When using ids, we don't need userId
        // Note: Backend limit max is 100, so if we have more IDs, we need to handle pagination
        // For now, we'll fetch in chunks if needed
        const allOfferings = [];
        const chunkSize = 100; // Backend max limit per request
        
        for (let i = 0; i < offeringIds.length; i += chunkSize) {
            const idsChunk = offeringIds.slice(i, i + chunkSize);
            const offeringsResponse = await get({
                url: OFFERINGS_ENDPOINTS.DISPLAY_OFFERINGS({
                    page: 1,
                    limit: chunkSize,
                    ids: idsChunk,
                    relations: [
                        "user",
                        "offering_offers",
                        "offering_price",
                        "last_adjusted_by",
                        "logo"
                    ]
                })
            });
            
            const chunkData = offeringsResponse?.data?.data ?? [];
            allOfferings.push(...chunkData);
        }

        // Return all collected offerings
        return allOfferings;
    }

    // If user is CREATOR: fetch offerings directly by userId
    if (user.user_type === USERTYPES.CREATOR) {
        const params = {
            page,
            limit,
            userId: user?.id,
            relations: [
                "user",
                "offering_offers",
                "offering_price",
                "last_adjusted_by",
                "logo"
            ],
        };

        const response = await get({ url: OFFERINGS_ENDPOINTS.DISPLAY_OFFERINGS(params) });
        return response?.data?.data ?? [];
    }

    // Default: return empty array for unknown user types
    return [];
}


export async function acceptOffering({ patch, offeringId }) {
    const response = await patch({
        url: OFFERINGS_ENDPOINTS.ACCEPT(offeringId),
    });
    return response?.data ?? null;
}

export async function negotiateOffering({ patch, offeringId }) {
    const response = await patch({
        url: OFFERINGS_ENDPOINTS.NEGOTIATE(offeringId),
    });
    return response?.data ?? null;
}

export async function resetOffering({ patch, offeringId }) {
    const response = await patch({
        url: OFFERINGS_ENDPOINTS.RESET(offeringId),
    });
    return response?.data ?? null;
}