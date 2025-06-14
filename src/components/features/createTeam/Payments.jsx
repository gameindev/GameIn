import React from "react";
import { Box, Button, Card, Group, rem, Stack, Text } from "@mantine/core";
import { theme } from "../../../styles/theme/customTheme";
import { useFormStep } from "../../../hooks/useFormStep";

const defaultValues = {
  addAchievements: "",
  externalStats: "",
};

export default function Payments({ onPrev, onNext }) {
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
            <Text>Payment</Text>
            <Card>Stripe</Card>
            <Card>PayPal</Card>
            <Card>UPI Payment</Card>
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
