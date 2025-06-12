import React from "react";
import { Box, Button, Group, rem, Stack, Text } from "@mantine/core";
import { theme } from "../../../styles/theme/customTheme";
import { useFormStep } from "../../../hooks/useFormStep";
import MultiSelector from './../../shared/ui/MultiSelector';

const defaultValues = {
  addCoach: "",
  addTeamMate: "",
};

export default function AdminsTeams({ onPrev, onNext }) {
  const { control, setValue, handlePrevStep, handleNextStep } = useFormStep({
    defaultValues,
    onNext,
    onPrev,
  });
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
            <Text>Add Coach</Text>
            <MultiSelector placeholder="Search and Add Coach"/>
          </Stack>
          <Stack gap={8} w={"50%"} mx={"auto"}>
            <Text>Add Teammate</Text>
            <MultiSelector placeholder="Search and Add Teammate" />
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
