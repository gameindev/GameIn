import React, { useState } from "react";
import { Box, Button, Group, em, Stack, Text } from "@mantine/core";
import { theme } from "../../../styles/theme/customTheme";
import { useFormStep } from "../../../hooks/useFormStep";
import InputCardItem from "./../../shared/ui/InputCardItem";
import {
  IconBrandInstagram,
  IconBrandTwitch,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";

const defaultValues = {
  twitch: "",
  instagram: "",
  twitter: "",
  youtube: "",
  tiktok: "",
  discord: "",
};

const socialMediaList = [
  {
    id: "twitch",
    label: "Twitch",
    placeholder: "https://www.twitch.com/insertname",
    icon: <IconBrandTwitch size={24} />,
  },
  {
    id: "instagram",
    label: "Instagram",
    placeholder: "https://www.instagram.com/...",
    icon: <IconBrandInstagram size={24} />,
  },
  {
    id: "twitter",
    label: "Twitter",
    placeholder: "https://www.twitter.com/...",
    icon: <IconBrandTwitter size={24} />,
  },
  {
    id: "youtube",
    label: "Youtube",
    placeholder: "https://www.youtube.com/username...",
    icon: <IconBrandYoutube size={24} />,
  },
  {
    id: "tiktok",
    label: "TikTok",
    placeholder: "https://www.tiktok.com/insertname",
    icon: <IconBrandTwitch size={24} />,
  },
  {
    id: "discord",
    label: "Discord",
    placeholder: "@username",
    icon: <IconBrandTwitch size={24} />,
  },
];

export default function SocialMedia({ onPrev, onNext }) {
  const { control, handlePrevStep, handleNextStep } = useFormStep({
    formId: "createTeam",
    defaultValues,
    onNext,
    onPrev,
  });

  const [added, setAdded] = useState({
    twitch: false,
    instagram: false,
    twitter: false,
    youtube: false,
    tiktok: false,
    discord: false,
  });

  const handleToggle = (id) => {
    setAdded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Box
        pos="relative"
        style={{ borderRadius: theme.radius.md, overflow: "hidden" }}
      >
        <Stack
          spacing="xl"
          bg={theme.colors.darkGrey[0]}
          p={50}
          pos="relative"
          gap={24}
        >
          <Stack gap={8} w="50%" mx="auto">
            <Text>Add Social Media</Text>
            <Box>
              {socialMediaList.map((platform) => (
                <InputCardItem
                  key={platform.id}
                  id={platform.id}
                  icon={platform.icon}
                  placeholder={platform.placeholder}
                  added={added[platform.id]}
                  onToggle={handleToggle}
                  name={platform.id}
                  control={control}
                />
              ))}
            </Box>
          </Stack>
        </Stack>
      </Box>

      <Group mt="lg" position="center" style={{ justifyContent: "center" }}>
        <Button variant="grey" w={em(100)} onClick={handlePrevStep}>
          Back
        </Button>
        <Button variant="primary" w={em(100)} onClick={handleNextStep}>
          Next
        </Button>
      </Group>
    </>
  );
}
