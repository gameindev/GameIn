import { useOfferExpiry } from "../hooks/useOfferExpiry";
import { Text } from "@mantine/core";
import { theme } from "../../../shared/styles/theme/customTheme";

const ExpiryTimer = ({ lastAdjustedAt }) => {
    const { expired, timeRemaining } = useOfferExpiry(lastAdjustedAt);

    return (
        <Text fz="lg" align="right">
            Time Remaining:
            <br aria-hidden="true" />
            <Text
                component="span"
                c={expired ? "red" : theme.colors.primary[0]}
                fw={700}
            >
                {" "}
                {timeRemaining || "Expired"}
            </Text>
        </Text>
    );
};

export default ExpiryTimer;