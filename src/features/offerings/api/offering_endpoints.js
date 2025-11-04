export const OFFERINGS_ENDPOINTS = {
    LIST: "/offerings",
    DETAILS: (id) => `/offerings/${id}`,
    CREATE: "/offerings",
    UPDATE: (id) => `/offerings/${id}/adjust`,
    RESET: (id) => `/offerings/${id}/reset`,
    ACCEPT: (id) => `/offerings/${id}/accept`,
    NEGOTIATE: (id) => `/offerings/${id}/negotiate`,
    DELETE: (id) => `/offerings/${id}`,
    DISPLAY_OFFERINGS: ({ page = 1, limit = 20, userId = undefined, offeringId = undefined, ids = undefined, relations = [] }) => {
        // If offeringId is provided, use it in the path; otherwise, use base offerings path
        const basePath = offeringId ? `/offerings/${offeringId}` : '/offerings';

        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        
        if (userId) {
            params.append('user_id', userId.toString());
        }
        
        if (ids && Array.isArray(ids) && ids.length > 0) {
            // Add each ID as a separate parameter (array support)
            ids.forEach(id => params.append('ids', id.toString()));
        }
        
        if (relations.length > 0) {
            relations.forEach(rel => params.append('relations', rel));
        }

        return `${basePath}?${params.toString()}`;
    },
};

