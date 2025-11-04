import { Box, Flex, Grid, Text } from "@mantine/core";
import { OfferingStatus } from "../../../shared/enums/offeringStatusEnum";
import { useEditLock } from "../hooks/useEditLock";
import StatBox from "../../../shared/components/StatBox";
import IconButton from "../../../shared/components/IconButton";
import routePaths from "../../../app/router/routes";
import { theme } from "../../../shared/styles/theme/customTheme";
import OfferList from "./OfferList";
import ExpiryTimer from "./ExpiryTimer";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";



const OfferingCard = ({
    offering,
    isSelf,
    userProfile,
    showAllVersions,
    navigate,
    user,
}) => {
    const { isBrand, timerActive, expired, hasReset } = useEditLock({
        offering,
        user,
    });

    const price = offering.offering_price?.price || "0";

    const canShowSponsorButton =
        isBrand &&
        !isSelf &&
        (expired ||
            !timerActive ||
            offering.status === OfferingStatus.DRAFT ||
            offering.status === OfferingStatus.DISMISSED);

    return (
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <StatBox
                title={`S${String(offering.id).padStart(2, "0")}`}
                action={
                    isSelf ? (
                        <IconButton
                            hoverClass="hoverYellow"
                            onClick={() =>
                                navigate(
                                    routePaths.ACCOUNTS.OFFERINGS.FPP_EDIT_OFFERING.replace(
                                        ":offeringId",
                                        offering.id
                                    )
                                )
                            }
                        />
                    ) : null
                }
                actionCTA={canShowSponsorButton}
                onSponsorClick={() =>
                    navigate(
                        routePaths.ACCOUNTS.OFFERINGS.TPP_EDIT_OFFERING.replace(
                            ":username",
                            userProfile?.username
                        ).replace(":offeringId", offering.id)
                    )
                }
                background={`repeating-linear-gradient(
          45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 1px,
          transparent 1px, transparent 10px
        ), rgba(92,229,176,0.15)`}
            >
                <Flex direction="column" h="100%">
                    <Box p="xl">
                        <Text c={theme.colors.white[0]} fw={700} size="lg" mb="xs">
                            $ {price}
                        </Text>
                        <Text fw={600} size="sm" mb={4} lineClamp={1}>
                            {offering.title}
                        </Text>
                        <Text size="xs" c="dimmed" mb="md" lineClamp={2}>
                            {offering.description}
                        </Text>

                        <Text c={theme.colors.primary[0]} fw={500} size="xs" mb={4}>
                            OFFERING:
                        </Text>
                        <OfferList
                            offers={offering.offering_offers}
                            allOffers={offering.offering_offers}
                            showAllVersions={showAllVersions}
                            colorScheme={theme}
                            resetFlag={hasReset}
                        />

                        {timerActive && (
                            <Box mt="sm">
                                <ExpiryTimer lastAdjustedAt={offering.last_adjusted_at} />
                                <Text size="xs" c={theme.colors.yellow[0]} mt={4} fw={500}>
                                    {isBrand ? "Sponsorship locked — available again soon" : "Adjusted by Brand, negotiation ongoing"}
                                </Text>
                            </Box>  
                        )}
                    </Box>

                    <Box style={{ flexGrow: 1 }} />

                    {offering.last_adjusted_by?.id && (
                        <Box px="xl">
                            <Text size="xs">{ offering.last_adjusted_by?.user_type === USERTYPES.CREATOR ? "Changes made by Creator" : "Changes made by Brand" }</Text>
                        </Box>
                    )}
                </Flex>
            </StatBox>
        </Grid.Col>
    );
};

export default OfferingCard;    