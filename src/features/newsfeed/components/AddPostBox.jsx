import { useState } from "react";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import StatBox from "../../../shared/components/StatBox";
import { theme } from "../../../shared/styles/theme/customTheme";
import AddPostModal from "./AddPostModal";

export default function AddPostBox() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <StatBox
        title="Add Post"
        background="transparent linear-gradient(45deg,  rgba(157, 127, 239, 0.2) 0%, rgba(105, 179, 231, 0.2) 50%, rgba(92, 229, 176, 0.2) 100%) 0% 0% no-repeat padding-box"
      >
        <Box p="lg">
          <Stack gap={0} mt={"xl"}>
            <Text size="sm">Add a</Text>
            <Text
              size="xl"
              weight={700}
              c={theme.colors.primary[0]}
              style={{ lineHeight: 1.2, textTransform: "uppercase" }}
            >
              Whats on <br /> your mind?
            </Text>
          </Stack>

          <Stack gap={8} mt="md">
            <Button w={"fit-content"} variant="primary" size="md" onClick={() => setOpen(true)}>
              Add Post
            </Button>
          </Stack>
        </Box>
      </StatBox>
      <AddPostModal opened={open} onClose={() => setOpen(false)} />
    </>
  );
}
