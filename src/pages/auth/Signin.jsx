import {
    TextInput,
    Container,
    Paper,
    PasswordInput,
    Stack,
    Button,
    Group,
    Title,
    Text,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validationSchema";
import FormField from "../../components/shared/FormField";
import { notifications } from '@mantine/notifications';

// import { loginUserAsync } from "../../stores/user/user.action"; // 👈 Your async thunk
import {
    selectUserLoading,
} from "../../stores/user/user.selector";
import { loginUserAsync } from "../../stores/user/user.action";

const defaultValues = {
    identifier: "",
    password: "",
};

const fields = [
    {
        name: "identifier",
        label: "Username or email address",
        placeholder: "Your username or email address",
        type: TextInput,
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Your password",
        type: PasswordInput,
    },
];

export default function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.user?.error);
    const loading = useSelector(selectUserLoading);
    const { control, handleSubmit } = useForm({ defaultValues, resolver: yupResolver(loginSchema), mode: "onSubmit"});

    const handleLogin = async (data) => {
        const result = await dispatch(loginUserAsync(data));

        if (result?.success) {
            const userType = result?.data?.userType?.toUpperCase();

            notifications.show({
                title: 'Login Successful',
                message: `Welcome back, ${result?.data?.username}!`,
                color: 'green',
                position: 'top-right',
            })

            if (userType === "BRAND") {
                navigate("/brand/dashboard");
            } else if (userType === "CREATOR") {
                navigate("/creator/dashboard");
            } else {
                notifications.show({
                    title: 'Login Error',
                    message: `Unknown user type. Contact support`,
                    color: 'red',
                    position: 'top-right',
                })
                navigate("/"); // or fallback
            }
            
        } else {
            notifications.show({
                title: 'Login Error',
                message: `${result?.error || "Login failed"}`,
                color: 'red',
                position: 'top-right',
            })
        }
    };

    return (
        <Container size="md">
            <Paper radius="sm" p="xl" withBorder bg="#363a3e" my="5rem" mx="xl">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <Stack spacing="xl">
                        <Title order={2}>Login</Title>

                        {error && (
                            <Text color="red" size="sm">
                                {error}
                            </Text>
                        )}

                        <Stack w="50%" mx="auto">
                            {fields.map(({ name, label, placeholder, type: Component }) => (
                                <FormField
                                    key={name}
                                    name={name}
                                    control={control}
                                    Component={Component}
                                    componentProps={{
                                        label,
                                        placeholder,
                                        withAsterisk: true,
                                    }}
                                />
                            ))}

                            <Group position="apart" mt="md">
                                <Button type="submit" loading={loading}>
                                    Login
                                </Button>
                            </Group>

                            <Text size="xs" mt="md">
                                Don't have an account?{" "}
                                <Link to="/register" style={{ textDecoration: "none" }}>
                                    Register
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}
