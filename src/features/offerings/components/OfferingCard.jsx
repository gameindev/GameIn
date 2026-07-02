import { Box, Grid, rgba, Text } from "@mantine/core";
import { OfferingStatus } from "../../../shared/enums/offeringStatusEnum";
import { useEditLock } from "../hooks/useEditLock";
import StatBox from "../../../shared/components/StatBox";
import IconButton from "../../../shared/components/IconButton";
import routePaths from "../../../app/router/routes";
import { theme } from "../../../shared/styles/theme/customTheme";
import OfferList from "./OfferList";
import ExpiryTimer from "./ExpiryTimer";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { offeringService } from "../services";
import { OfferingCardContent } from "../styles/offering-card-style";

const OfferingCard = ({
  offering,
  isSelf,
  userProfile,
  showAllVersions,
  navigate,
  user,
}) => {
  const { isBrand, timerActive, expired, hasReset, isAccepted } = useEditLock({
    offering,
    user,
  });
  const isOwner = offering.offering_offers.some(
    (owner) => owner.updated_by_user_id === user.id,
  );
  // const price = offering.offering_price?.price || "0";

  const latestPrice = offeringService.getLatestPrice(offering?.offering_prices);
  const previousPrice = (offering.offering_prices || [])
    .filter((price) => price.version < (latestPrice?.version ?? 0))
    .sort((a, b) => b.version - a.version)[0];
  const priceChanged =
    previousPrice?.price &&
    latestPrice?.price &&
    previousPrice.price !== latestPrice.price;
  const [priceMajor = "0", priceMinor = "00"] = String(
    latestPrice?.price ?? "0",
  ).split(".");

  const canShowSponsorButton =
    isBrand &&
    !isSelf &&
    !isAccepted &&
    (offering.status === OfferingStatus.DRAFT ||
      offering.status === OfferingStatus.DISMISSED ||
      (isOwner && !timerActive));

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
                    offering.id,
                  ),
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
              userProfile?.username,
            ).replace(":offeringId", offering.id),
          )
        }
        background={`repeating-linear-gradient(
          45deg, ${rgba(theme.colors.white[0], 0.05)}, ${rgba(theme.colors.white[0], 0.05)} 1px,
          transparent 1px, transparent 10px
        ), ${rgba(theme.colors.primary[0], 0.15)}`}
      >
        <OfferingCardContent>
          <div className={`offering-price ${priceChanged ? "price-changed" : ""}`}>
            <span className="currency">$</span>
            <span className="price-major">{priceMajor}</span>
            <span className="price-minor">.{priceMinor.padEnd(2, "0").slice(0, 2)}</span>
          </div>
            <Text className="offering-title" lineClamp={1}>
              {offering.title}
            </Text>
            <Text className="offering-description" lineClamp={2}>
              {offering.description}
            </Text>

            <Text className="offering-label">
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
                  {isBrand
                    ? "Sponsorship locked — available again soon"
                    : "Adjusted by Brand, negotiation ongoing"}
                </Text>
              </Box>
            )}
          {offering.last_adjusted_by?.id && (
            <Box mt="sm">
              <Text size="xs">
                {offering.last_adjusted_by?.user_type === USERTYPES.CREATOR
                  ? "Changes made by Creator"
                  : "Changes made by Brand"}
              </Text>
            </Box>
          )}
        </OfferingCardContent>
      </StatBox>
    </Grid.Col>
  );
};

export default OfferingCard;
