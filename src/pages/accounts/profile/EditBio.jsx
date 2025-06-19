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
} from "../../../stores/slices/bioSlice";
import StatBox from "../../../components/shared/ui/StatBox";
import { useNavigate } from "react-router";

export default function EditBio() {
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(editBioSchema),
    defaultValues: {
      introVideoUrl: "",
      introVideoFile: null,
      bio: "",
      gamesUrl: [],
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const globalBio = useSelector((state) => state.bio);
  const gameUrls = globalBio.gamesUrl;

  useEffect(() => {
    setValue("bio", globalBio.bio);
    setValue("introVideoUrl", globalBio.introVideoUrl);
    setValue("introVideoFile", globalBio.introVideoFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeGameUrl = (index) => {
    dispatch(removeGameFromRedux(index));
  };

  const onSubmit = (data) => {
    dispatch(
      setBio({
        bio: data.bio,
        introVideoUrl: data.introVideoUrl,
        introVideoFile: data.introVideoFile,
      })
    );
    alert("Profile Updated Successfully");
    navigate("/profile");
  };

  return (
    <>
      <Group pos={"relative"} justify="center">
        <Button pos={"absolute"} left={0} variant="darkGrey" onClick={() => navigate(-1)}>
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
                  onDelete={(idx) => dispatch(removeGameUrl(idx))}
                  onFavoriteToggle={(idx) => dispatch(toggleFavorite(idx))}
                />

                <Button type="submit" variant="primary" width="10rem">
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
