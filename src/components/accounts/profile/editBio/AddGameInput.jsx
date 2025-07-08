import React, { useState } from "react";
import { TextInput, Button, Group } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { addGameUrl as addGameToRedux } from "../../../../stores/slices/bioSlice";
import FormField from "./../../../shared/ui/FormField";

const AddGameInput = ({ control }) => {
  const [newGameUrl, setNewGameUrl] = useState("");
  const dispatch = useDispatch();
  const gameUrls = useSelector((state) => state.bio.gamesUrl);

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
      <Button fz={26} lh={1.2} variant="primary" onClick={handleAdd}>
        +
      </Button>
    </Group>
  );
};

export default AddGameInput;
