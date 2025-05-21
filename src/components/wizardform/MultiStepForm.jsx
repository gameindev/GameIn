import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Code,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { stepOneSchema } from "../../utils/validationSchema";

export default function MultiStepForm() {
  const [active, setActive] = useState(0);

  const [initialValue, setInitialValue] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    website: "",
    github: "",
  });

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(stepOneSchema),
    mode: "onTouched",
  });

  const nextStep = async () => {
    let valid = false;

    if (active === 0) {
      valid = await trigger(["username", "password"]);
    } else if (active === 1) {
      valid = await trigger(["name", "email"]);
    } else {
      valid = true;
    }

    if (valid) {
      setActive((current) => (current < 3 ? current + 1 : current));
    }
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active}>
        <Stepper.Step label="First step" description="Profile settings">
          <TextInput
            label="Username"
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 6,
                message: "Username must include at least 6 characters",
              },
            })}
            error={errors.username?.message}
          />
          <PasswordInput
            mt="md"
            label="Password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must include at least 6 characters",
              },
            })}
            error={errors.password?.message}
          />
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Personal information">
          <TextInput
            label="Name"
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must include at least 2 characters",
              },
            })}
            error={errors.name?.message}
          />
          <TextInput
            mt="md"
            label="Email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/,
                message: "Invalid email",
              },
            })}
            error={errors.email?.message}
          />
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Social media">
          <TextInput
            label="Website"
            placeholder="Website"
            {...register("website")}
          />
          <TextInput
            mt="md"
            label="GitHub"
            placeholder="GitHub"
            {...register("github")}
          />
        </Stepper.Step>

        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(getValues(), null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </>
  );
}
