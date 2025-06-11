import {
  Paper,
  Title,
  Group,
  Container,
  Progress,
  Stack,
  Flex,
  Text,
} from "@mantine/core";
import { useState } from "react";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import Completed from "./Completed";
import { UserRound } from "lucide-react";
import { theme } from './../../../styles/theme/customTheme';

// form steps information
const FORM_STEPS = [
  {
    title: "Create Your Account",
    component: StepOne,
    showProgressBar: true,
    canGoBack: false,
    validateOnExit: true,
  },
  {
    title: "Which Category Would Fit You Most?",
    component: StepTwo,
    showProgressBar: true,
    canGoBack: true,
    validateOnExit: true,
  },
  {
    title: "ReCAPTCHA Verification",
    component: StepThree,
    showProgressBar: true,
    canGoBack: true,
    validateOnExit: false,
  },
  {
    title: "Email Verification!",
    component: Completed,
    showProgressBar: false,
    canGoBack: false,
    validateOnExit: false,
  },
];

export default function MultiStepForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const totalSteps = FORM_STEPS.length;

  // get current step information
  const {
    component: StepComponent,
    title,
    showProgressBar,
    canGoBack,
    validateOnExit,
  } = FORM_STEPS[stepIndex];

  // go to next/prev step
  const goToNextStep = () =>
    setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  const goToPrevStep = () =>
    canGoBack && setStepIndex((i) => Math.max(i - 1, 0));

  return (
    <>
      <Container size="lg">
        <Paper radius="sm" p="xl" withBorder bg="#363a3e" my={"5rem"} mx={"xl"}>
          <Stack spacing="xl">
            <Flex align="center" gap="xs" justify="start">
              <Text component="span" style={{ display: "inline-flex" }}>
                <UserRound color={theme.colors.primary[0]} />
              </Text>
              <Title order={2}>{title}</Title>
            </Flex>
            <Stack w="50%" mx="auto">
              <StepComponent
                onNext={goToNextStep}
                onPrev={goToPrevStep}
                validateOnExit={validateOnExit}
                canGoBack={canGoBack}
              />

              {showProgressBar && (
                <Group grow gap={3} mt="xs">
                  {FORM_STEPS.map((_, index) => (
                    <Progress
                      key={index}
                      value={stepIndex >= index ? 100 : 0}
                      size="xs"
                      radius="xl"
                      bg={theme.colors.inputBgColor[0]}
                    />
                  ))}
                </Group>
              )}
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
