import { Radio, Stack, Button, Group, Text, Flex, Box } from "@mantine/core";
import { useFormStep } from "../../hooks/useFormStep";
import { stepTwoSchema } from "../../utils/validationSchema";
import { Controller } from "react-hook-form";
import { Star, Flame, SunDim } from "lucide-react";
import { theme } from "../../styles/theme/customTheme";

const defaultValues = {
  role: "",
};

export default function StepTwo({ onNext, onPrev }) {
  const { control, handleSubmit, handlePrevStep, errors, formValues } =
    useFormStep({
      defaultValues,
      schema: stepTwoSchema,
      onNext,
      onPrev,
    });

  const RadioData = [
    {
      icon: <Star color={theme.colors.primary[0]} />,
      label: "Creator",
      value: "creator",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adi piscing elit, sed diam nonummy nibh euismod",
    },
    {
      icon: <Flame color={theme.colors.primary[0]} />,
      label: "Brand",
      value: "brand",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adi piscing elit, sed diam nonummy nibh euismod",
    },
    {
      icon: <SunDim color={theme.colors.primary[0]} />,
      label: "Community",
      value: "community",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adi piscing elit, sed diam nonummy nibh euismod",
    },
  ];

  return (
    <Stack spacing="xl">
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Radio.Group
            {...field}
            value={formValues.role}
            error={errors.role?.message}
            withAsterisk
          >
            <Flex mt="md" wrap="wrap" gap={"xs"}>
              {RadioData.map((item) => (
                <Radio.Card
                  key={item.value}
                  radius="md"
                  value={item.value}
                  flex={`0 0 calc(50% - var(--mantine-spacing-xs) / 2)`}
                  bg={theme.colors.inputBgColor[0]}
                  style={() => ({
                    border: `2px solid transparent`,
                    transition: "border-color 0.2s ease",
                  })}
                >
                  <Group wrap="nowrap" align="center">
                    <Box p={"xl"} align="center">
                      <Text component="span">{item.icon}</Text>
                      <Text
                        tt={"uppercase"}
                        mb="xs"
                        style={(theme) => ({
                          color: theme.colors.primary[0],
                          fontSize: theme.fontSizes.default,
                          fontWeight: 400,
                          lineHeight: 1,
                          letterSpacing: "0.07em",
                        })}
                      >
                        {item.label}
                      </Text>
                      <Text
                        style={(theme) => ({
                          color: theme.colors.text[0],
                          fontSize: theme.fontSizes.xs,
                          lineHeight: 1.2,
                          letterSpacing: "0.01em",
                        })}
                      >
                        {item.description}
                      </Text>
                    </Box>
                  </Group>
                </Radio.Card>
              ))}
              {/* <Radio.Card
                radius="md"
                value="creator"
                flex={`0 0 calc(50% - var(--mantine-spacing-xs) / 2)`}
              >
                <Group wrap="nowrap" align="center">
                  <Box p={"xl"} align="center">
                    <Text component="span">
                      <Star color={theme.colors.primary[0]} />
                    </Text>
                    <Text
                      tt={"uppercase"}
                      mb="xs"
                      style={(theme) => ({
                        color: theme.colors.primary[0],
                        fontSize: theme.fontSizes.default,
                        fontWeight: 400,
                        lineHeight: 1,
                        letterSpacing: "0.07em",
                      })}
                    >
                      Creator
                    </Text>
                    <Text
                      style={(theme) => ({
                        color: theme.colors.text[0],
                        fontSize: theme.fontSizes.xs,
                        lineHeight: 1.2,
                        letterSpacing: "0.01em",
                      })}
                    >
                      Lorem ipsum dolor sit amet, consectetuer adi piscing elit,
                      sed diam nonummy nibh euismod
                    </Text>
                  </Box>
                </Group>
              </Radio.Card>
              <Radio.Card
                radius="md"
                value="brand"
                flex={`0 0 calc(50% - var(--mantine-spacing-xs) / 2)`}
              >
                <Group wrap="nowrap" align="center">
                  <div>
                    <Text>Brand</Text>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetuer adi piscing elit,
                      sed diam nonummy nibh euismod
                    </Text>
                  </div>
                </Group>
              </Radio.Card>
              <Radio.Card
                radius="md"
                value="community"
                flex={`0 0 calc(50% - var(--mantine-spacing-xs) / 2)`}
              >
                <Group wrap="nowrap" align="center">
                  <div>
                    <Text>Community</Text>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetuer adi piscing elit,
                      sed diam nonummy nibh euismod
                    </Text>
                  </div>
                </Group>
              </Radio.Card> */}
            </Flex>
          </Radio.Group>
        )}
      />

      <Group position="apart" mt="xl" style={{ justifyContent: "center" }}>
        <Button variant="default" onClick={handlePrevStep}>
          Back
        </Button>
        <Button onClick={handleSubmit}>Continue</Button>
      </Group>
    </Stack>
  );
}
