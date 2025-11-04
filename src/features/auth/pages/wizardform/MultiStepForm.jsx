import { Container, Flex, Group, Paper, Progress, Stack, Text, Title } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { theme } from "../../../../shared/styles/theme/customTheme";
import { useState } from "react";
import { FORM_STEPS } from "../../types/multistepForm.mapper";


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
                <Paper radius="sm" p="xl" withBorder bg="#363a3e" my={"5em"} mx={"xl"}>
                    <Stack spacing="xl">
                        <Flex align="center" gap="xs" justify="start">
                            <Text component="span" style={{ display: "inline-flex" }}>
                                <IconUser color={theme.colors.primary[0]} />
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
    )
}