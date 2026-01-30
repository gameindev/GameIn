import { OfferingCategory } from "../../../shared/enums/offeringCategoryEnum";


export const LOGO_SIZES_CONFIG = {
    [OfferingCategory.LOGO_STREAM]: [
        { value: "100px", label: "100px" },
        { value: "150px", label: "150px" },
        { value: "200px", label: "200px" },
        { value: "250px", label: "250px" },
        { value: "300px", label: "300px" },
        { value: "fullwidth", label: "Full Width" },
    ],
    [OfferingCategory.VIDEO_COMMERCIAL]: [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "wide", label: "Wide" },
        { value: "fullscreen", label: "Full Screen" },
    ],
    [OfferingCategory.SOCIAL_POST]: [
        { value: "portrait", label: "Portrait" },
        { value: "square", label: "Square" },
        { value: "landscape", label: "Landscape" },
        { value: "smallbadge", label: "Small Badge" },
        { value: "fulltakeover", label: "FullScreen Takeover" },
    ],
    [OfferingCategory.MERCHANDISE]: [],
    default: [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
    ],
};
