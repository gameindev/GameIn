import { Stack, Button, Group, Box, Input, Loader } from "@mantine/core";
import { useFormStep } from "../../../hooks/useFormStep";
import { stepThreeSchema } from "../../../utils/validationSchema";
import ReCAPTCHA from "react-google-recaptcha";

// default values for the form
const defaultValues = {
    captcha: "",
};

export default function StepThree({ onNext, onPrev }) {
    // form steps information
    const { handleSubmit, isSubmitting, handlePrevStep, errors, setValue } = useFormStep({
        defaultValues,
        schema: stepThreeSchema,
        isFinalStep: true,
        onNext,
        onPrev,
        onSubmit: (data) => {
            console.log("Submitting to API:", data);
            onNext(data);
        },
    });

    return (
        <Stack spacing="xl" align="center">
            <Box
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                mt={"xl"}
            >
                <ReCAPTCHA
                    theme="light"
                    size="compact"
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={(value) => {
                        setValue("captcha", value, { shouldValidate: true });
                    }}
                    onExpired={() => {
                        setValue("captcha", "", { shouldValidate: true });
                    }}
                />
                {errors.captcha && (
                    <Input.Error mt="xs">{errors.captcha.message}</Input.Error>
                )}
            </Box>

            <Group position="apart" mt="xl" style={{ justifyContent: "center" }}>
                <Button variant="default" onClick={handlePrevStep}>
                    Back
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {isSubmitting ? <Loader type="dots" size="sm" color="#333" /> : "Submit"}
                </Button>
            </Group>
        </Stack>
    );
}
