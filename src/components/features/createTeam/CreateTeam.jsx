import React, { useState } from "react";
import {
  Paper,
  Container,
  Stack,
  Flex,
  Text,
  Box,
} from "@mantine/core";
import { Settings } from "lucide-react";
import GeneralInfo from "./GeneralInfo";
import AdminsTeams from "./AdminsTeams";
import SocialMedia from "./SocialMedia";
import InputStats from "./InputStats";
import Payments from "./Payments";
import FinalReview from "./FinalReview";
import { theme } from "../../../styles/theme/customTheme";
import SectionHeader from "./../../shared/ui/SectionHeader";
import HexContainer from "../../shared/ui/HexContainer";

const FORM_STEPS = [
  {
    title: "General Info",
    component: GeneralInfo,
    showProgressBar: true,
    canGoBack: false,
    validateOnExit: true,
  },
  {
    title: "Admins & Teams",
    component: AdminsTeams,
    showProgressBar: true,
    canGoBack: true,
    validateOnExit: true,
  },
  {
    title: "Social Media",
    component: SocialMedia,
    showProgressBar: true,
    canGoBack: true,
    validateOnExit: true,
  },
  {
    title: "Input Stats",
    component: InputStats,
    showProgressBar: true,
    canGoBack: true,
    validateOnExit: true,
  },
  {
    title: "Payment",
    component: Payments,
    showProgressBar: true,
    canGoBack: true,
    validateOnExit: true,
  },
  {
    title: "Final Review",
    component: FinalReview,
    showProgressBar: true,
    canGoBack: true,
    validateOnExit: false,
  },
];

const stepColors = [
  "#b472f2",
  "#728df2",
  "#72a3f2",
  "#72c3f2",
  "#72f2c3",
  "#72f2a3",
];

const StepCalculator = ({ currentStep, steps }) => {
  return (
    <Box
      ta="center"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5em",
        flex: 1,
      }}
    >
      {steps.map((_, stepIndex) => (
        <React.Fragment key={stepIndex}>
          <HexContainer
            size={30}
            background={
              stepIndex <= currentStep
                ? stepColors[stepIndex]
                : theme.colors.inputBgColor[0]
            }
          >
            <Text size="xs" fw={900} c={"#3C4044"}>
              {stepIndex + 1}
            </Text>
          </HexContainer>

          {stepIndex < steps.length - 1 && (
            <Box
              style={{
                height: 2,
                flex: 1,
                backgroundColor:
                  stepIndex < currentStep
                    ? stepColors[stepIndex + 1]
                    : theme.colors.inputBgColor[0],
                borderRadius: 2,
                transition: "background-color 0.3s ease",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default function CreateTeam() {
  const [stepIndex, setStepIndex] = useState(0);
  const totalSteps = FORM_STEPS.length;

  // get current step information
  const {
    component: StepComponent,
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
      <div>
        <SectionHeader icon={<Settings />} text={"CREATE TEAM"} />
      </div>
      <Container size="lg">
        <Paper radius="sm" bg={"transparent"} my={"5em"} mx={"xl"}>
          {/* {showProgressBar && (
            <Group grow gap={3} mb={40}>
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
          )} */}
          <Flex flex={3} gap="sm" align="center" my="lg">
            <StepCalculator currentStep={stepIndex} steps={FORM_STEPS} />
          </Flex>
          <Stack spacing="xl">
            <Stack>
              <StepComponent
                onNext={goToNextStep}
                onPrev={goToPrevStep}
                validateOnExit={validateOnExit}
                canGoBack={canGoBack}
              />
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
