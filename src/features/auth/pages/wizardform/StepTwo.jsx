import { Box, Button, Flex, Group, Radio, Stack, Text } from "@mantine/core";
import { stepTwoValidationSchema } from "../../schema/stepTwoValidation";
import FormField from "../../../../shared/components/FormField";
import { theme } from "../../../../shared/styles/theme/customTheme";
import { USERTYPES } from "../../../../shared/enums/userTypesEnum";
import { useFormStep } from "../../hooks/useFormStep";
import { stepTwoFieldsMapper } from "../../types/fields.mapper";



const defaultValues = {
    role: USERTYPES.CREATOR,
};

export default function StepTwo({ onNext, onPrev }) {
    const { control, handleNextStep, handlePrevStep, errors, formValues } = useFormStep({
        formId: "register",
        defaultValues,
        schema: stepTwoValidationSchema,
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
                            {stepTwoFieldsMapper.map(({ label, value, description, icon: Icon }) => (
                                <Radio.Card
                                    key={value}
                                    value={value}
                                    radius="md"
                                    flex="0 0 calc(50% - var(--mantine-spacing-xs) / 2)"
                                    bg={theme.colors.inputBgColor[0]}
                                    style={{ border: "0.125emsolid transparent" }}
                                >
                                    <Box p="xl" className="flex flex-col items-center justify-center" style={{ textAlign: "center" }}>
                                        <Icon color={theme.colors.primary[0]} />
                                        <Text
                                            tt="uppercase"
                                            mt="sm"
                                            fw={700}
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
                <Button variant="primary" onClick={handleNextStep}>
                    Continue
                </Button>
            </Group>
        </Stack>
    )
}