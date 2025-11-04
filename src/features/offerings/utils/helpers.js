import { OfferingCategory } from "../../../shared/enums/offeringCategoryEnum";
import { OfferingStatus } from "../../../shared/enums/offeringStatusEnum";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";
import { FIELD_MAPPERS } from "./fieldMappers";
import { OFFER_MAPPERS } from "./offerMappers";
import { createDefaultData } from "../types/defaultData.mapper";

const REQUIRED_FIELDS = {
    [OfferingCategory.LOGO_STREAM]: ["platform", "timeMode", "size"],
    [OfferingCategory.VIDEO_COMMERCIAL]: [
        "platform",
        "timeMode",
        "size",
        "duration",
        "repetation",
    ],
    [OfferingCategory.SOCIAL_POST]: ["platform", "timeMode", "size"],
    [OfferingCategory.MERCHANDISE]: ["platform", "timeMode", "types"],
};

/**
 * Validates offering data
 * @param {Object} data - Form data
 * @returns {boolean} - True if valid
 */
export const validateOfferings = (data) => {
    const offeringKeys = Object.keys(REQUIRED_FIELDS);

    const enabled = offeringKeys.filter((key) => data[key]?.enabled);
    if (!enabled.length) {
        showNotificationHelper(
            "No Offering Selected",
            "Please enable at least one offering before submitting.",
            NOTIFICATION_TYPES.ERROR
        );
        return false;
    }

    const missing = enabled
        .map((key) => {
            const fields = REQUIRED_FIELDS[key];
            const empty = fields.filter(
                (f) => !data[key]?.[f] || data[key][f].toString().trim() === ""
            );
            return empty.length ? { type: key, missing: empty } : null;
        })
        .filter(Boolean);

    if (missing.length > 0) {
        const msg = missing
            .map((m) => `${m.type.replace("_", " ")} → ${m.missing.join(", ")}`)
            .join("; ");
        showNotificationHelper(
            "Incomplete Offering",
            `Please fill all required fields for: ${msg}`,
            NOTIFICATION_TYPES.ERROR
        );
        return false;
    }

    // Validate dateTitle
    if (!data.dateTitle?.title || data.dateTitle?.title.trim() === "") {
        showNotificationHelper(
            "Validation Error",
            "Title is required",
            NOTIFICATION_TYPES.ERROR
        );
        return false;
    }

    // Validate dates
    if (!data.dateTitle?.startDate || !data.dateTitle?.endDate) {
        showNotificationHelper(
            "Validation Error",
            "Start date and end date are required",
            NOTIFICATION_TYPES.ERROR
        );
        return false;
    }

    // Validate price
    if (!data.price?.choosePrice || parseFloat(data.price.choosePrice) <= 0) {
        showNotificationHelper(
            "Validation Error",
            "Price must be greater than 0",
            NOTIFICATION_TYPES.ERROR
        );
        return false;
    }

    // Validate terms
    if (!data.terms?.acknowledgement) {
        showNotificationHelper(
            "Validation Error",
            "Terms must be acknowledged",
            NOTIFICATION_TYPES.ERROR
        );
        return false;
    }

    return true;
};





// Map API fields to form fields
function mapFieldsFromApi(api = {}) {
    const out = {};
    for (const [name, { fromApi }] of Object.entries(FIELD_MAPPERS)) {
        out[name] = fromApi(api);
    }
    return out;
}



// Map form fields to API payload (exclude price)
function mapFieldsToApi(form = {}) {
    const out = {};
    for (const [name, { toApi }] of Object.entries(FIELD_MAPPERS)) {
        if (name === "price") continue;
        if (form[name]) Object.assign(out, toApi(form[name]));
    }
    return out;
}



// Map offering offers from API
function mapOffersFromApi(api = {}) {
    const out = {};
    const latestOffers = {};

    api.offering_offers?.forEach((offer) => {
        const key = offer?.offer_type;
        if (!latestOffers[key] || latestOffers[key].version < offer.version) {
            latestOffers[key] = offer;
        }
    });

    Object.values(latestOffers).forEach((offer) => {
        const mapper = OFFER_MAPPERS[offer?.offer_type];
        if (mapper) {
            out[mapper.key] = mapper.fromApi(offer);
        }
    });
    return out;
}



// Map form offers to API payload
function mapOffersToApi(form = {}) {
    const out = [];
    Object.entries(OFFER_MAPPERS).forEach(([offerType, { key, toApi }]) => {
        if (form[key]?.enabled) {
            out.push({
                offering_id: form.id,
                offer_type: offerType,
                ...toApi(form[key]),
            });
        }
    });
    return out;
}





// Build initial form values from API data
export function buildFormValues(api = {}) {
    return {
        ...createDefaultData(),
        id: api?.id || null,
        sponsorEdit: api?.can_edit ?? false,
        note: api?.notes || "",
        uploadLogo: api?.logo_url || null,
        ...mapFieldsFromApi(api),
        ...mapOffersFromApi(api),
    };
}




/**
 * Builds offering payload for API
 * @param {Object} form - Form data
 * @param {string} mode - "create" or "edit"
 * @returns {Object} - API payload
 */
export function buildOfferingPayload(form = {}, mode = "create") {
    const offering = {
        id: form?.id,
        type: "INDIVIDUAL",        
        ...(form?.sponsorEdit !== undefined && { can_edit: form.sponsorEdit }),
        ...mapFieldsToApi(form),
    };

    if (mode === "edit") {
        const editRole = form?._editorRole;

        if (editRole == USERTYPES.CREATOR && offering.status === OfferingStatus.DRAFT) {
            offering.status = OfferingStatus.DRAFT;
        } else if(editRole == USERTYPES.CREATOR && offering.status === OfferingStatus.OFFERED) {
            offering.status = OfferingStatus.PENDING;
        }

        if (editRole == USERTYPES.BRAND) {
            offering.status = OfferingStatus.OFFERED;
        }

        offering.notes = form?.note || "";
        offering.logo = form?.uploadLogo || null;
    } else {
        offering.status = OfferingStatus.DRAFT;
    }

    return {
        offering,
        offers: mapOffersToApi(form),
        price: {
            ...(form?.price ? FIELD_MAPPERS.price.toApi(form.price) : {}),
            offering_id: form?.id ? form.id : undefined,
        },
    };
}

