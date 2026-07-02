import { Text, Button, Modal, Group, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { SponsorShip } from "../styles/style";
import { useAppSelector } from "../../../../app/store/hooks";
import { currentUser } from "../../../auth/store/selector";
import { useUserOnlineStatus } from "../../../notifications/hooks/useUserOnlineStatus";
import { USERTYPES } from "../../../../shared/enums/userTypesEnum";
import AvatarSection from "../../../../shared/components/AvatarSection";
import useProfileSponsorships from "../hooks/useProfileSponsorships";

// export const mockSponsors = {
//   sponsorship: [
//     {
//       name: "Nike",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
//       size: 48,
//     },
//     {
//       name: "Adidas",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
//       size: 48,
//     },
//     {
//       name: "Apple",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
//       size: 44,
//     },
//     {
//       name: "Google",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
//       size: 56,
//     },
//     {
//       name: "Microsoft",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
//       size: 56,
//     },
//     {
//       name: "Amazon",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
//       size: 56,
//     },
//     {
//       name: "Meta",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Meta_Platforms_Inc._logo.svg",
//       size: 52,
//     },
//     {
//       name: "Spotify",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
//       size: 42,
//     },
//     {
//       name: "Netflix",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
//       size: 54,
//     },
//     {
//       name: "Airbnb",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
//       size: 46,
//     },
//     {
//       name: "Tesla",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
//       size: 48,
//     },
//     {
//       name: "Samsung",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
//       size: 56,
//     },
//     {
//       name: "Intel",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg",
//       size: 48,
//     },
//     {
//       name: "IBM",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
//       size: 52,
//     },
//     {
//       name: "Sony",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Sony_logo.svg",
//       size: 52,
//     },
//     {
//       name: "Red Bull",
//       logo: "https://upload.wikimedia.org/wikipedia/en/5/5c/Red_Bull.svg",
//       size: 50,
//     },
//     {
//       name: "Coca-Cola",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
//       size: 56,
//     },
//     {
//       name: "Pepsi",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/6/68/Pepsi_2023.svg",
//       size: 46,
//     },
//     {
//       name: "Puma",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_logo.svg",
//       size: 44,
//     },
//     {
//       name: "Under Armour",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg",
//       size: 48,
//     },
//   ],
// };

const SponsorAvatar = ({
    sponsor,
    size,
    className,
    isSelf,
    showName = false,
}) => {
    const isOnline = useUserOnlineStatus(sponsor?.id);

    return (
        <div
            style={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem"
            }}
        >
            <AvatarSection
                avatar={sponsor?.logo}
                size={size}
                isOnline={isOnline}
                showOnlineStatus
                className={className}
                displayName={sponsor?.name}
                profileUsername={isSelf ? sponsor?.userProfile?.username : null}
            />

            {showName && (
                <Text style={{ pointerEvents: "none" }} size="sm" fw={600}>
                    {sponsor?.name || "Sponsor"}
                </Text>
            )}
        </div>
    );
};

export default function SponsorshipSection({ sponsors, userProfile, isSelf }) {
    const user = useAppSelector(currentUser) || {};
    const [showMoreOpen, setShowMoreOpen] = useState(false);
    const [modalVisibleCount, setModalVisibleCount] = useState(10);

    const { sponsors: sponsorProfiles, loading } = useProfileSponsorships({
        userProfile,
    });

    const isMobile = useMediaQuery("(max-width: 639px)");
    const isTablet = useMediaQuery("(max-width: 1023px)");

    const initialCount = isMobile ? 1 : isTablet ? 2 : 3;

    const fallbackSponsors = Array.isArray(sponsors)
        ? sponsors
        : sponsors?.sponsorship || [];

    const sponsorList = sponsorProfiles?.length
        ? sponsorProfiles
        : fallbackSponsors;

    const visibleSponsors = sponsorList.slice(0, initialCount);
    const extraSponsors = sponsorList.slice(initialCount);
    const visibleExtraSponsors = extraSponsors.slice(0, modalVisibleCount);

    useEffect(() => {
        if (showMoreOpen) setModalVisibleCount(10);
    }, [showMoreOpen, extraSponsors.length]);

    const handleModalScroll = (event) => {
        const target = event.currentTarget;
        const nearBottom =
            target.scrollTop + target.clientHeight >= target.scrollHeight - 8;

        if (nearBottom && modalVisibleCount < extraSponsors.length) {
            setModalVisibleCount((prev) => Math.min(prev + 10, extraSponsors.length));
        }
    };
    return (
        <SponsorShip>
            <Text component="span" size="sm" className="sponsorship_text">
                {user.user_type === USERTYPES.BRAND ||
                    userProfile.user_type === USERTYPES.BRAND
                    ? "Sponsoring"
                    : "Sponsored by"}
            </Text>

            <div className="sponsorship_tracker">
                {visibleSponsors.map((sponsor, index) => (
                    // <img
                    //   key={index}
                    //   className="sponsor_logo"
                    //   src={sponsor.logo}
                    //   alt={sponsor.name}
                    //   style={{
                    //     width: sponsor.size || 48,
                    //     height: "auto",
                    //     maxHeight: 40,
                    //     objectFit: "contain",
                    //   }}
                    // />
                    <Tooltip
                        label={sponsor?.name}
                        key={`${sponsor?.name || "sponsor"}-${index}`}
                    >
                        <span style={{ display: "inline-block" }}>
                            <SponsorAvatar
                                sponsor={sponsor}
                                size={60}
                                className="sponsorslogo"
                                isSelf={isSelf}
                            />
                        </span>
                    </Tooltip>
                ))}
                {!sponsorList.length && loading && (
                    <Text size="sm" c="dimmed">
                        Loading sponsors...
                    </Text>
                )}
                {!sponsorList.length && !loading && (
                    <Text size="sm" c="dimmed">
                        {user.user_type === USERTYPES.BRAND ||
                            userProfile.user_type === USERTYPES.BRAND
                            ? "Not Sponsored Yet"
                            : "No Sponsors found"}
                    </Text>
                )}
            </div>

            {extraSponsors.length > 0 && (
                <Group pos={"absolute"} bottom={"0"} right={"-1rem"}>
                    <Button
                        variant="none"
                        size="xs"
                        onClick={() => setShowMoreOpen(true)}
                    >
                        Show more
                    </Button>
                </Group>
            )}

            <Modal
                opened={showMoreOpen}
                onClose={() => setShowMoreOpen(false)}
                title="More Sponsors"
                size="md"
            >
                {extraSponsors.length ? (
                    <div
                        onScroll={handleModalScroll}
                        style={{ maxHeight: 320, overflowY: "auto" }}
                    >
                        {visibleExtraSponsors.map((sponsor, index) => (
                            <div
                                key={`extra-${sponsor?.name || "sponsor"}-${index}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    padding: "0.5rem 0",
                                }}
                            >
                                <SponsorAvatar
                                    sponsor={sponsor}
                                    size={52}
                                    className="showmore_logo"
                                    showName
                                    isSelf={isSelf}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <Text size="sm" c="dimmed">
                        No additional sponsors.
                    </Text>
                )}
            </Modal>
        </SponsorShip>
    );
}
