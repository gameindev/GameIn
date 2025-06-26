import React from "react";
import {
  Box,
  Button,
  Card,
  Group,
  em,
  Stack,
  Text,
  Divider,
  List,
} from "@mantine/core";
import { theme } from "../../../styles/theme/customTheme";
import { useFormStep } from "../../../hooks/useFormStep";

export default function FinalReview({ onPrev, onNext }) {
  const { getValues, handlePrevStep, handleNextStep } = useFormStep({
    formId: "createTeam",
    defaultValues: {},
    onNext,
    onPrev,
  });

  const formData = getValues();

  const renderList = (label, items) => (
    <Stack gap={4}>
      <Text fw={500}>{label}</Text>
      {Array.isArray(items) && items.length > 0 ? (
        <List size="sm" spacing="xs" withPadding>
          {items.map((item, i) => (
            <List.Item key={i}>{item.name || item}</List.Item>
          ))}
        </List>
      ) : (
        <Text size="sm" c="dimmed">
          None selected
        </Text>
      )}
    </Stack>
  );

  const renderText = (label, value) => (
    <Stack gap={4}>
      <Text fw={500}>{label}</Text>
      <Text size="sm" c={value ? "white" : "dimmed"}>
        {value || "Not provided"}
      </Text>
    </Stack>
  );

  return (
    <>
      <Box
        pos="relative"
        style={{ borderRadius: theme.radius.md, overflow: "hidden" }}
      >
        <Stack spacing="xl" bg={theme.colors.darkGrey[0]} p={50} gap={24}>
          <Stack gap={24} w="50%" mx="auto">
            <Text size="lg" fw={600}>
              Final Review
            </Text>

            {/* Render social media fields */}
            {Object.entries(formData).map(([key, value]) => {
              if (Array.isArray(value)) {
                return renderList(key, value);
              }

              // Filter known string fields
              if (
                typeof value === "string" &&
                (key.includes("URL") ||
                  key === "paymentMethod" ||
                  key === "externalStats" ||
                  key === "addAchievements")
              ) {
                return renderText(key, value);
              }

              return null;
            })}
          </Stack>
        </Stack>
      </Box>

      <Group mt="lg" position="center" style={{ justifyContent: "center" }}>
        <Button variant="grey" w={em(100)} onClick={handlePrevStep}>
          Back
        </Button>
        <Button variant="primary" w={em(100)} onClick={handleNextStep}>
          Submit
        </Button>
      </Group>
    </>
  );
}
