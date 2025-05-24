import { Radio, Stack, Button, Group, Title } from "@mantine/core";
import { useFormStep } from "../../hooks/useFormStep";
import { stepTwoSchema } from "../../utils/validationSchema";
import { Controller } from "react-hook-form";

const defaultValues = {
  role: "",
};

export default function StepTwo({ onNext, onPrev }) {
  const { control, handleNextStep, handlePrevStep, errors, formValues } =
    useFormStep({
      defaultValues,
      schema: stepTwoSchema,
      onNext,
      onPrev,
    });

  return (
    <Stack spacing="xl">
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Radio.Group
            {...field}
            value={formValues.role}
            label="Select Role:"
            error={errors.role?.message}
            withAsterisk
          >
            <Stack mt="md">
              <Radio value="admin" label="Admin" />
              <Radio value="creator" label="Creator" />
              <Radio value="brand" label="Brand" />
              <Radio value="community" label="Community" />
            </Stack>
          </Radio.Group>
        )}
      />

      <Group position="apart" mt="xl" style={{ justifyContent: 'center' }}>
        <Button variant="default" onClick={handlePrevStep}>
          Back
        </Button>
        <Button onClick={handleNextStep}>Continue</Button>
      </Group>
    </Stack>
  );
}
