import { Modal, Button, TextInput, Select, Paper, Stack, Title, } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { OAuthProfile } from "../../../utils/schemas/validationSchema";
import { USERTYPES } from "./../../../utils/enum";
import FormField from './../ui/FormField';
import useApi from "../../../hooks/useApi";
import { API_PATHS } from "../../../services/endpoints";

const defaultValues = {
    userType: "",
    password: "",
};

export default function CompleteProfile({ opened, onComplete, accessToken }) {

    const { control, handleSubmit } = useForm({
        defaultValues,
        resolver: yupResolver(OAuthProfile),
        mode: "onSubmit",
    });

    const { patch } = useApi();

    const onSubmit = async (formData) => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        };
        try {
            const { data } = await patch(API_PATHS.AUTH.SELECT_ROLE, formData, headers);
            onComplete({ user: data });
        } catch (error) {
            return Promise.reject("Complete profile error:", error);
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={() => { }}
            withCloseButton={false}
            title="Please Update Your Credentials"
            centered
        >
            <Paper shadow="md" radius="md" p="xl" withBorder w="400px" mx="auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Title order={3} mb="md">
                        Complete Your Profile
                    </Title>
                    <Stack>
                        <FormField
                            name="userType"
                            control={control}
                            Component={Select}
                            componentProps={{
                                label: "User Type",
                                placeholder: "Select a user type",
                                data: [
                                    { value: USERTYPES.CREATOR, label: "Creator" },
                                    { value: USERTYPES.BRAND, label: "Brand" },
                                    { value: USERTYPES.COMMUNITY, label: "Community" },
                                ],
                                withAsterisk: true,
                                searchable: true,
                                nothingFoundMessage: "No match",
                            }}
                        />
                        <FormField
                            name="password"
                            control={control}
                            Component={TextInput}
                            componentProps={{
                                label: "Set a Password",
                                type: "password",
                                placeholder: "Enter your password",
                                withAsterisk: true,
                            }}
                        />
                        <Button fullWidth mt="md" type="submit">
                            Complete & Login
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Modal>
    );
}
