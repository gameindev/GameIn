import { PasswordInput, TextInput } from "@mantine/core";
import { IconFlame, IconStar, IconSunLow } from "@tabler/icons-react";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";

export const fieldsMapper = [
    {
        name: "identifier",
        label: "Username or email address",
        placeholder: "Your username or email address",
        component: TextInput,
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Your password",
        component: PasswordInput,
    },
];


export const stepOneFieldsMapper = [
    {
        name: "email",
        label: "E-mail",
        placeholder: "Enter your email",
        component: TextInput,
    },
    {
        name: "username",
        label: "Username",
        placeholder: "Enter your username",
        component: TextInput,
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Create a password",
        component: PasswordInput,
    },
]



export const stepTwoFieldsMapper = [
    {
        icon: IconStar,
        label: "Creator",
        value: USERTYPES.CREATOR,
        description: "Create and share content with your audience.",
    },
    {
        icon: IconFlame,
        label: "Brand",
        value: USERTYPES.BRAND,
        description: "Promote your products or services effectively.",
    },
    {
        icon: IconSunLow,
        label: "Community",
        value: USERTYPES.COMMUNITY,
        description: "Build and engage with your community.",
    },
];
