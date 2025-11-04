import { IconFlame, IconStar } from "@tabler/icons-react";
import CreatorBanner from "../../../assets/search/creator-search-cover.jpg";
import BrandBanner from "../../../assets/search/brand-search-cover.jpg";

export const userTypeDataMapper = {
    creator: {
        name: "CREATORS",
        icon: <IconStar size="1.5em" />,
        coverImage: CreatorBanner,
    },
    brand: {
        name: "BRANDS",
        icon: <IconFlame size="1.5em" />,
        coverImage: BrandBanner,
    },
};