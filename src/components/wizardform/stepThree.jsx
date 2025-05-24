import { Stack, Button, Group, Box, Input } from "@mantine/core";
import { useFormStep } from "../../hooks/useFormStep";
import { stepThreeSchema } from "../../utils/validationSchema";
import ReCAPTCHA from "react-google-recaptcha";

const defaultValues = {
  captcha: "",
};

export default function StepThree({ onNext, onPrev }) {
  const { handleNextStep, handlePrevStep, errors, setValue } = useFormStep({
    defaultValues,
    schema: stepThreeSchema,
    onNext,
    onPrev,
  });

  return (
    <Stack spacing="xl">
      <Box sx={{ position: "relative" }}>
        <ReCAPTCHA
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

      <Group position="apart" mt="xl">
        <Button variant="default" onClick={handlePrevStep}>
          Back
        </Button>
        <Button onClick={handleNextStep}>Next Step</Button>
      </Group>
    </Stack>
  );
}
