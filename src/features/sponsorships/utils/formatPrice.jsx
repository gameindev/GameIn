import { Text } from "@mantine/core";
import { theme } from "../../../shared/styles/theme/customTheme";

export const formatStyledPrice = (price) => {
    const [whole, decimal] = Number(price).toFixed(2).split(".");

    return (
        <Text
            component="span"
            fz={theme.fontSizes.lg}
            fw={700}
            c={theme.colors.primary[0]}
        >
            ${whole}.
            <Text
                component="span"
                fz={theme.fontSizes.sm}
                fw={400}
                c="teal"
                style={{ opacity: 0.8 }}
            >
                {decimal}
            </Text>
        </Text>
    );
};
