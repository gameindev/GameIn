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


const ProfilePage = () => {
    const navigate = useNavigate();
    const { userProfile, isSelf } = useOutletContext();

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
                >
                    <Text>Coming soon...</Text>
                </StatBox>
            </Grid.Col>

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

            {/* Welcome Section */}
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <StatBox
                    title="Welcome to Game-In"
                    background={rgba(theme.colors.secondary[0], 0.5)}
                    action={<IconButton hoverClass="hoverYellow" />}
                >
                    <Text>Stat</Text>
                </StatBox>
            </Grid.Col>

            {/* Sponsorship / Team Creation */}
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
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
            </Grid.Col>
        </Grid>
    )
}


export default ProfilePage;
