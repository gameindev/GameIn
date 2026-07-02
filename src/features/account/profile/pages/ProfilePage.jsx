import { Grid, Text } from "@mantine/core";
import { useNavigate, useOutletContext } from "react-router";
import StatBox from "../../../../shared/components/StatBox";
import IconButton from "../../../../shared/components/IconButton";
import routePaths from "../../../../app/router/routes";
import ProfileBioCard from "../components/ProfileBioCard";
import FaqList from "../components/FaqList";
import { useViewCount } from "../hooks/useViewCount";
import SocialMediaStats from "../../../sponsorships/components/SocialMediaStats";
import { useAppSelector } from "../../../../app/store/hooks";
import { currentUser } from "../../../auth/store/selector";
import { USERTYPES } from "../../../../shared/enums/userTypesEnum";
import CreatorProfileRatingCard from "../components/CreatorProfileRatingCard";
import CreatorAudienceEngagementCards from "../../../sponsorships/components/CreatorAudienceEngagementCards";
import { theme } from "../../../../shared/styles/theme/customTheme";
import FindSponsorCard from "../components/FindSponsorCard";

const CARD_BORDER = "1px solid rgba(255, 255, 255, 0.06)";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { userProfile, isSelf } = useOutletContext();
    const user = useAppSelector(currentUser);
    const viewerType = user?.user_type?.toUpperCase() ?? "";
    const profileType = userProfile?.user_type?.toUpperCase() ?? "";
    const viewerIsBrand = viewerType === USERTYPES.BRAND;
    const profileIsCreator = profileType === USERTYPES.CREATOR;
    const showRatingCard =
        profileIsCreator && (isSelf || (viewerIsBrand && !isSelf));
    const showBrandCreatorAnalytics = viewerIsBrand && !isSelf && profileIsCreator;
    const isCreator = userProfile?.user_type?.toUpperCase() === USERTYPES.CREATOR;

    if (!userProfile) return <Text>Loading profile...</Text>;

    // Handle hash routing - get the hash part and remove the # symbol
    const hashPath = window.location.hash.replace('#', '');
    const isProfileView = hashPath === `/${userProfile.username}/profile`;

    if (isProfileView) {
        useViewCount(userProfile.user_type, userProfile.id)
    }

    return (
        <Grid gutter={20}>
            {/* Bio Section */}
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <ProfileBioCard />
            </Grid.Col>


            {/* Social Media Stats */}
            <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
                <StatBox
                    title="Social Media Stats"
                    background={
                        "transparent linear-gradient(45deg, #9d7fef3b 0%, #5ce5b03b 100%) 0% 0% no-repeat"
                    }
                    noFlexFill
                >
                    <SocialMediaStats compact />
                </StatBox>
            </Grid.Col>

            {showRatingCard && (
                <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
                    <StatBox
                        title="Rating"
                        action={
                            <IconButton
                                hoverClass="hoverYellow"
                                aria-label={
                                    viewerIsBrand && !isSelf
                                        ? "Rate creator sponsorship feedback"
                                        : "Sponsorship ratings from brands"
                                }
                            />
                        }
                        noFlexFill
                        style={{
                            background: theme.colors.secondaryGrey[0],
                            border: CARD_BORDER,
                            minHeight: 220,
                            overflow: "visible",
                        }}
                    >
                        <CreatorProfileRatingCard
                            creatorUserId={userProfile.id}
                            creatorUsername={userProfile.username}
                            isSelf={isSelf}
                            viewerIsBrand={viewerIsBrand}
                        />
                    </StatBox>
                </Grid.Col>
            )}

            {/* {showBrandCreatorAnalytics && (
                <CreatorAudienceEngagementCards
                    forUserId={userProfile.id}
                    subjectUsername={userProfile.username}
                    viewingOthersStats
                    enabled={showBrandCreatorAnalytics}
                    onViewAllEngagement={() =>
                        navigate(`/${userProfile.username}/stats`)
                    }
                />
            )} */}

            {/* FAQ Section */}
                    <Grid.Col
                        span={{ base: 12, md: 6, lg: 4 }}
                    >
                <StatBox
                    title="FAQ"
                    action={
                        isSelf && (
                            <IconButton
                                hoverClass="hoverYellow"
                                onClick={() => navigate("/profile/faq")}
                            />
                        )
                    }
                >
                    <FaqList userId={userProfile.id} isSelf={isSelf} compact />
                </StatBox>
            </Grid.Col>

            {isCreator && isSelf && (
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <FindSponsorCard />
                </Grid.Col>
            )}
        </Grid>
    );
};

export default ProfilePage;
