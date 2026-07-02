import { useState } from "react";
import { Button, rgba, Stack, Text } from "@mantine/core";
import StatBox from "../../../shared/components/StatBox";
import { theme } from "../../../shared/styles/theme/customTheme";
import AddPostModal from "./AddPostModal";
import { AddPostContent } from "../styles/style";

export default function AddPostBox() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <StatBox
        title="Add Post"
        background={`linear-gradient(45deg, ${rgba(theme.colors.secondary[0], 0.2)} 0%, ${rgba(theme.colors.skyblue[0], 0.2)} 50%, ${rgba(theme.colors.primary[0], 0.2)} 100%)`}
      >
        <AddPostContent>
          <span className="add-symbol" aria-hidden="true">+</span>
          <Stack gap={0}>
            {/* <Text className="add-label">add a</Text> */}
            <span className="post-title">
              what's on<br />your mind?
            </span>
            <Button
              w="fit-content"
              variant="primary"
              className="add-post-button"
              onClick={() => setOpen(true)}
            >
              add post
            </Button>
          </Stack>
        </AddPostContent>
      </StatBox>
      <AddPostModal opened={open} onClose={() => setOpen(false)} />
    </>
  );
}
