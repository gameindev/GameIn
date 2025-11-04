export const FIELD_MAPPERS = {
    dateTitle: {
        fromApi: (api = {}) => ({
            startDate: api?.start_date || null,
            endDate: api?.end_date || null,
            title: api?.title || "",
            description: api?.description || "",
        }),
        toApi: (form = {}) => ({
            ...(form?.title && { title: form.title }),
            ...(form?.description && { description: form.description }),
            ...(form?.startDate && { start_date: form.startDate }),
            ...(form?.endDate && { end_date: form.endDate }),
        }),
    },

    terms: {
        fromApi: (api = {}) => ({
            acknowledgement: api?.is_terms_signed ?? false,
        }),
        toApi: (form = {}) =>
            form?.acknowledgement ? { is_terms_signed: form.acknowledgement } : {},
    },

    price: {
        fromApi: (api = {}) => ({
            choosePrice: api?.offering_price?.price || "",
            gameinFee: api?.offering_price?.platform_fee || "",
            gameinTax: api?.offering_price?.tax || "",
            paymentType:
                api?.offering_price?.payment_provider?.toLowerCase() || "manual",
        }),
        toApi: (form = {}) => ({
            ...(form?.choosePrice && { price: form.choosePrice }),
            ...(form?.gameinFee && { platform_fee: form.gameinFee }),
            ...(form?.gameinTax && { tax: form.gameinTax }),
            ...(form?.paymentType && {
                payment_provider: form.paymentType.toUpperCase(),
            }),
        }),
    },

    event: {
        fromApi: (api = {}) => ({
            type: api?.event_type || "",
            game: api?.game || "",
        }),
        toApi: (form = {}) => ({
            ...(form?.type && { event_type: form.type }),
            ...(form?.game && { game: form.game }),
        }),
    },
};

