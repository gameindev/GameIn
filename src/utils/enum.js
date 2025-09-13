export const USERTYPES = {
  CREATOR: "CREATOR",
  BRAND: "BRAND",
  COMMUNITY: "COMMUNITY",
  ADMIN: "ADMIN",
};

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];
export const MAX_FILE_SIZE_MB = 1;

export const OfferingStatus = {
  DRAFT: "DRAFT",
  OFFERED: "OFFERED",
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  COMPLETED: "COMPLETED",
  DISMISSED: "DISMISSED",
};

export const OfferingType = {
  INDIVIDUAL: "INDIVIDUAL",
  PRIZE_POOLED: "PRIZE_POOLED",
};

export const PaymentProvider = {
  STRIPE: "STRIPE",
  PAYPAL: "PAYPAL",
  RAZORPAY: "RAZORPAY",
  MANUAL: "MANUAL",
};

export const OfferingCategory = {
  LOGO_STREAM: "LOGO_STREAM",
  VIDEO_COMMERCIAL: "VIDEO_COMMERCIAL",
  SOCIAL_POST: "SOCIAL_POST",
  MERCHANDISE: "MERCHANDISE",
};

export const SocialPlatform = {
  TWITCH: "TWITCH",
  INSTAGRAM: "INSTAGRAM",
  X: "X",
  YOUTUBE: "YOUTUBE",
  TIKTOK: "TIKTOK",
  DISCORD: "DISCORD",
  KICK: "KICK",
  FACEBOOK: "FACEBOOK",
  SNAPCHAT: "SNAPCHAT",
  PINTEREST: "PINTEREST",
  LINKEDIN: "LINKEDIN",
  THREADS: "THREADS",
  OTHER: "OTHER",
};
