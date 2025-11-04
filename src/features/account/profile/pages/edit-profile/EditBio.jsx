import { Box, Button, Grid, Group, Space, Stack, Text, Textarea } from "@mantine/core"
import StatBox from "../../../../../shared/components/StatBox"
import GameList from "./GameList"
import AddGameInput from "./AddGameInput"
import FormField from "../../../../../shared/components/FormField"
import VideoInput from "./VideoInput"
import { theme } from "../../../../../shared/styles/theme/customTheme"
import { useForm } from "react-hook-form"
import { editBioSchema } from "../../schema/editBio.schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAppSelector, useAppDispatch } from "../../../../../app/store/hooks"
import { currentUser } from "../../../../auth/store/selector"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import { setBio, removeGameUrl, toggleFavorite, moveGameUrl } from "../../store/bioSlice"
import { useEditBio } from "../../hooks/useEditBio"



const EditBio = () => {
    const user = useAppSelector(currentUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { control, handleSubmit, setValue, reset } = useForm({
        resolver: yupResolver(editBioSchema),
        defaultValues: {
            introVideoUrl: "",
            introVideoFile: null,
            bio: "",
            gamesUrl: [],
        },
    });

    const globalBio = useSelector((state) => state.bio);
    const reduxGames = globalBio.gamesUrl;

    const fetchedGames = useMemo(() => {
        return (
            user?.user_bio?.preferred_games?.map((game) => ({
                url: game?.game_url,
                metadata: game?.metadata || {},
            })) || []
        );
    }, [user?.user_bio?.preferred_games]);

    const gameUrls = reduxGames?.length ? reduxGames : fetchedGames;

    const { onSubmit } = useEditBio(gameUrls, navigate);

    useEffect(() => {
        if (!reduxGames.length && fetchedGames.length) {
            dispatch(setBio({ ...globalBio, gamesUrl: fetchedGames }));
        }
    }, [reduxGames, fetchedGames, dispatch, globalBio]);

    useEffect(() => {
        if (user) {
            reset({
                bio: globalBio.bio || user?.user_bio?.bio || "",
                introVideoUrl:
                    globalBio.introVideoUrl || user?.user_bio?.video_bio_url || "",
                introVideoFile: globalBio.introVideoFile || null,
                gamesUrl: gameUrls || [],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, reset]);

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

                                <Space />

                                {/* Bio input */}
                                <FormField
                                    name="bio"
                                    control={control}
                                    Component={Textarea}
                                    componentProps={{
                                        label: "Bio",
                                        placeholder: "Enter your Bio",
                                        resize: "vertical",
                                    }}
                                />

                                <Space />

                                {/* Games Url input */}
                                <AddGameInput control={control} />

                                {/* Game lists */}
                                <GameList
                                    games={gameUrls}
                                    onDelete={(idx) => dispatch(removeGameUrl(idx))}
                                    onFavoriteToggle={(idx) => dispatch(toggleFavorite(idx))}
                                    onMove={(from, to) => dispatch(moveGameUrl({ from, to }))}
                                />

                                <Space />

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
    )
}


export default EditBio