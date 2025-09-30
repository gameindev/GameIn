import { OfferingStatus } from "../../../utils/enum";
import { createDefaults } from "../../../config/formConfigs/opportunityConfig";
import { FIELD_MAPPERS } from "./fieldMappers";
import { OFFER_MAPPERS } from "./offerMappers";

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
    ...createDefaults(),
    id: api?.id || null,
    sponsorEdit: api?.can_edit ?? false,
    note: api?.notes || "",
    uploadLogo: api?.logo_url || null,
    ...mapFieldsFromApi(api),
    ...mapOffersFromApi(api),
  };
}

// Build API payload from form data
export function buildOfferingPayload(form = {}, mode = "create") {
  const offering = {
    id: form?.id,
    type: "INDIVIDUAL",
    status: OfferingStatus.DRAFT,
    ...(form?.sponsorEdit !== undefined && { can_edit: form.sponsorEdit }),
    ...mapFieldsToApi(form),
  };

  if (mode === "edit") {
    offering.notes = form?.note || "";
    offering.logo = form?.uploadLogo || null;
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
