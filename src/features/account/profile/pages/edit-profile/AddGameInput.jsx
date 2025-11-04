import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/hooks";
import { Button, Group, TextInput } from "@mantine/core";
import { addGameUrl as addGameToRedux } from "../../store/bioSlice"

const AddGameInput = ({ control }) => {
    const [newGameUrl, setNewGameUrl] = useState("");
    const dispatch = useAppDispatch();
    const gameUrls = useAppSelector((state) => state.bio.gamesUrl);

    const handleAdd = () => {
        const url = newGameUrl.trim();
        if (!url) return;

        const favoriteCount = gameUrls.filter((g) => g.favorite).length;
        const isFavorite = favoriteCount < 4;

        dispatch(
            addGameToRedux({
                url,
                favorite: isFavorite,
            })
        );

        setNewGameUrl("");
    };

    return (
        <Group align="flex-end" spacing="sm">
            <TextInput
                label="Preferred Game URL"
                placeholder="Enter game site URL"
                value={newGameUrl}
                onChange={(e) => setNewGameUrl(e.currentTarget.value)}
                style={{ flexGrow: 1 }}
            />
            <Button fz={18} lh={1.2} variant="primary" onClick={handleAdd}>
                +
            </Button>
        </Group>
    );
};

export default AddGameInput;