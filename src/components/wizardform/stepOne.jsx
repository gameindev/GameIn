import { TextInput, PasswordInput, Stack, Button, Group } from "@mantine/core";
import { Controller } from "react-hook-form";
import { useFormStep } from "../../hooks/useFormSteps";
import { stepOneSchema } from "../../utils/validationSchema";
import DOBPicker from "../shared/DOBPicker";

const defaultValues = {
  username: "",
  email: "",
  password: "",
  dob: "",
};

export default function StepOne({ onNext }) {
  const methods = useFormStep({
    defaultValues,
    schema: stepOneSchema,
    onNext,
  });
  const { control, setValue, handleNextStep, errors } = methods;

  return (
    <Stack spacing="xl">
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label="E-mail"
            placeholder="Enter your email"
            error={errors.email?.message}
            withAsterisk
          />
        )}
      />

      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label="Username"
            placeholder="Enter your username"
            error={errors.username?.message}
            withAsterisk
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordInput
            {...field}
            label="Password"
            placeholder="Create a password"
            error={errors.password?.message}
            withAsterisk
          />
        )}
      />

      <DOBPicker
        control={control}
        setValue={setValue}
        error={errors?.dob?.message}
      />

      <Group position="right" mt="xl">
        <Button onClick={handleNextStep}>Next Step</Button>
      </Group>
    </Stack>
  );
}
