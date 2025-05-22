import { TextInput, Stack, Button, Group, Title } from "@mantine/core";
import { useFormStep } from "../../hooks/useFormSteps";
import { stepThreeSchema } from "../../utils/validationSchema";

const defaultValues = {
  website: "",
  github: "",
};

export default function StepThree({ onNext, onPrev }) {
  const { register, handleNextStep, handlePrevStep, errors, formValues } =
    useFormStep({
      defaultValues,
      schema: stepThreeSchema,
      onNext,
      onPrev,
    });

  return (
    <Stack spacing="xl">
      <Title order={2}>Social Profiles</Title>

      <TextInput
        {...register("website")}
        value={formValues.website}
        label="Website"
        placeholder="Your website URL"
        error={errors.website?.message}
      />

      <TextInput
        {...register("github")}
        value={formValues.github}
        label="GitHub"
        placeholder="Your GitHub username"
        error={errors.github?.message}
      />

      <Group position="apart" mt="xl">
        <Button variant="default" onClick={handlePrevStep}>
          Back
        </Button>
        <Button onClick={handleNextStep}>Next Step</Button>
      </Group>
    </Stack>
  );
}
