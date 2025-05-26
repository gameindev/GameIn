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
import { Controller } from "react-hook-form";
import { stepOneSchema } from "../../utils/validationSchema";
import DOBPicker from "../shared/DOBPicker";
import { useEffect } from "react";
import { useFormStep } from "../../hooks/useFormStep";
import { Link } from "react-router";

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

export default function StepOne({ onNext }) {
    const { control, setValue, watch, handleNextStep, errors } = useFormStep({
        defaultValues,
        schema: stepOneSchema,
        onNext,
    });

    const day = watch("dobDay");
    const month = watch("dobMonth");
    const year = watch("dobYear");

    useEffect(() => {
        if (day && month && year) {
            setValue("dob", `${year}-${month}-${day}`);
        }
    }, [day, month, year, setValue]);

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

            <DOBPicker control={control} error={errors?.dob?.message} />

            <Space  />    
            <Controller
                name="acknowledgement"
                control={control}
                render={({ field }) => (
                    <Checkbox
                        {...field}
                        label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida odio eu enim tincidunt venenatis. Pellentesque neque ex, ultrices in urna nec, lacinia ultrices dolor."
                        error={errors.acknowledgement?.message}
                    />
                )}
            />
            <Group position="center" mt="lg" style={{ justifyContent: 'center' }}>
                <Button onClick={handleNextStep}>Continue</Button>
            </Group>

            <Text size="xs" mt="md" align="center">
                Already have an account ?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                    Login
                </Link>
            </Text>
        </Stack>
    );
}
