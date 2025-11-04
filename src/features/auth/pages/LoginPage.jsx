import { Button, Container, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import FormField from "../../../shared/components/FormField";
import { Link, useNavigate } from "react-router";
import routePaths from "../../../app/router/routes";
import OAuthLoginBtn from "../components/OAuthLoginBtn";
import { fieldsMapper } from "../types/fields.mapper";
import { loginValidationSchema } from "../schema/loginValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../app/store/hooks";
import useApi from "../../../shared/hooks/useApi";
import { setAuth } from "../store/authSlice";
import { setUser } from "../store/userSlice";
import { simpleLogin } from "../services/simpleLogin.service";
import { loginUtils } from "../services/login.service";


const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { post, get, loading, error } = useApi();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            identifier: "",
            password: "",
        },
        resolver: yupResolver(loginValidationSchema),
        mode: "onSubmit",
    });

    // Simple login handler using the service
    const handleLogin = useCallback(async (formData) => {
        if (isSubmitting) return; // Prevent multiple submissions
        
        setIsSubmitting(true);
        
        try {
            // Validate form data before sending
            const validation = loginUtils.validateLoginForm(formData);
            if (!validation.isValid) {
                throw new Error(Object.values(validation.errors).join(", "));
            }

            // Use the simple login service (matches original implementation exactly)
            await simpleLogin(
                formData,
                { post, get },
                dispatch,
                navigate,
                { setAuth, setUser }
            );
            
        } catch (err) {
            console.error("Login error:", err);
            // The service handles error display and navigation
        } finally {
            setIsSubmitting(false);
        }
    }, [isSubmitting, post, get, dispatch, navigate]);

    return (
        <Container size="md">
            <Paper radius="sm" p="xl" withBorder bg="#363a3e" my="5em" mx="xl">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <Stack spacing="xl">
                        <Title order={2}>Login</Title>

                        <Stack w="50%" mx="auto">
                            {fieldsMapper.map(({ name, label, placeholder, component: Component }) => (
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

                            <Group
                                position="center"
                                mt="md"
                                style={{ justifyContent: "center" }}
                            >
                                <Button
                                    variant="primary"
                                    size="sm"
                                    type="submit"
                                    loading={loading || isSubmitting}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </Button>
                            </Group>

                            <Text size="xs" mt="sm" align="center">
                                Don't have an account?{" "}
                                <Link to={routePaths.REGISTER} style={{ textDecoration: "none" }}>
                                    Register
                                </Link>
                            </Text>
                        </Stack>

                        <Group position="center" style={{ justifyContent: "center" }}>
                            {/* <GoogleLoginBtn /> */}
                            <OAuthLoginBtn />
                        </Group>
                    </Stack>
                </form>
            </Paper>
        </Container>
    )
}

export default LoginPage;