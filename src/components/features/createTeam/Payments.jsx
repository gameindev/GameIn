import React from "react";
import {
  Box,
  Button,
  Card,
  Group,
  rem,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useFormStep } from "../../../hooks/useFormStep";
import { Controller } from "react-hook-form";

const defaultValues = {
  addAchievements: "",
  externalStats: "",
  paymentMethod: "", // added for selection
};

const paymentOptions = ["Stripe", "PayPal", "UPI Payment"];

export default function Payments({ onPrev, onNext }) {
  const { control, handlePrevStep, handleNextStep } = useFormStep({
    formId: "createTeam",
    defaultValues,
    onNext,
    onPrev,
  });

  const theme = useMantineTheme();

  return (
    <>
      <Box
        pos="relative"
        style={{ borderRadius: theme.radius.md, overflow: "hidden" }}
      >
        <Stack spacing="xl" bg={theme.colors.darkGrey[0]} p={50} gap={24}>
          <Stack gap={8} w="50%" mx="auto">
            <Text>Choose Payment Method</Text>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <Stack>
                  {paymentOptions.map((method) => {
                    const isSelected = field.value === method;
                    return (
                      <Card
                        key={method}
                        onClick={() => field.onChange(method)}
                        withBorder
                        shadow={isSelected ? "md" : "xs"}
                        bg={
                          isSelected
                            ? theme.colors.primary[0]
                            : theme.colors.inputBgColor?.[0] || "white"
                        }
                        style={{
                          cursor: "pointer",
                          borderColor: isSelected
                            ? theme.colors.primary[3]
                            : theme.colors.gray[3],
                          transition: "all 0.2s ease",
                        }}
                      >
                        <Text
                          weight={500}
                          c={isSelected ? "black" : "white"}
                        >
                          {method}
                        </Text>
                      </Card>
                    );
                  })}
                </Stack>
              )}
            />
          </Stack>
        </Stack>
      </Box>

      <Group mt="lg" position="center" style={{ justifyContent: "center" }}>
        <Button variant="grey" w={rem(100)} onClick={handlePrevStep}>
          Back
        </Button>
        <Button variant="primary" w={rem(100)} onClick={handleNextStep}>
          Next
        </Button>
      </Group>
    </>
  );
}
