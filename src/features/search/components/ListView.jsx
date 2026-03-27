import { currentUser } from "../../auth/store/selector";
import { useAppSelector } from "../../../app/store/hooks";
import { useContext, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { SearchContext } from "../../../shared/context/searchContext";
import { getFollowerStats } from "../../../app/services/user/user-follower.service";
import AvatarSection from "../../../shared/components/AvatarSection";
import { Button, Group, RingProgress, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { SocialInfo } from "../types/socialInfoData.mapper";
import BadgeLevels from "../../../shared/components/svg-icons/LevelBadge";
import { Link, useNavigate } from "react-router";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { calculateAge } from "../../../shared/utils/helpers/calculateAge.helper";
import Verifed from "../../../shared/components/svg-icons/Verifed";
import Badge from "../../../shared/components/svg-icons/Badge";
import { ListviewStyles } from "../styles/listViewStyles";
import {
  IconChevronLeft,
  IconChevronRight,
  IconMessage,
  IconUser,
} from "@tabler/icons-react";
import FollowButton from "../../../shared/components/FollowButton";
import CountryFlag from "../../../shared/components/CountryFlag";
import IconButton from "../../../shared/components/IconButton";
import routeService from "../../../app/services/route/routeService";
import Separator from "../../../shared/components/Separator";
import { offeringService } from "../../offerings/services";
import { useOfferings } from "../../offerings/hooks/useOfferings";
import routePaths from "../../../app/router/routes";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const formatOfferingLabel = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

function CreatorOfferingsCarousel({
  offerings = [],
  loading = false,
  creatorUsername,
  navigate,
}) {
  const [embla, setEmbla] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!embla) return undefined;

    const syncIndex = () => setSelectedIndex(embla.selectedScrollSnap());
    syncIndex();
    embla.on("select", syncIndex);
    embla.on("reInit", syncIndex);

    return () => {
      embla.off("select", syncIndex);
      embla.off("reInit", syncIndex);
    };
  }, [embla]);

  if (loading && offerings.length === 0) {
    return (
      <div className="offerings_empty">
        <Text size="xs" c="dimmed">
          Loading offerings...
        </Text>
      </div>
    );
  }

  if (!offerings.length) {
    return (
      <div className="offerings_empty">
        <Text size="xs" c="dimmed">
          No offerings available
        </Text>
      </div>
    );
  }

  return (
    <div className="offering_shell">
      <div className="offering_nav_header">
        <Text size="10" className="offering_caption">
          SPONSORSHIP
        </Text>
        <div className="offering_nav" aria-label="Offering carousel controls">
          <button
            type="button"
            className="offering_nav_btn"
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous offering"
          >
            <IconChevronLeft size={12} />
          </button>

          <div className="offering_bullets">
            {offerings.map((offeringItem, index) => (
              <button
                key={offeringItem.id}
                type="button"
                className={`offering_bullet ${
                  selectedIndex === index ? "is-active" : ""
                }`}
                onClick={() => embla?.scrollTo(index)}
                aria-label={`Go to offering ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="offering_nav_btn"
            onClick={() => embla?.scrollNext()}
            aria-label="Next offering"
          >
            <IconChevronRight size={12} />
          </button>
        </div>
      </div>

      <Carousel
        className="offering_carousel"
        slideSize="100%"
        slideGap="xs"
        withIndicators={false}
        withControls={false}
        emblaOptions={{ loop: offerings.length > 1 }}
        getEmblaApi={setEmbla}
      >
        {offerings.map((offering) => {
        const latestPrice =
          offering?.offering_price ||
          offeringService.getLatestPrice(offering?.offering_prices || []);
        const latestOffers = offeringService.getLatestOffers(
          offering?.offering_offers || [],
        );
        const primaryOffer = latestOffers[0];
        const offerLabel = formatOfferingLabel(
          primaryOffer?.offer_type || offering?.title || "Sponsorship",
        );
        const platformLabel = primaryOffer?.platform || "-";
        const timeFrameLabel =
          primaryOffer?.time_mode || primaryOffer?.timeMode || "Flexible";
          const displayPrice =
          latestPrice?.price != null
            ? currencyFormatter.format(Number(latestPrice.price) || 0)
            : "Price on request";
        const openOffering = () => {
          if (!creatorUsername || !offering?.id) return;
          navigate(
            routePaths.ACCOUNTS.OFFERINGS.TPP_EDIT_OFFERING.replace(
              ":username",
              creatorUsername,
            ).replace(":offeringId", offering.id),
          );
        };

        return (
          <Carousel.Slide key={offering.id}>
            <div className="offering_slide">
              <div className="offering_left">
                <div className="offering_title_row">
                  <Text c="white" fw={700} size="xs" lineClamp={1} className="offering_title">
                    {offering?.title || offerLabel}
                  </Text>
                  <button
                    type="button"
                    className="offering_info_btn"
                    aria-label={`Open ${offering?.title || "offering"} details`}
                    onClick={openOffering}
                  >
                    ?
                  </button>
                </div>

                <div className="offering_meta_row">
                  <Text size="10" className="offering_meta_label">
                    platform
                  </Text>
                  <Text size="10" c="primary" fw={700} className="offering_meta_value" lineClamp={1}>
                    {platformLabel}
                  </Text>
                </div>

                <div className="offering_meta_row">
                  <Text size="10" className="offering_meta_label">
                    time frame
                  </Text>
                  <Text size="10" c="primary" fw={700} className="offering_meta_value" lineClamp={1}>
                    {timeFrameLabel}
                  </Text>
                </div>
              </div>

              <div className="offering_right">
                <Text c="primary" fw={700} size="lg" className="offering_price">
                  {displayPrice.replace(".00", "")}
                </Text>
              </div>
            </div>
          </Carousel.Slide>
        );
      })}
      </Carousel>
    </div>
  );
}

function ListRow({ userItem, user, userType, bigscreen, navigate }) {
  const { id, username, date_of_birth, is_verified } = userItem;
  const showOfferingsCarousel = userType?.toUpperCase() === USERTYPES.CREATOR;
  const {
    offerings: offeringsResponse,
    loading: offeringsLoading,
  } = useOfferings({
    userId: showOfferingsCarousel ? id : undefined,
  });

  const creatorOfferings = useMemo(
    () =>
      (offeringsResponse?.data?.data || []).map((offering) =>
        offeringService.processOfferingLatest(offering),
      ),
    [offeringsResponse],
  );

    const { totalFollowers } = getFollowerStats(userItem);
  const profile =
    userItem.creator_profile ||
    userItem.brand_profile ||
    userItem.community_profile;

  const avatarUrl =
    userItem.creator_profile?.profile_image?.path ||
    userItem.brand_profile?.profile_image?.path ||
    userItem.community_profile?.profile_image?.path;
  const profileImageUrl = avatarUrl
    ? `${import.meta.env.VITE_ASSET_URL}/${avatarUrl}`
    : null;
  const displayName =
    profile?.first_name || profile?.last_name
      ? `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim()
      : profile?.brand_name || username || "";

  return (
    <ListviewStyles key={id}>
      <AvatarSection
        className="avatar"
        avatar={profileImageUrl}
        size="7em"
        profilePath={`/${username}/profile`}
        displayName={displayName}
        firstName={profile?.first_name}
        lastName={profile?.last_name}
      />
      <div className="list_content">
        <Link to={`/${username}/profile`} style={{ textDecoration: "none" }}>
          <Text c="white" size="xl">
            {username}
          </Text>
        </Link>

        <Group className="mb-1 mt-1">
          {userType.toUpperCase() === USERTYPES.CREATOR && (
            <Text size="sm">{calculateAge(date_of_birth)}</Text>
          )}
          {profile?.country && (
            <div className="nationality">
              {
                <CountryFlag
                  countryCode={profile?.country.toUpperCase()}
                  size={16}
                />
              }
            </div>
          )}
          {is_verified && <Verifed />}
          <Badge />
        </Group>

        <Text size="sm">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam
        </Text>
      </div>
      <Separator size="9em" />
      <div className="progress">
        <RingProgress
          size={bigscreen ? 90 : 90}
          thickness={5}
          roundCaps
          label={
            <div className="flex flex-col items-center">
              <Text size={bigscreen ? "md" : "sm"} ta="center" c="white">
                {" "}
                {totalFollowers || 0}
              </Text>
              <Text size={bigscreen ? "xs" : "xs"} ta="center">
                FOLLOWERS
              </Text>
              <Text size={bigscreen ? "xs" : "xs"} ta="center">
                <IconUser size={12} />
              </Text>
            </div>
          }
          sections={[
            { value: totalFollowers, color: "primary" },
            { value: 15, color: "secondary" },
            { value: 15, color: "skyblue" },
            { value: 25, color: "primary" },
          ]}
        />
      </div>
      <Separator size="9em" />
      <div className="levels flex flex-col items-center">
        <Text size="sm" ta="center" mb="xs">
          LEVEL
        </Text>
        <BadgeLevels width="3.125em" height="4.375em" />
      </div>
      <Separator size="9em" />
      {showOfferingsCarousel ? (
        <div className="offerings_panel">
          <CreatorOfferingsCarousel
            offerings={creatorOfferings}
            loading={offeringsLoading}
            creatorUsername={username}
            navigate={navigate}
          />
        </div>
      ) : (
        <div className="social_info">
          {SocialInfo.map(({ text, icon, followers, color }) => (
            <Group className="follwers_list" ta="center" key={text}>
              <Group>
                {icon}
                <Text size="xs" span c={color} ta="left">
                  {text}
                </Text>
              </Group>
              <Text size="xs" span c="white">
                {followers}
              </Text>
            </Group>
          ))}
        </div>
      )}
      <Separator size="9em" />
      <div className="action_btns">
        <FollowButton targetUserId={id} width="6.25em" />

        <Button w="6.25em" variant="primary">
          sponsor
        </Button>
        <IconButton
          Icon={IconMessage}
          onClick={() => routeService.messageRoute(id, navigate, user)}
        />
      </div>
    </ListviewStyles>
  );
}

export default function ListView() {
  const user = useAppSelector(currentUser);
  const { searchData, userType } = useContext(SearchContext);
  const bigscreen = useMediaQuery("(min-width: 1680px)");
  const navigate = useNavigate();

  const filteredSearchData = useMemo(() => {
    return searchData?.filter(({ id }) => id !== user.id);
  }, [searchData, user.id]);

  return filteredSearchData?.map((userItem) => (
    <ListRow
      key={userItem.id}
      userItem={userItem}
      user={user}
      userType={userType}
      bigscreen={bigscreen}
      navigate={navigate}
    />
  ));
}
