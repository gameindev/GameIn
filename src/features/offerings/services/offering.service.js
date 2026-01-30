import { buildFormValues, buildOfferingPayload } from "../utils/helpers";


const ROLE_EDIT_RULES = {
    brand: ["note", "uploadLogo"],
    creator: ["price", "dateTitle", "note", "uploadLogo", "terms"],
    community: ["note"],
};

export function getEditableFields(role) {
    return ROLE_EDIT_RULES[role] || [];
}

export function filterEditablePayload(data, role) {
    const editable = getEditableFields(role);
    return Object.keys(data)
        .filter((key) => editable.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
}

export const offeringService = {
    toFormValues(offering) {
        return buildFormValues(offering);
    },

    toEditPayload(data) {

        const payload = buildOfferingPayload(data, "edit");
        

        const structuredData = {    
            ...payload.offering,
            offers: payload.offers,
            price: payload.price,
        };
       
        if (data.uploadLogo) {
            structuredData.uploadLogo = data.uploadLogo;
        }

        const formData = new FormData();
        formData.append("offering", JSON.stringify(structuredData));

        if (data.uploadLogo instanceof File) {
            formData.append("logo", data.uploadLogo);
        }

        // console.log(structuredData, formData);

        return formData;
    },

    getAllOffers(offers = []) {
        return offers;
    },

    getLatestOffers(offers = []) {
        return offers.reduce((acc, curr) => {
            const existing = acc.find((o) => o.offer_type === curr.offer_type);
            if (!existing) {
                acc.push(curr);
            } else if (curr.version > existing.version) {
                const index = acc.indexOf(existing);
                acc[index] = curr;
            }
            return acc;
        }, []);
    },

    getAllPrices(prices = []) {
        return prices;
    },

    getLatestPrice(prices = []) {
        return prices.reduce((latest, curr) => {
            if (!latest) return curr;
            const latestVersion = Number(latest.version ?? -Infinity);
            const currVersion = Number(curr.version ?? -Infinity);
            if (currVersion > latestVersion) return curr;
            return latest;
        }, null);
    },

    processOfferingLatest(offering) {
        const latestPrice = this.getLatestPrice(offering.offering_prices || []);

        return {
            ...offering,
            offering_offers: this.getLatestOffers(offering.offering_offers),
            offering_prices: this.getAllPrices(offering.offering_prices || []),
            offering_price: latestPrice || offering.offering_price || null,
        };
    },
};
