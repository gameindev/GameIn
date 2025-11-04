export const OFFERINGS_ORDER_ENDPOINTS = {
    LIST: ({ page = 1, limit = 20, userId = undefined, brand_id = undefined, relations = [] }) => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        
        if (userId) {
            params.append('user_id', userId.toString());
        }
        
        if (brand_id) {
            params.append('brand_id', brand_id.toString());
        }
        
        if (relations.length > 0) {
            relations.forEach(rel => params.append('relations', rel));
        }
        
        return `/offerings-order?${params.toString()}`;
    },
    DETAILS: (id) => `/offerings-order/${id}`,
    CREATE: () => "/offerings-order",
    // UPDATE: (id) => `/offerings-order/${id}`,
    // DELETE: (id) => `/offerings-order/${id}`,
    GET_BY_OFFERING: (offeringId) => `/offerings-order?offering_id=${offeringId}`,
};