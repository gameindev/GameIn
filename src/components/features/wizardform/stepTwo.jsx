/* eslint-disable */
import { Radio, Stack, Button, Group, Text, Flex, Box } from "@mantine/core";
import { useFormStep } from "../../../hooks/useFormStep";
import { stepTwoSchema } from "../../../utils/validationSchema";
import { Star, Flame, SunDim } from "lucide-react";
import { theme } from "../../../styles/theme/customTheme";
import FormField from '../../shared/ui/FormField';
import { USERTYPES } from "../../../utils/enum";

// default values for the form
const defaultValues = {
  role: "",
};

// form steps information
const roles = [
  {
    icon: Star,
    label: "Creator",
    value: USERTYPES.CREATOR,
    description: "Create and share content with your audience.",
  },
  {
    icon: Flame,
    label: "Brand",
    value: USERTYPES.BRAND,
    description: "Promote your products or services effectively.",
  },
  {
    icon: SunDim,
    label: "Community",
    value: USERTYPES.COMMUNITY,
    description: "Build and engage with your community.",
  },
];

export default function StepTwo({ onNext, onPrev }) {
  // form steps information
  const { control, handleNextStep, handlePrevStep, errors, formValues } =
    useFormStep({
      defaultValues,
      schema: stepTwoSchema,
      onNext,
      onPrev,
    });

  return (
    <Stack spacing="xl">
      <FormField
        name="role"
        control={control}
        Component={Radio.Group}
        componentProps={{
          value: formValues.role,
          withAsterisk: true,
          children: (
            <Flex wrap="wrap" gap="xs" mt="md" mb="sm">
              {roles.map(({ label, value, description, icon: Icon }) => (
                <Radio.Card
                  key={value}
                  value={value}
                  radius="md"
                  flex="0 0 calc(50% - var(--mantine-spacing-xs) / 2)"
                  bg={theme.colors.inputBgColor[0]}
                  style={{ border: "0.125rem solid transparent" }}
                >
                  <Box p="xl" style={{ textAlign: "center" }}>
                    <Icon color={theme.colors.primary[0]} />
                    <Text
                      tt="uppercase"
                      mt="sm"
                      fw={500}
                      size="sm"
                      c={theme.colors.primary[0]}
                    >
                      {label}
                    </Text>
                    <Text mt="xs" size="xs" c={theme.colors.text[0]}>
                      {description}
                    </Text>
                  </Box>
                </Radio.Card>
              ))}
            </Flex>
          ),
        }}
      />

      <Group mt="xl" position="center" style={{ justifyContent: "center" }}>
        <Button variant="default" onClick={handlePrevStep}>
          Back
        </Button>
        <Button variant="primary" onClick={handleNextStep}>Continue</Button>
      </Group>
    </Stack>
  );
}
