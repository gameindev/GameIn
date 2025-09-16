import { OfferingCategory, OfferingStatus } from "../../utils/enum";

export const OFFER_SECTIONS = [
  {
    type: "streaming",
    category: OfferingCategory.LOGO_STREAM,
    map: (d) => ({
      ...(d.platform && { platform: d.platform.toUpperCase() }),
      ...(d.timeMode && { time_mode: d.timeMode }),
      ...(d.size && { size: d.size }),
    }),
  },
  {
    type: "videoCommercial",
    category: OfferingCategory.VIDEO_COMMERCIAL,
    map: (d) => ({
      ...(d.platform && { platform: d.platform.toUpperCase() }),
      ...(d.timeMode && { time_mode: d.timeMode }),
      ...(d.duration && { duration: d.duration }),
      ...(d.repetation && { repetition: d.repetation }), // 🟢 fixed typo here
      ...(d.size && { size: d.size }),
    }),
  },
  {
    type: "socialMedia",
    category: OfferingCategory.SOCIAL_POST,
    map: (d) => ({
      ...(d.platform && { platform: d.platform.toUpperCase() }),
      ...(d.timeMode && { time_mode: d.timeMode }),
      ...(d.size && { size: d.size }),
    }),
  },
  {
    type: "merchProducts",
    category: OfferingCategory.MERCHANDISE,
    map: (d) => ({
      ...(d.platform && { platform: d.platform.toUpperCase() }),
      ...(d.timeMode && { time_mode: d.timeMode }),
      ...(d.types && { sub_type: d.types }),
    }),
  },
];

export const buildOfferingPayload = (data) => ({
  offering: {
    type: "INDIVIDUAL",
    status: OfferingStatus.DRAFT,
    ...(data.dateTitle.title && { title: data.dateTitle.title }),
    ...(data.dateTitle.description && { description: data.dateTitle.description }),
    ...(data.dateTitle.startDate && { start_date: data.dateTitle.startDate }),
    ...(data.dateTitle.endDate && { end_date: data.dateTitle.endDate }),
    ...(data.terms.acknowledgement && { is_terms_signed: data.terms.acknowledgement }),
    ...(data.sponsorEdit !== undefined && { can_edit: data.sponsorEdit }),
  },
  offers: OFFER_SECTIONS
    .map(({ type, category, map }) =>
      data[type]?.enabled ? { offer_type: category, ...map(data[type]) } : null
    )
    .filter(Boolean),
  price: {
    ...(data.price.choosePrice && { price: data.price.choosePrice }),
    ...(data.price.gameinFee && { platform_fee: data.price.gameinFee }),
    ...(data.price.gameinTax && { tax: data.price.gameinTax }),
    ...(data.price.paymentType && {
      payment_provider: data.price.paymentType.toUpperCase(),
    }),
  },
});
