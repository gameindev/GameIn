import {
  TextInput,
  PasswordInput,
  Stack,
  Button,
  Group,
  Text,
  Checkbox,
  Space,
} from "@mantine/core";
import { useEffect } from "react";
import { Link } from "react-router";
import DOBPicker from "./../../shared/ui/DOBPicker";
import { useFormStep } from './../../../hooks/useFormStep';
import FormField from './../../shared/ui/FormField';
import { stepOneSchema } from './../../../utils/schemas/validationSchema';
import useCheckIdentifierExists from "../../../hooks/useCheckIdentifierExists";

// default values for the form
const defaultValues = {
  email: "",
  username: "",
  password: "",
  dob: "",
  dobDay: "",
  dobMonth: "",
  dobYear: "",
  acknowledgement: false,
};

// fields for the form
const fields = [
  {
    name: "email",
    label: "E-mail",
    placeholder: "Enter your email",
    component: TextInput,
  },
  {
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
    component: TextInput,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Create a password",
    component: PasswordInput,
  },
];

export default function StepOne({ onNext }) {
  // form steps information

  const { checkExists } = useCheckIdentifierExists();

  const { control, setValue, watch, handleNextStep, errors } = useFormStep({
    formId: "register",
    defaultValues,
    schema: stepOneSchema(checkExists),
    onNext,
  });

  // watch the dob fields and set the dob value
  const [day, month, year] = watch(["dobDay", "dobMonth", "dobYear"]);

  // set the dob value when the dob fields change
  useEffect(() => {
    if (day && month && year) {
      setValue("dob", `${year}-${month}-${day}`);
    }
  }, [day, month, year, setValue]);

  return (
    <Stack spacing="xl">
      {fields.map(({ name, label, placeholder, component: InputComponent }) => (
        <FormField
          key={name}
          name={name}
          control={control}
          Component={InputComponent}
          componentProps={{
            label,
            placeholder,
            withAsterisk: true,
          }}
        />
      ))}

      <DOBPicker control={control} error={errors?.dob?.message} />

      <FormField
        name="acknowledgement"
        control={control}
        Component={Checkbox}
        componentProps={{
          label: "I agree to the terms and conditions",
        }}
      />

      <Group mt="lg" position="center" style={{ justifyContent: "center" }}>
        <Button variant="primary" onClick={handleNextStep}>
          Continue
        </Button>
      </Group>

      <Text size="xs" align="center">
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "none" }}>
          Login
        </Link>
      </Text>
    </Stack>
  );
}
