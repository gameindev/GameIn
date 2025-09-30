import { OfferingCategory, OfferingStatus } from "../../utils/enum";
import { createDefaults } from "../formConfigs/opportunityConfig";

// Offer section mappers (form <-> api)
export const OFFER_MAPPERS = {
  [OfferingCategory.LOGO_STREAM]: {
    formKey: "streaming",
    toForm: (offer) => ({
      enabled: true,
      platform: offer.platform?.toLowerCase() || "",
      timeMode: offer.time_mode || "",
      size: offer.size || "",
    }),
    toApi: (form) => ({
      ...(form.platform && { platform: form.platform.toUpperCase() }),
      ...(form.timeMode && { time_mode: form.timeMode }),
      ...(form.size && { size: form.size }),
    }),
  },

  [OfferingCategory.VIDEO_COMMERCIAL]: {
    formKey: "videoCommercial",
    toForm: (offer) => ({
      enabled: true,
      platform: offer.platform?.toLowerCase() || "",
      timeMode: offer.time_mode || "",
      duration: offer.duration || "",
      repetation: offer.repetition || "",
      size: offer.size || "",
    }),
    toApi: (form) => ({
      ...(form.platform && { platform: form.platform.toUpperCase() }),
      ...(form.timeMode && { time_mode: form.timeMode }),
      ...(form.duration && { duration: form.duration }),
      ...(form.repetation && { repetition: form.repetation }),
      ...(form.size && { size: form.size }),
    }),
  },

  [OfferingCategory.SOCIAL_POST]: {
    formKey: "socialMedia",
    toForm: (offer) => ({
      enabled: true,
      platform: offer.platform?.toLowerCase() || "",
      timeMode: offer.time_mode || "",
      size: offer.size || "",
    }),
    toApi: (form) => ({
      ...(form.platform && { platform: form.platform.toUpperCase() }),
      ...(form.timeMode && { time_mode: form.timeMode }),
      ...(form.size && { size: form.size }),
    }),
  },

  [OfferingCategory.MERCHANDISE]: {
    formKey: "merchProducts",
    toForm: (offer) => ({
      enabled: true,
      platform: offer.platform?.toLowerCase() || "",
      timeMode: offer.time_mode || "",
      types: offer.sub_type || "",
    }),
    toApi: (form) => ({
      ...(form.platform && { platform: form.platform.toUpperCase() }),
      ...(form.timeMode && { time_mode: form.timeMode }),
      ...(form.types && { sub_type: form.types }),
    }),
  },
};

// Top-level fields mappers (form <-> api)
export const FIELD_MAPPERS = {
  dateTitle: {
    toForm: (api) => ({
      startDate: api?.start_date || null,
      endDate: api?.end_date || null,
      title: api?.title || "",
      description: api?.description || "",
    }),
    toApi: (form) => ({
      ...(form.title && { title: form.title }),
      ...(form.description && { description: form.description }),
      ...(form.startDate && { start_date: form.startDate }),
      ...(form.endDate && { end_date: form.endDate }),
    }),
  },
  terms: {
    toForm: (api) => ({ acknowledgement: api?.is_terms_signed ?? false }),
    toApi: (form) =>
      form.acknowledgement ? { is_terms_signed: form.acknowledgement } : {},
  },
  price: {
    toForm: (api) => ({
      choosePrice: api?.offering_price?.price || "",
      gameinFee: api?.offering_price?.platform_fee || "",
      gameinTax: api?.offering_price?.tax || "",
      paymentType:
        api?.offering_price?.payment_provider?.toLowerCase() || "manual",
    }),
    toApi: (form) => ({
      ...(form.choosePrice && { price: form.choosePrice }),
      ...(form.gameinFee && { platform_fee: form.gameinFee }),
      ...(form.gameinTax && { tax: form.gameinTax }),
      ...(form.paymentType && {
        payment_provider: form.paymentType.toUpperCase(),
      }),
    }),
  },
  event: {
    toForm: (api) => ({
      type: api?.event_type || "",
      game: api?.game || "",
    }),
    toApi: (form) => ({
      ...(form.type && { event_type: form.type }),
      ...(form.game && { game: form.game }),
    }),
  },
};

export const buildFormValues = (api) => {
  const base = createDefaults();

  let formValues = {
    ...base,
    sponsorEdit: api?.can_edit ?? false,
    note: api?.notes || "",
    uploadLogo: null,
  };

  // top-level fields
  for (const [key, { toForm }] of Object.entries(FIELD_MAPPERS)) {
    formValues[key] = toForm(api);
  }

  // offers
  if (api?.offering_offers?.length) {
    api.offering_offers.forEach((offer) => {
      const mapper = OFFER_MAPPERS[offer.offer_type];
      if (mapper) {
        formValues[mapper.formKey] = mapper.toForm(offer);
      }
    });
  }

  return formValues;
};

export const buildOfferingPayload = (data) => {
  const payload = {
    offering: {
      type: "INDIVIDUAL",
      status: OfferingStatus.DRAFT,
      ...(data.sponsorEdit !== undefined && { can_edit: data.sponsorEdit }),
    },
    offers: [],
    price: {},
  };

  // top-level fields (excluding price)
  for (const [key, { toApi }] of Object.entries(FIELD_MAPPERS)) {
    if (key === "price") continue;
    if (data[key]) {
      Object.assign(payload.offering, toApi(data[key]));
    }
  }

  // offers
  Object.entries(OFFER_MAPPERS).forEach(([category, { formKey, toApi }]) => {
    if (data[formKey]?.enabled) {
      payload.offers.push({ offer_type: category, ...toApi(data[formKey]) });
    }
  });

  // price section
  if (data.price) {
    payload.price = FIELD_MAPPERS.price.toApi(data.price);
  }

  return payload;
};
