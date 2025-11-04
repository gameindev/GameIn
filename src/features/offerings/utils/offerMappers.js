import { OfferingCategory } from "../../../shared/enums/offeringCategoryEnum";

export const OFFER_MAPPERS = {
    [OfferingCategory.LOGO_STREAM]: {
        key: OfferingCategory.LOGO_STREAM,
        fromApi: (o = {}) => ({
            enabled: true,
            platform: o?.platform?.toLowerCase() || "",
            timeMode: o?.time_mode || "",
            size: o?.size || "",
        }),
        toApi: (f = {}) => ({
            ...(f?.platform && { platform: f.platform.toUpperCase() }),
            ...(f?.timeMode && { time_mode: f.timeMode }),
            ...(f?.schedule && { schedule: f.schedule }),
            ...(f?.size && { size: f.size }),
        }),
    },

    [OfferingCategory.VIDEO_COMMERCIAL]: {
        key: OfferingCategory.VIDEO_COMMERCIAL,
        fromApi: (o = {}) => ({
            enabled: true,
            platform: o?.platform?.toLowerCase() || "",
            timeMode: o?.time_mode || "",
            duration: o?.duration || "",
            repetation: o?.repetition || "",
            size: o?.size || "",
        }),
        toApi: (f = {}) => ({
            ...(f?.platform && { platform: f.platform.toUpperCase() }),
            ...(f?.timeMode && { time_mode: f.timeMode }),
            ...(f?.duration && { duration: f.duration }),
            ...(f?.repetation && { repetition: f.repetation }),
            ...(f?.schedule && { schedule: f.schedule }),
            ...(f?.size && { size: f.size }),
        }),
    },

    [OfferingCategory.SOCIAL_POST]: {
        key: OfferingCategory.SOCIAL_POST,
        fromApi: (o = {}) => ({
            enabled: true,
            platform: o?.platform?.toLowerCase() || "",
            timeMode: o?.time_mode || "",
            size: o?.size || "",
        }),
        toApi: (f = {}) => ({
            ...(f?.platform && { platform: f.platform.toUpperCase() }),
            ...(f?.timeMode && { time_mode: f.timeMode }),
            ...(f?.schedule && { schedule: f.schedule }),
            ...(f?.size && { size: f.size }),
        }),
    },

    [OfferingCategory.MERCHANDISE]: {
        key: OfferingCategory.MERCHANDISE,
        fromApi: (o = {}) => ({
            enabled: true,
            platform: o?.platform?.toLowerCase() || "",
            timeMode: o?.time_mode || "",
            types: o?.sub_type || "",
        }),
        toApi: (f = {}) => ({
            ...(f?.platform && { platform: f.platform.toUpperCase() }),
            ...(f?.timeMode && { time_mode: f.timeMode }),
            ...(f?.schedule && { schedule: f.schedule }),
            ...(f?.types && { sub_type: f.types }),
        }),
    },
};

