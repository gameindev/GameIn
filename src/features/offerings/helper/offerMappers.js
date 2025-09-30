// src/features/offerings/mappers/offerMappers.js
import { OfferingCategory } from "../../../utils/enum";

export const OFFER_MAPPERS = {
  [OfferingCategory.LOGO_STREAM]: {
    key: "streaming",
    fromApi: (o = {}) => ({
      enabled: true,
      platform: o?.platform?.toLowerCase() || "",
      timeMode: o?.time_mode || "",
      size: o?.size || "",
    }),
    toApi: (f = {}) => ({
      ...(f?.platform && { platform: f.platform.toUpperCase() }),
      ...(f?.timeMode && { time_mode: f.timeMode }),
      ...(f?.size && { size: f.size }),
    }),
  },

  [OfferingCategory.VIDEO_COMMERCIAL]: {
    key: "videoCommercial",
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
      ...(f?.size && { size: f.size }),
    }),
  },

  [OfferingCategory.SOCIAL_POST]: {
    key: "socialMedia",
    fromApi: (o = {}) => ({
      enabled: true,
      platform: o?.platform?.toLowerCase() || "",
      timeMode: o?.time_mode || "",
      size: o?.size || "",
    }),
    toApi: (f = {}) => ({
      ...(f?.platform && { platform: f.platform.toUpperCase() }),
      ...(f?.timeMode && { time_mode: f.timeMode }),
      ...(f?.size && { size: f.size }),
    }),
  },

  [OfferingCategory.MERCHANDISE]: {
    key: "merchProducts",
    fromApi: (o = {}) => ({
      enabled: true,
      platform: o?.platform?.toLowerCase() || "",
      timeMode: o?.time_mode || "",
      types: o?.sub_type || "",
    }),
    toApi: (f = {}) => ({
      ...(f?.platform && { platform: f.platform.toUpperCase() }),
      ...(f?.timeMode && { time_mode: f.timeMode }),
      ...(f?.types && { sub_type: f.types }),
    }),
  },
};
