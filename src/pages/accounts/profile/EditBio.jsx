import React, { useEffect } from "react";
import { Stack, Textarea, Button, Box, Text, Grid, Group } from "@mantine/core";
import { useForm } from "react-hook-form";
import FormField from "../../../components/shared/ui/FormField";
import { theme } from "../../../styles/theme/customTheme";
import { useDispatch, useSelector } from "react-redux";
import VideoInput from "./../../../components/accounts/profile/editBio/VideoInput";
import AddGameInput from "./../../../components/accounts/profile/editBio/AddGameInput";
import GameList from "./../../../components/accounts/profile/editBio/GameList";
import { yupResolver } from "@hookform/resolvers/yup";
import { editBioSchema } from "./../../../utils/schemas/editBioSchema";
import {
  setBio,
  removeGameUrl as removeGameFromRedux,
  toggleFavorite,
  moveGameUrl,
} from "../../../stores/slices/bioSlice";
import StatBox from "../../../components/shared/ui/StatBox";
import { useNavigate } from "react-router";
import useApi from "../../../hooks/useApi";
import { currentUser } from "../../../stores/selectors";
import { refreshUser } from "../../../stores/thunks/userThunks";

export default function EditBio() {
  const { control, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(editBioSchema),
    defaultValues: {
      introVideoUrl: "",
      introVideoFile: null,
      bio: "",
      gamesUrl: [],
    },
  });

  const { user } = useSelector(currentUser);
  const { patch } = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const globalBio = useSelector((state) => state.bio);
  const gameUrls = globalBio.gamesUrl;
  console.log(gameUrls);

  useEffect(() => {
    reset({
      bio: globalBio.bio || user?.userBio?.bio || "",
      introVideoUrl:
        globalBio.introVideoUrl || user?.userBio?.videoBioUrl || "",
      introVideoFile: globalBio.introVideoFile || null,
      gamesUrl: gameUrls || [],
    });
  }, [globalBio, user, reset, gameUrls]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        bio: data.bio,
        videoBioUrl: data.introVideoUrl,
        userId: user.id,
        preferredGames: gameUrls.map((game, index) => ({
          gameUrl: game.url,
          sortOrder: index,
          favorite: game.favorite,
          title: game.title || game.url,
        })),
      };

      await patch("/users-bio.controller", payload);

      dispatch(
        setBio({
          bio: data.bio,
          introVideoUrl: data.introVideoUrl,
          introVideoFile: data.introVideoFile,
          gamesUrl: gameUrls,
        })
      );
      dispatch(refreshUser());
      alert("Profile Updated Successfully");
      navigate("/profile");
    } catch (err) {
      alert("Failed to update bio");
      console.error(err);
    }
  };

  return (
    <>
      <Group pos={"relative"} justify="center">
        <Button
          pos={"absolute"}
          left={0}
          variant="darkGrey"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Text fz={35} align="center" mb={20}>
          Edit Bio
        </Text>
      </Group>

      <Grid gutter={20}>
        <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
          <Box
            p="md"
            bg={theme.colors.secondaryGrey[0]}
            style={{ borderRadius: theme.radius.md }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack p={20}>
                {/* Video Input */}
                <VideoInput control={control} setValue={setValue} />

                {/* Bio input */}
                <FormField
                  name="bio"
                  control={control}
                  Component={Textarea}
                  componentProps={{
                    label: "Bio",
                    placeholder: "Enter your Bio",
                  }}
                />

                {/* Games Url input */}
                <AddGameInput control={control} />

                {/* Game lists */}
                <GameList
                  games={gameUrls}
                  onDelete={(idx) => dispatch(removeGameFromRedux(idx))}
                  onFavoriteToggle={(idx) => dispatch(toggleFavorite(idx))}
                  onMove={(from, to) => dispatch(moveGameUrl({ from, to }))}
                />

                <Button type="submit" variant="primary" width="10em">
                  Save
                </Button>
              </Stack>
            </form>
          </Box>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <StatBox title={"Preview"}></StatBox>
        </Grid.Col>
      </Grid>
    </>
  );
}
