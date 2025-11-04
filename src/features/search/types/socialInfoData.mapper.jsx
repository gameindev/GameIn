import { IconBrandInstagram, IconBrandTwitch, IconBrandTwitter, IconBrandYoutube, IconDeviceGamepad, IconMusic } from "@tabler/icons-react";
import {theme} from "../../../shared/styles/theme/customTheme"

export const SocialInfo = [
    {
        text: "Twitch",
        icon: <IconBrandTwitch size={theme.spacing.xs} />,
        followers: "35K",
        color: "primary",
    },
    {
        text: "Instagram",
        icon: <IconBrandInstagram size={theme.spacing.xs} />,
        followers: "35K",
        color: "primary",
    },
    {
        text: "Twitter",
        icon: <IconBrandTwitter size={theme.spacing.xs} />,
        followers: "35K",
        color: "skyblue",
    },
    {
        text: "Youtube",
        icon: <IconBrandYoutube size={theme.spacing.xs} />,
        followers: "35K",
        color: "skyblue",
    },
    {
        text: "Tiktok",
        icon: <IconMusic size={theme.spacing.xs} />,
        followers: "35K",
        color: "secondary",
    },
    {
        text: "Discord",
        icon: <IconDeviceGamepad size={theme.spacing.xs} />,
        followers: "35K",
        color: "secondary",
    },
];