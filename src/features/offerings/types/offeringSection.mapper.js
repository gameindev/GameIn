import { OfferingCategory } from "../../../shared/enums/offeringCategoryEnum";
import streamingLogo from "../../../assets/accounts/offerings/streaming-logo.png";
import commercialBreak from "../../../assets/accounts/offerings/commercial-break.png";
import socialMediaPost from "../../../assets/accounts/offerings/social-media-post.png";
import merchProducts from "../../../assets/accounts/offerings/merch-products.png";


export const offeringSectionMapper = [
    {
        number: "01",
        title: "STREAMING LOGO PLACEMENT",
        description: "You are offering to place a brand logo in your live stream",
        type: OfferingCategory.LOGO_STREAM,
        image: streamingLogo,
    },
    {
        number: "02",
        title: "VIDEO: COMMERCIAL BREAK",
        description: "You are offering to generate product ads in your videos",
        type: OfferingCategory.VIDEO_COMMERCIAL,
        image: commercialBreak,
    },
    {
        number: "03",
        title: "SOCIAL MEDIA POSTING",
        description:
            "You are offering to place branded posts in your social media accounts",
        type: OfferingCategory.SOCIAL_POST,
        image: socialMediaPost,
    },
    {
        number: "04",
        title: "MERCH, CLOTHING, PRODUCTS",
        description:
            "You are offering to place advertisings in your social media accounts",
        type: OfferingCategory.MERCHANDISE,
        image: merchProducts,
    },
];