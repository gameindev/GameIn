import React, { useState } from "react";
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
import { Settings } from "lucide-react";
import GeneralInfo from "./GeneralInfo";
import AdminsTeams from "./AdminsTeams";
import SocialMedia from "./SocialMedia";
import InputStats from "./InputStats";
import Payments from "./Payments";
import FinalReview from "./FinalReview";
import { theme } from "../../../styles/theme/customTheme";
import SectionHeader from "./../../shared/ui/SectionHeader";

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
        <Paper radius="sm" bg={"transparent"} my={"5rem"} mx={"xl"}>
          {showProgressBar && (
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
          )}
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
