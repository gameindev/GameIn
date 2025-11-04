import { Button, Modal, Paper, Select, Stack, Title } from "@mantine/core";
import FormField from "../../../shared/components/FormField";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { TextInput } from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { oAuthProfileValidationSchema } from "../schema/oAuthProfileValidation";
import useApi from "../../../shared/hooks/useApi";
import { AUTH_ENDPOINTS } from "../api/authEndpoints";
import { useForm } from "react-hook-form";
import axios from "axios";


const CompleteProfile = ({ opened, onClose, onComplete, accessToken }) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            // Mantine Select expects null for no value; TextInput prefers empty string
            user_type: null,
            password: "",
        },
        resolver: yupResolver(oAuthProfileValidationSchema),
        mode: "onSubmit",
    });

    const { patch } = useApi();

    const onSubmit = async (formData) => {
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}${AUTH_ENDPOINTS.SELECT_ROLE}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            // Some APIs wrap the payload under `data`
            const user = response?.data?.data ?? response?.data ?? response;
         
            onComplete({ accessToken, user });
        } catch (error) {
            return Promise.reject(error);
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
                            name="user_type"
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
                        <Button fullWidth mt="md" variant="primary" type="submit">
                            Complete & Login
                        </Button>
                    </Stack> 
                </form>
            </Paper>
        </Modal>
    )
}

export default CompleteProfile;