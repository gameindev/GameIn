import { Box, Divider, Flex, rem, Text } from "@mantine/core";
import { offeringService } from "../../offerings/services";
import { theme } from "../../../shared/styles/theme/customTheme";
import { formatDate, getTimeRemaining } from "../utils/date.helper";
import OfferList from "../../offerings/components/OfferList";
import { OfferingStatus } from "../../../shared/enums/offeringStatusEnum";
import OfferStatusBox from "./OfferStatusBox";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";

const SponsorshipDetails = ({
  sponsorship,
  user,
  theme,
  onAccept,
  onNegotiate,
  onReject
}) => {
  const offers = offeringService.getLatestOffers(
    sponsorship.offering_offers || []
  );

  return (
    <Box py={rem(72)} px={rem(70)}>
      <Flex gap="3rem">
        {/* LEFT SIDE */}
        <Box flex={2}>
          <Text c={theme.colors.white[0]} size="lg" fw={500} mb="xs">
            {user.username.toUpperCase()} {sponsorship.type} PACKAGE
          </Text>
          <Text c={theme.colors.white[0]} size="sm" mb="md">
            {sponsorship.description}
          </Text>

          <Text size="2.5em" fw={700}>
            ${sponsorship.offering_price?.price}
          </Text>

          <Text size="sm" my={20}>
            Expected Start:
            <Text
              span
              fz={theme.fontSizes.xl}
              c={theme.colors.primary[0]}
              display="block"
            >
              {formatDate(sponsorship.start_date)}
            </Text>
          </Text>

          <Text size="sm" my={20}>
            Time Remaining:
            <Text
              span
              fz={theme.fontSizes.xl}
              c={theme.colors.primary[0]}
              display="block"
            >
              {getTimeRemaining(sponsorship.end_date)}
            </Text>
          </Text>
        </Box>

        {/* MIDDLE SIDE */}
        <Box flex={2}>
          <Text fw={600} size="sm" mb="sm" c={theme.colors.primary[0]}>
            OFFERING DETAILS
          </Text>

          <OfferList
            offers={sponsorship.offering_offers}
            allOffers={sponsorship.offering_offers}
            colorScheme={theme}
          />

          <Divider my="md" />
        </Box>

        {/* RIGHT SIDE */}
        {sponsorship.status !== OfferingStatus.DRAFT &&
          sponsorship.status !== OfferingStatus.ACCEPTED &&
          sponsorship.status !== OfferingStatus.SPONSORED &&
          user.user_type === USERTYPES.CREATOR && (
            <OfferStatusBox
              theme={theme}
              onAccept={onAccept}
              onNegotiate={onNegotiate}
              onReject={onReject}
              sponsorshipId={sponsorship?.id}
            />
          )}
      </Flex>
    </Box>
  );
};

export default SponsorshipDetails;
