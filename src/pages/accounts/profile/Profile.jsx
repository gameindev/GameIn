import { Link, useNavigate, useOutletContext } from "react-router";
import StatBox from "./../../../components/shared/ui/StatBox";
import {
  Text,
  Grid,
  Button,
  Stack,
  Image,
  Box,
  Flex,
  Skeleton,
  rgba,
} from "@mantine/core";
import routePaths from "./../../../routes/endpoints";
import IconButton from "../../../components/shared/ui/IconButton";
import { VideoPreview } from "./../../../components/accounts/profile/editBio/VideoPreview";
import { theme } from "../../../styles/theme/customTheme";

export default function Profile() {
  const navigate = useNavigate();

  const { userProfile, isSelf } = useOutletContext();
  console.log(userProfile, isSelf);

  if (!userProfile) return <Text>Loading profile...</Text>;

  const user_bio = userProfile.user_bio || {};
  const {
    bio: bioFromUser,
    video_bio_url: videoBioUrl,
    preferred_games: preferredGames = [],
  } = user_bio;

  return (
    <Grid gutter={20}>
      {/* Bio Section */}
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
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
                  {preferredGames.slice(0, 4).map((game, idx) => (
                    <Flex key={idx} align="center" gap={8}>
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
                  ))}

                  {/* Fill empty slots with placeholders */}
                  {Array.from({
                    length: Math.max(0, 4 - preferredGames.length),
                  }).map((_, idx) => (
                    <Skeleton
                      animate={false}
                      key={`skeleton-${idx}`}
                      width={32}
                      height={32}
                      radius="sm"
                    />
                  ))}
                </Flex>
              </Flex>
            </Stack>
          </Box>
        </StatBox>
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
        />
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
  );
}
