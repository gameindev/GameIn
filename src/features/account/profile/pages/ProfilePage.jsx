import { Box, Button, Flex, Grid, Image, rgba, Skeleton, Stack, Text } from "@mantine/core";
import { Link, useNavigate, useOutletContext } from "react-router";
import StatBox from "../../../../shared/components/StatBox";
import IconButton from "../../../../shared/components/IconButton";
import { theme } from "../../../../shared/styles/theme/customTheme";
import VideoPreview from "../components/VideoPreview";
import routePaths from "../../../../app/router/routes";
import ProfileBioCard from "../components/ProfileBioCard";
import FaqList from "../components/FaqList";
import { useViewCount } from "../hooks/useViewCount";
import SocialMediaStats from "../../../sponsorships/components/SocialMediaStats";
import { useAppSelector } from "../../../../app/store/hooks";
import { currentUser } from "../../../auth/store/selector";
import { USERTYPES } from "../../../../shared/enums/userTypesEnum";
import CreatorAggregatedRating from "../../dashboard/components/CreatorAggregatedRating";


const ProfilePage = () => {
    const navigate = useNavigate();
    const { userProfile, isSelf } = useOutletContext();
    const user = useAppSelector(currentUser);
    const isCreator = user?.user_type?.toUpperCase() === USERTYPES.CREATOR;

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
                    action={<IconButton hoverClass="hoverYellow" />}
                    background={
                        "transparent linear-gradient(45deg, #9d7fef3b 0%, #5ce5b03b 100%) 0% 0% no-repeat"
                    }
                >
                    <SocialMediaStats />
                </StatBox>
            </Grid.Col>

            {isCreator && (
                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                        <StatBox
                            title="Rating"
                            action={
                                <IconButton
                                    hoverClass="hoverYellow"
                                    aria-label="Sponsorship ratings from brands"
                                />
                            }
                        >
                            <CreatorAggregatedRating />
                        </StatBox>
                    </Grid.Col>
                )}

            {/* FAQ Section */}
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <StatBox
                    title="FAQ"
                    action={
                        isSelf && (
                            <IconButton
                                hoverClass="hoverYellow"
                                onClick={() => navigate(routePaths.ACCOUNTS.PROFILE.FAQ)}
                            />
                        )
                    }
                >
                    <FaqList userId={userProfile.id} isSelf={isSelf} compact />
                </StatBox>
            </Grid.Col>

            

            {/* Sponsorship / Team Creation */}
            {/* <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <StatBox
                    title="Sponsorships"
                    background={rgba(theme.colors.primary[0], 0.3)}
                    action={<IconButton hoverClass="hoverYellow" />}
                >
                    {isSelf ? (
                        <div className="create_team">
                            <Link to={routePaths.ACCOUNTS.PROFILE.CREATE_TEAM}>
                                <Button>Create Team</Button>
                            </Link>
                        </div>
                    ) : (
                        <Text>No team management available</Text>
                    )}
                </StatBox>
            </Grid.Col> */}
        </Grid>
    )
}


export default ProfilePage;
