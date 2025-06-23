import React from "react";
import { Box, Button, Group, em, Stack, Text } from "@mantine/core";
import { theme } from "../../../styles/theme/customTheme";
import { useFormStep } from "../../../hooks/useFormStep";
import FormField from "./../../shared/ui/FormField";
import MultiSelector from "./../../shared/ui/MultiSelector";

const defaultValues = {
  addAchievements: [],
  addExternalStats: [],
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

const selectors = [
  {
    name: "addAchievements",
    label: "Add Achievements",
    placeholder: "Search and Add Achievements",
  },
  {
    name: "addExternalStats",
    label: "External Stats",
    placeholder: "Add External Stats",
  },
];

export default function AdminsTeams({ onPrev, onNext }) {
  const { control, handlePrevStep, handleNextStep } = useFormStep({
    formId: "createTeam",
    defaultValues,
    onNext,
    onPrev,
  });

  return (
    <>
      <Box
        pos="relative"
        style={{ borderRadius: theme.radius.md, overflow: "hidden" }}
      >
        <Stack spacing="xl" bg={theme.colors.darkGrey[0]} p={50} gap={24}>
          {selectors.map(({ name, label, placeholder }) => (
            <Stack key={name} gap={8} w="50%" mx="auto">
              <Text>{label}</Text>
              <FormField
                key={name}
                name={name}
                control={control}
                Component={MultiSelector}
                componentProps={{
                  placeholder,
                  options: allAvailableCreators,
                }}
              />
            </Stack>
          ))}
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
