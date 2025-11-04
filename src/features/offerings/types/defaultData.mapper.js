import { OfferingCategory } from "../../../shared/enums/offeringCategoryEnum";



export const createDefaultData = (overrides = {}) => ({
    [OfferingCategory.LOGO_STREAM]: {
        enabled: false,
        platform: "",
        timeMode: "",
        schedule: "",
        size: "",
    },
    [OfferingCategory.VIDEO_COMMERCIAL]: {
        enabled: false,
        platform: "",
        timeMode: "",
        size: "",
        duration: "",
        schedule: "",
        repetation: "",
    },
    [OfferingCategory.SOCIAL_POST]: {
        enabled: false,
        platform: "",
        timeMode: "",
        schedule: "",
        size: "",
    },
    [OfferingCategory.MERCHANDISE]: {
        enabled: false,
        platform: "",
        timeMode: "",
        schedule: "",
        types: "",
    },
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


export const defaultValues = createDefaultData();


export const editDefaultValues = createDefaultData({
    sponsorEdit: true,
    note: `Dear creator XYZ,
  We like your content and want to support this tournament! We are looking for a permanent Logo Placement throughout the tournament and a Commercial Break after every game, therefore we can skip all social media posts or merch. We uploaded all the data for you to download here: https://www.googledrive... We are looking forward to work with you!,`,
    uploadLogo: null,
});