import { Button, Checkbox, Group, Stack, Text } from "@mantine/core";
import { stepOneFieldsMapper } from "../../types/fields.mapper";
import FormField from "../../../../shared/components/FormField";
import DOBPicker from "../../../../shared/components/DOBPicker";
import { Link } from "react-router";
import useCheckIdentifierExists from "../../hooks/useCheckIdentifierExists";
import { useFormStep } from "../../hooks/useFormStep";
import { useEffect } from "react";
import { stepOneValidationSchema } from "../../schema/stepOneValidation";
import routePaths from "../../../../app/router/routes";


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

export default function StepOne({ onNext }) {
    const { checkExists } = useCheckIdentifierExists();

    const { control, setValue, watch, handleNextStep, errors } = useFormStep({
        formId: "register",
        defaultValues,
        schema: stepOneValidationSchema(checkExists),
        onNext,
    });

    // watch the dob fields and set the dob value
    const [day, month, year] = watch(["dobDay", "dobMonth", "dobYear"]);

    // set the dob value when the dob fields change
    useEffect(() => {
        if (day && month && year) {
            setValue("dob", `${year}-${month}-${day}`);
            console.log(`${year}-${month}-${day}`);
        }
    }, [day, month, year, setValue]);

    return (
        <Stack spacing="xl">
            {stepOneFieldsMapper.map(({ name, label, placeholder, component: InputComponent }) => (
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
                <Link to={routePaths.LOGIN} style={{ textDecoration: "none" }}>
                    Login
                </Link>
            </Text>
        </Stack>
    )
}