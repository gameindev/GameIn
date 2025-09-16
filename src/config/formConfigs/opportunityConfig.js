import streamingLogo from "../../assets/accounts/offerings/streaming-logo.png";
import commercialBreak from "../../assets/accounts/offerings/commercial-break.png";
import socialMediaPost from "../../assets/accounts/offerings/social-media-post.png";
import merchProducts from "../../assets/accounts/offerings/merch-products.png";

export const sections = [
  {
    number: "01",
    title: "STREAMING LOGO PLACEMENT",
    description: "You are offering to place a brand logo in your live stream",
    type: "streaming",
    image: streamingLogo,
  },
  {
    number: "02",
    title: "VIDEO: COMMERCIAL BREAK",
    description: "You are offering to generate product ads in your videos",
    type: "videoCommercial",
    image: commercialBreak,
  },
  {
    number: "03",
    title: "SOCIAL MEDIA POSTING",
    description:
      "You are offering to place branded posts in your social media accounts",
    type: "socialMedia",
    image: socialMediaPost,
  },
  {
    number: "04",
    title: "MERCH, CLOTHING, PRODUCTS",
    description:
      "You are offering to place advertisings in your social media accounts",
    type: "merchProducts",
    image: merchProducts,
  },
];

const createDefaults = (overrides = {}) => ({
  streaming: { enabled: false, platform: "", timeMode: "", size: "" },
  videoCommercial: {
    enabled: false,
    platform: "",
    timeMode: "",
    size: "",
    duration: "",
    repetation: "",
  },
  socialMedia: { enabled: false, platform: "", timeMode: "", size: "" },
  merchProducts: { enabled: false, platform: "", timeMode: "", types: "" },
  dateTitle: { startDate: null, endDate: null, title: "", description: "" },
  price: {
    choosePrice: "",
    gameinFee: "00.00",
    gameinTax: "00.00",
    paymentType: "PAYPAL",
  },
  terms: { acknowledgement: false },
  sponsorEdit: false,
  ...overrides,
});

export const defaultValues = createDefaults();

export const editDefaultValues = createDefaults({
  sponsorEdit: true,
  note: `Dear creator XYZ,
  We like your content and want to support this tournament! We are looking for a permanent Logo Placement throughout the tournament and a Commercial Break after every game, therefore we can skip all social media posts or merch. We uploaded all the data for you to download here: https://www.googledrive... We are looking forward to work with you!,`,
  uploadLogo: null,
});

export const FORM_CONFIG = {
  platforms: [
    { value: "twitch", label: "Twitch" },
    { value: "instagram", label: "Instagram" },
    { value: "x", label: "X (Twitter)" },
    { value: "youtube", label: "YouTube" },
    { value: "tiktok", label: "TikTok" },
    { value: "discord", label: "Discord" },
    { value: "kick", label: "Kick" },
    { value: "facebook", label: "Facebook" },
    { value: "snapchat", label: "Snapchat" },
    { value: "pinterest", label: "Pinterest" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "threads", label: "Threads" },
    { value: "others", label: "Others" },
  ],
  durations: [
    { value: "15s", label: "15s" },
    { value: "30s", label: "30s" },
    { value: "60s", label: "60s" },
    { value: "90s", label: "90s" },
    { value: "custom", label: "Custom" },
  ],
  postTypes: [
    { value: "clothing", label: "Clothing" },
    { value: "accessories", label: "Accessories" },
    { value: "gamingGear", label: "Gaming Gear" },
    { value: "inGameItems", label: "In-Game Items" },
    { value: "beautyWellness", label: "Beauty & Wellness" },
    { value: "collectibles", label: "Collectibles" },
    { value: "digitalProducts", label: "Digital Products" },
    { value: "custom", label: "Custom" },
  ],
  paymentTypes: [
    { value: "stripe", label: "Stripe" },
    { value: "paypal", label: "PayPal" },
    { value: "razorpay", label: "RazorPay" },
    { value: "manual", label: "Manual" },
  ],
  eventTypes: [
    { value: "tournament", label: "Tournament" },
    { value: "league", label: "League" },
    { value: "event", label: "Event" },
  ],
  chooseGame: [
    { value: "game1", label: "Game 1" },
    { value: "game2", label: "Game 2" },
    { value: "game3", label: "Game 3" },
  ],
};

export const TIME_MODE_CONFIG = {
  streaming: [
    { value: "timespan", label: "Time span" },
    { value: "starttoend", label: "Start to End" },
    { value: "perhour", label: "Per Hour" },
    { value: "eventtrigger", label: "Event Trigger" },
    { value: "fixedfrequency", label: "Fixed Frequency" },
  ],
  videoCommercial: [
    { value: "shoutout", label: "Shoutout" },
    { value: "adsegment", label: "Ad Segment" },
    { value: "productreview", label: "Product Review" },
    { value: "visualOverlay", label: "Visual Overlay" },
    { value: "sponsored", label: "Sponsor Intro/Outro" },
    { value: "custom", label: "custom" },
  ],
  socialMedia: [
    { value: "timespan", label: "Time span" },
    { value: "introonly", label: "Intro Only" },
    { value: "outroonly", label: "Outro Only" },
    { value: "flashmention", label: "Flash Mention" },
    { value: "pinnedoverlay", label: "Pinned Overlay" },
    { value: "hashtagonly", label: "Hashtag Only" },
    { value: "custom", label: "custom" },
  ],
  merchProducts: [
    { value: "timespan", label: "Time span" },
    { value: "introonly", label: "Intro Only" },
    { value: "outroonly", label: "Outro Only" },
    { value: "singleappr", label: "Single Appearance" },
    { value: "highlightmom", label: "Highlight Moment" },
    { value: "pinnedpost", label: "Pinned Post/Tag" },
    { value: "custom", label: "custom" },
  ],
  default: [
    { value: "live", label: "Live" },
    { value: "pre-recorded", label: "Pre-recorded" },
    { value: "shoutout", label: "Shout out" },
  ],
};

export const LOGO_SIZES_CONFIG = {
  streaming: [
    { value: "100px", label: "100px" },
    { value: "150px", label: "150px" },
    { value: "200px", label: "200px" },
    { value: "250px", label: "250px" },
    { value: "300px", label: "300px" },
    { value: "fullwidth", label: "Full Width" },
    { value: "custom", label: "Custom" },
  ],
  videoCommercial: [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "wide", label: "Wide" },
    { value: "fullscreen", label: "Full Screen" },
    { value: "custom", label: "Custom" },
  ],
  socialMedia: [
    { value: "portrait", label: "Portrait" },
    { value: "square", label: "Square" },
    { value: "landscape", label: "Landscape" },
    { value: "smallbadge", label: "Small Badge" },
    { value: "fulltakeover", label: "FullScreen Takeover" },
    { value: "custom", label: "Custom" },
  ],
  merchProducts: [],
  default: [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ],
};
