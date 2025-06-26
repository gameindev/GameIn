import { Link, useNavigate } from "react-router";
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
import { useSelector } from "react-redux";
import { VideoPreview } from "./../../../components/accounts/profile/editBio/VideoPreview";
import { theme } from "../../../styles/theme/customTheme";
import { currentUser } from "../../../stores/selectors";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useSelector(currentUser);

  // const {
  //   bio,
  //   introVideoUrl,
  //   introVideoFile,
  //   gamesUrl: games,
  // } = useSelector((state) => state.bio);

  const {
    userBio: { bio: bioFromUser, videoBioUrl, preferredGames = [] } = {},
  } = user || {};

  return (
    <Grid gutter={20}>
      {/* Bio Section */}
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <StatBox
          title={"Profile Bio"}
          action={
            <IconButton
              onClick={() => navigate(routePaths.ACCOUNTS.PROFILE.BIO)}
            />
          }
        >
          <Box p={20}>
            <Stack spacing="md">
              <VideoPreview videoUrl={videoBioUrl} videoFile={null} />

              <Text>{bioFromUser || "No bio added"}</Text>

              <Flex wrap="wrap" gap="md" align="center" justify="space-between">
                <Text fw={600} tt="uppercase" fz={theme.fontSizes.sm}>
                  Preferred Games:
                </Text>

                <Flex gap="md">
                  {preferredGames.map((game, idx) => (
                    <Flex key={idx} align="center" gap={8}>
                      <Link target="_blank" to={game?.gameUrl}>
                        <Image
                          w={32}
                          h={32}
                          src={game?.metadata?.favicon}
                          alt={game?.metadata?.title || "favicon"}
                          width={32}
                          height={32}
                        />
                      </Link>
                    </Flex>
                  ))}

                  {Array.from({
                    length: 4 - preferredGames.length,
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
        <StatBox title={"Social Media Stats"} action={<IconButton />}>
          <Text>Coming soon...</Text>
        </StatBox>
      </Grid.Col>

      {/* FAQ Section */}
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <StatBox
          title={"FAQ"}
          action={
            <IconButton
              onClick={() => navigate(routePaths.ACCOUNTS.PROFILE.FAQ)}
            />
          }
        />
      </Grid.Col>

      {/* Welcome Section */}
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <StatBox
          title={"Welcome to Game-In"}
          background={rgba(theme.colors.secondary[0], 0.5)}
          action={<IconButton />}
        >
          <Text>Stat</Text>
        </StatBox>
      </Grid.Col>

      {/* Sponsorship / Team Creation */}
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <StatBox
          title={"Sponsorships"}
          background={rgba(theme.colors.primary[0], 0.3)}
          action={<IconButton />}
        >
          <div className="create_team">
            <Link to={routePaths.ACCOUNTS.PROFILE.CREATE_TEAM}>
              <Button>Create Team</Button>
            </Link>
          </div>
        </StatBox>
      </Grid.Col>
    </Grid>
  );
}
