import {
  Paper,
  Title,
  Group,
  Container,
  Progress,
  Stack,
  Box,
} from "@mantine/core";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import Completed from "./Completed";
import { useState } from "react";
import { theme } from "../../styles/theme/customTheme";

const getStepTitle = (step) => {
  switch (step) {
    case 0:
      return "Create Your Account";
    case 1:
      return "Which Category Would Fit You Most?";
    case 2:
      return "ReCAPTCHA Verification";
    case 3:
      return "Email Verification!";
    default:
      return "";
  }
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;

  const nextStep = () => {
    setCurrentStep((current) =>
      current < totalSteps - 1 ? current + 1 : current
    );
  };

  const prevStep = () => {
    setCurrentStep((current) => (current > 0 ? current - 1 : current));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepOne onNext={nextStep} />;
      case 1:
        return <StepTwo onNext={nextStep} onPrev={prevStep} />;
      case 2:
        return <StepThree onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <Completed onPrev={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <Container size="md">
      <Paper radius="sm" p="xl" withBorder bg="#363a3e" m="xl">
        <Stack spacing="xl">
          <div>
            <Title order={2}>{getStepTitle(currentStep)}</Title>
          </div>
          <Stack w={"50%"} mx="auto">
            {renderStep()}
            <Group grow gap={5} mt="xs">
              {Array.from({ length: totalSteps }).map((_, index) =>
                currentStep < totalSteps - 1 ? (
                  <Progress
                    key={index}
                    value={currentStep >= index ? 100 : 0}
                    size="sm"
                    radius="xl"
                    bg={theme.colors.inputColor[0]}
                  />
                ) : null
              )}
            </Group>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
