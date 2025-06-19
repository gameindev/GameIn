import React, { useState } from "react";
import { TextInput, Button, Group } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { addGameUrl as addGameToRedux } from "../../../../stores/slices/bioSlice";
import FormField from "./../../../shared/ui/FormField";

const AddGameInput = ({ control }) => {
  const [newGameUrl, setNewGameUrl] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const dispatch = useDispatch();
  const gameUrls = useSelector((state) => state.bio.gamesUrl);

  const getMetadataFromUrl = async (url) => {
    try {
      const res = await fetch(
        `https://api.microlink.io?url=${encodeURIComponent(url)}`
      );
      const json = await res.json();
      if (json.status === "success") {
        const { title, logo } = json.data;
        return {
          title: title || url,
          favicon:
            logo ||
            `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`,
        };
      }
    } catch {
      return {
        title: url,
        favicon: `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`,
      };
    }
  };

  const handleAdd = async () => {
    const url = newGameUrl.trim();
    if (!url) return;
    setIsFetching(true);

    const meta = await getMetadataFromUrl(url);

    const favoriteCount = gameUrls.filter((g) => g.favorite).length;
    const isFavorite = favoriteCount < 4;

    dispatch(addGameToRedux({ url, ...meta, favorite: isFavorite }));
    setNewGameUrl("");
    setIsFetching(false);
  };

  return (
    <Group align="flex-end" spacing="sm">
      <FormField
        name="gamesUrl"
        control={control}
        Component={TextInput}
        componentProps={{
          label: "Preferred Game URL",
          placeholder: "Enter game site URL",
          value: newGameUrl,
          onChange: (e) => setNewGameUrl(e.currentTarget.value),
          style: { flexGrow: 1 },
        }}
      />
      <Button
        fz={26}
        lh={1.2}
        variant="primary"
        onClick={handleAdd}
        loading={isFetching}
      >
        +
      </Button>
    </Group>
  );
};

export default AddGameInput;
