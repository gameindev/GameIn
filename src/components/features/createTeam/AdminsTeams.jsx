import React from "react";
import { Box, Button, Group, rem, Stack, Text } from "@mantine/core";
import { theme } from "../../../styles/theme/customTheme";
import { useFormStep } from "../../../hooks/useFormStep";
import MultiSelector from "./../../shared/ui/MultiSelector";
import { Controller } from "react-hook-form";
import FormField from "./../../shared/ui/FormField";

const defaultValues = {
  addCoach: [],
  addTeamMate: [],
};

const allAvailableCreators = [
  { id: "1", name: "React" },
  { id: "2", name: "Mantine" },
  { id: "3", name: "JavaScript" },
  { id: "4", name: "TypeScript" },
  { id: "5", name: "Next.js" },
  { id: "6", name: "Frontend" },
  { id: "7", name: "Backend" },
];

export default function AdminsTeams({ onPrev, onNext }) {
  const { control, setValue, watch, handlePrevStep, handleNextStep } =
    useFormStep({
      defaultValues,
      onNext,
      onPrev,
    });

  // ✅ Bind selected values to form state
  const selectedCoaches = watch("addCoach") || [];
  const selectedTeammates = watch("addTeamMate") || [];

  const handleSubmit = () => {
    console.log("Selected Coaches:", selectedCoaches);
    console.log("Selected Teammates:", selectedTeammates);
    handleNextStep(); // calls onNext with form state internally
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
            <Text>Add Coach</Text>
            <FormField
              name="addCoach"
              control={control}
              Component={MultiSelector}
              componentProps={{
                placeholder: "Search and Add Coachs",
                options: allAvailableCreators,
              }}
            />
          </Stack>

          <Stack gap={8} w={"50%"} mx={"auto"}>
            <Text>Add Teammate</Text>
            <FormField
              name="addTeamMate"
              control={control}
              Component={MultiSelector}
              componentProps={{
                placeholder: "Search and Add Teammates",
                options: allAvailableCreators,
              }}
            />
          </Stack>
        </Stack>
      </Box>

      <Group mt="lg" position="center" style={{ justifyContent: "center" }}>
        <Button variant="grey" w={rem(100)} onClick={handlePrevStep}>
          Back
        </Button>
        <Button variant="primary" w={rem(100)} onClick={handleSubmit}>
          Next
        </Button>
      </Group>
    </>
  );
}
