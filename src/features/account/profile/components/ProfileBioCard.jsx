import { Box, Flex, Image, Skeleton, Stack, Text } from "@mantine/core"
import IconButton from "../../../../shared/components/IconButton"
import StatBox from "../../../../shared/components/StatBox"
import VideoPreview from "./VideoPreview"
import { Link, useNavigate, useOutletContext } from "react-router"
import { theme } from "../../../../shared/styles/theme/customTheme"
import routePaths from "../../../../app/router/routes"


const ProfileBioCard = () => {

    const navigate = useNavigate();
    const { userProfile, isSelf } = useOutletContext();

    if (!userProfile) return <Text>Loading profile...</Text>;

    const user_bio = userProfile.user_bio || {};
    const {
        bio: bioFromUser,
        video_bio_url: videoBioUrl,
        preferred_games: preferredGames = [],
    } = user_bio;

    return (
        <StatBox
            title="Profile Bio"
            action={
                isSelf && (
                    <IconButton
                        hoverClass="hoverYellow"
                        onClick={() => navigate(routePaths.ACCOUNTS.PROFILE.BIO)}
                    />
                )
            }
        >
            <Box p={20}>
                <Stack spacing="md">
                    <VideoPreview videoUrl={videoBioUrl} videoFile={null} />

                    <Text>{bioFromUser || "No bio added yet."}</Text>

                    <Flex wrap="wrap" gap="md" align="center" justify="space-between">
                        <Text fw={600} tt="uppercase" fz={theme.fontSizes.sm}>
                            Preferred Games:
                        </Text>
                        <Flex gap="md">
                            {preferredGames.length > 0 ? (
                                preferredGames.slice(0, 4).map((game, idx) => (
                                    <Flex key={idx} align="center" gap={8} title={game?.meta_data?.title}>
                                        <Link target="_blank" to={game?.game_url}>
                                            <Image
                                                w={32}
                                                h={32}
                                                src={game?.meta_data?.favicon}
                                                alt={game?.meta_data?.title || "favicon"}
                                                width={32}
                                                height={32}
                                            />
                                        </Link>
                                    </Flex>
                                ))
                            ) : (
                                Array.from({ length: 4 }).map((_, idx) => (
                                    <Skeleton
                                        animate={false}
                                        key={`skeleton-${idx}`}
                                        width={32}
                                        height={32}
                                        radius="sm"
                                    />
                                ))
                            )}
                        </Flex>
                    </Flex>
                </Stack>
            </Box>

        </StatBox>
    )
}


export default ProfileBioCard