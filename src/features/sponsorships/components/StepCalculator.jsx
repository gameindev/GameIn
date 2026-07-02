import { Box, Text } from "@mantine/core";
import React from "react";
import HexContainer from "../../../shared/components/HexContainer";
import { getStepColor } from "../utils/step.helper";
import { theme } from "../../../shared/styles/theme/customTheme";




export default function StepCalculator({ currentStep }) {
    const totalSteps = 4;

    return (
        <Box
            display="flex"
            align="center"
            justify="center"
            style={{
                gap: "0.5em",
                flex: 1,
                alignItems: "center",
                // Add responsive style for small screens
                ...(window.innerWidth < 575 && {
                    width: "100%",
                    justifyContent: "space-between",
                }),
            }}
        >

            {Array.from({ length: totalSteps }).map((_, i) => (
                <React.Fragment key={i}>
                    <HexContainer size={30} background={getStepColor(i, currentStep)}>
                        <Text size="xs" fw={900} c={"#3C4044"}>
                            {i + 1}
                        </Text>
                    </HexContainer>
                    {i < totalSteps - 1 && (
                        <Box
                            style={{
                                height: 2,
                                flex: 1,
                                backgroundColor:
                                    i < currentStep
                                        ? getStepColor(i + 1, currentStep)
                                        : theme.colors.inputBgColor[0],
                                borderRadius: 2,
                            }}
                        />
                    )}
                </React.Fragment>
            ))}
        </Box>
    );
}