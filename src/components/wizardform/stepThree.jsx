import { Stack, Button, Group, Box, Input, Loader } from "@mantine/core";
import { useFormStep } from "../../hooks/useFormStep";
import { stepThreeSchema } from "../../utils/validationSchema";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";

const defaultValues = {
    captcha: "",
};

export default function StepThree({ onNext, onPrev }) {
    const { handleSubmit, handlePrevStep, errors, setValue } = useFormStep({
        defaultValues,
        schema: stepThreeSchema,
        onNext,
        onPrev,
        onSubmit: (data) => {
            onNext(data);
        },
    });

    const isLoading = useSelector((state) => state.user?.isLoading ?? false);

    return (
        <Stack spacing="xl" align="center">
            <Box sx={{ position: "relative" }}>
                <ReCAPTCHA
                    theme="light"
                    size="normal"
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={(value) => {
                        setValue("captcha", value, { shouldValidate: true });
                    }}
                    onExpired={() => {
                        setValue("captcha", "", { shouldValidate: true });
                    }}
                />
                {errors.captcha && <Input.Error>{errors.captcha.message}</Input.Error>}
            </Box>

            <Group position="apart" mt="xl" style={{ justifyContent: "center" }}>
                <Button variant="default" onClick={handlePrevStep}>
                    Back
                </Button>
                <Button onClick={handleSubmit}>
                    {isLoading ? (<Loader type="dots" color="#333" size={20} />) : "Submit"}
                </Button>
            </Group>
        </Stack>
    );
}
