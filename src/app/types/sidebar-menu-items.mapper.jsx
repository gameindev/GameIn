import {
    IconFlame,
    IconHome,
    IconNews,
    IconSettings2,
    IconStar,
} from "@tabler/icons-react";
import routePaths from "../router/routes";
import { Bell, CreditCard, Plug2, Shield, User } from "lucide-react";


export const sidebarItems = [
    {
        icon: <IconHome size="1em" />,
        label: "Account",
        active: false,
        link: routePaths.ACCOUNTS.DASHBOARD.ROOT,
    },
    {
        icon: <IconNews size="1em" />,
        label: "News Feed",
        active: false,
        link: routePaths.ACCOUNTS.NEWSFEED.ROOT,
    },
    {
        icon: <IconStar size="1em" />,
        label: "Creators",
        active: false,
        link: routePaths.SEARCH.replace(":userType", "creator"),
    },
    {
        icon: <IconFlame size="1em" />,
        label: "Brands",
        active: false,
        link: routePaths.SEARCH.replace(":userType", "brand"),
    },
    {
        icon: <IconSettings2 size="1em" />,
        label: "Settings",
        active: false,
        link: '#',
        children: [
            {
                icon: <User size="1em" />,
                label: "Account",
                active: false,
                link: routePaths.SETTINGS.ACCOUNT,
            },
            {
                icon: <Plug2 size="1em" />,
                label: "Integrations",
                active: false,
                link: routePaths.SETTINGS.INTEGRATIONS,
            },
            {
                icon: <Bell size="1em" />,
                label: "Notifications",
                active: false,
                link: routePaths.SETTINGS.NOTIFICATIONS,
            },
            {
                icon: <Shield size="1em" />,
                label: "Privacy",
                active: false,
                link: routePaths.SETTINGS.PRIVACY,
            },
            {
                icon: <CreditCard size="1em" />,
                label: "Payments",
                active: false,
                link: routePaths.SETTINGS.PAYMENTS,
            },
        ],
    },
];