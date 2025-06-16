import { useState } from "react";
import {
  Button,
  Avatar,
  Text,
  Stack,
  TextInput,
  Textarea,
  Group,
} from "@mantine/core";

export default function EditAvator() {
  const [profile, setProfile] = useState({
    avatar: null,
  });

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile({ ...profile, avatar: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <Stack>
      <Group position="apart">
        <Text size="sm" weight={500}>
          Profile
        </Text>
        <Button size="xs" onClick={close}>
          Close
        </Button>
      </Group>
      <Avatar
        src={profile.avatar}
        alt="Profile Avatar"
        radius="xl"
        size="xl"
        style={{ alignSelf: "center" }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        style={{ display: "none" }}
        id="avatar-upload"
      />
      <label htmlFor="avatar-upload">
        <Button component="span" size="xs">
          Change Avatar
        </Button>
      </label>
      <Button
        onClick={() => {
          console.log("Saving profile:", profile);
          close();
        }}
      >
        Save Profile
      </Button>
    </Stack>
  );
}
