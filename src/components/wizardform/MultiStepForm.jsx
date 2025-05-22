import { Paper, Title, Text, Container, Progress, Stack } from "@mantine/core";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import Completed from "./Completed";
import { useState } from "react";

const getStepTitle = (step) => {
  switch (step) {
    case 0:
      return "Create Your Account";
    case 1:
      return "Choose Account Type";
    case 2:
      return "Social Profiles";
    case 3:
      return "Complete!";
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
    <Container size="sm">
      <Paper radius="md" p="xl" withBorder>
        <Stack spacing="xl">
          <div>
            <Title order={2}>{getStepTitle(currentStep)}</Title>
          </div>

          <Progress
            value={(currentStep / (totalSteps - 1)) * 100}
            size="sm"
            radius="xl"
          />

          {renderStep()}
        </Stack>
      </Paper>
    </Container>
  );
}
