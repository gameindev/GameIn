import { useState } from "react";
import { Button, Avatar, Text, Stack, Group, Box } from "@mantine/core";
import HexContainer from "../../ui/HexContainer";
import { theme } from "../../../../styles/theme/customTheme";

export default function EditImage({ type = "avatar", close }) {
  const [image, setImage] = useState({ preview: null, file: null });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage({ preview: e.target.result, file });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!image.file) return;

    const formData = new FormData();
    formData.append(type, image.file);
    close();
  };

  return (
    <Stack>
      <Text weight={500} size="sm">
        {type === "avatar" ? "Profile Picture" : "Cover Photo"}
      </Text>
      {type === "avatar" ? (
        <Group justify="center">
          <HexContainer size={200} background={theme.colors.inputBgColor[0]}>
            <img src={image.preview} alt="Avatar" />
          </HexContainer>
        </Group>
      ) : (
        <img
          src={image.preview}
          alt="Cover Preview"
          style={{ width: "100%", borderRadius: 8 }}
        />
      )}
      <input
        type="file"
        accept="image/*"
        id={`upload-${type}`}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <label htmlFor={`upload-${type}`}>
        <Button variant="secondary" component="span" size="xs">
          Change {type === "avatar" ? "Avatar" : "Cover"}
        </Button>
      </label>
      <Button variant="primary" onClick={handleSave}>
        Save {type === "avatar" ? "Avatar" : "Cover"}
      </Button>
    </Stack>
  );
}
