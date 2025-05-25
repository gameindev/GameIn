import { Stack, Button, Group, Box, Input } from "@mantine/core";
import { useFormStep } from "../../hooks/useFormStep";
import { stepThreeSchema } from "../../utils/validationSchema";
import ReCAPTCHA from "react-google-recaptcha";

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

  return (
    <Stack spacing="xl" align="center">
      <Box sx={{ position: "relative" }}>
        <ReCAPTCHA
          theme="dark"
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
        <Button onClick={handleSubmit}>Continue</Button>
      </Group>
    </Stack>
  );
}
