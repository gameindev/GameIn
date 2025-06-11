import React, { useState } from "react";
import { Box, Button, Group, rem, Stack, Text } from "@mantine/core";
import { theme } from "../../../styles/theme/customTheme";
import { useFormStep } from "../../../hooks/useFormStep";
import { Twitch, Instagram, Twitter } from "lucide-react";
import InputCardItem from './../../shared/ui/InputCardItem';

const defaultValues = {
  twitchURL: "",
  instagramURL: "",
  twitterURL: "",
  youtubeURL: "",
  titTokURL: "",
  discordURL: "",
};

const socialMediaList = [
  {
    id: "twitch",
    label: "Twitch",
    placeholder: "https://www.twitch.com/insertname",
    icon: <Twitch size={24} />,
  },
  {
    id: "instagram",
    label: "Instagram",
    placeholder: "https://www.instagram.com/...",
    icon: <Instagram size={24} />,
  },
  {
    id: "twitter",
    label: "Twitter",
    placeholder: "https://www.twitter.com/...",
    icon: <Twitter size={24} />,
  },
];

export default function SocialMedia({ onPrev, onNext }) {
  const { control, setValue, handlePrevStep, handleNextStep } = useFormStep({
    defaultValues,
    onNext,
    onPrev,
  });

  const [links, setLinks] = useState({
    twitch: "",
    instagram: "",
    twitter: "",
  });

  const [added, setAdded] = useState({
    twitch: false,
    instagram: false,
    twitter: false,
  });

  const handleChange = (id, value) => {
    setLinks((prev) => ({ ...prev, [id]: value }));
  };

  const handleToggle = (id) => {
    setAdded((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <>
      <Box
        pos={"relative"}
        style={{ borderRadius: theme.radius.md, overflow: "hidden" }}
      >
        <Stack
          spacing="xl"
          bg={theme.colors.darkGrey[0]}
          p={50}
          pos={"relative"}
          gap={24}
        >
          <Stack gap={8} w={"50%"} mx={"auto"}>
            <Text>Add Social Media</Text>
            <Box>
              {socialMediaList.map((platform) => (
                <InputCardItem
                  key={platform.id}
                  id={platform.id}
                  icon={platform.icon}
                  placeholder={platform.placeholder}
                  value={links[platform.id]}
                  onChange={handleChange}
                  added={added[platform.id]}
                  onToggle={handleToggle}
                />
              ))}
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Group mt="lg" position="center" style={{ justifyContent: "center" }}>
        <Button variant="grey" width={rem(100)} onClick={handlePrevStep}>
          Back
        </Button>
        <Button variant="primary" width={rem(100)} onClick={handleNextStep}>
          Next
        </Button>
      </Group>
    </>
  );
}
