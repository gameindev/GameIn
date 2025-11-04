import { OfferingCategory } from "../../../shared/enums/offeringCategoryEnum";


export const TIME_MODE_CONFIG = {
    [OfferingCategory.LOGO_STREAM]: [
        { value: "timespan", label: "Time span" },
        { value: "starttoend", label: "Start to End" },
        { value: "perhour", label: "Per Hour" },
        { value: "eventtrigger", label: "Event Trigger" },
        { value: "fixedfrequency", label: "Fixed Frequency" },
    ],
    [OfferingCategory.VIDEO_COMMERCIAL]: [
        { value: "shoutout", label: "Shoutout" },
        { value: "adsegment", label: "Ad Segment" },
        { value: "productreview", label: "Product Review" },
        { value: "visualOverlay", label: "Visual Overlay" },
        { value: "sponsored", label: "Sponsor Intro/Outro" },
        { value: "custom", label: "custom" },
    ],
    [OfferingCategory.SOCIAL_POST]: [
        { value: "timespan", label: "Time span" },
        { value: "introonly", label: "Intro Only" },
        { value: "outroonly", label: "Outro Only" },
        { value: "flashmention", label: "Flash Mention" },
        { value: "pinnedoverlay", label: "Pinned Overlay" },
        { value: "hashtagonly", label: "Hashtag Only" },
        { value: "custom", label: "custom" },
    ],
    [OfferingCategory.MERCHANDISE]: [
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