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
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validationSchema";
import FormField from "../../components/shared/FormField";
import { notifications } from "@mantine/notifications";
import useApi from "../../hooks/useApi";
import { API_PATHS } from "../../services/endpoints";
import { setAuth } from "../../stores/auth/authSlice";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

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
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });
  const { post, loading, error } = useApi();

  const handleLogin = async formData => {
    try {
      const { data } = await post(API_PATHS.AUTH.LOGIN, formData);

      dispatch(
        setAuth({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );
      notifications.show({
        title: "Login Successful",
        message: `Welcome back, ${data?.user?.username}!`,
        color: "green",
        position: "bottom-right",
      });

      const userType = data?.user?.userType?.toUpperCase();

      if (userType === "BRAND") {
        navigate("/brand/dashboard");
      } else if (userType === "CREATOR") {
        navigate("/creator/dashboard");
      } else {
        notifications.show({
          title: "Login Error",
          message: `Unknown user type. Contact support`,
          color: "red",
          position: "bottom-right",
        });
        navigate("/"); // or fallback
      }
    } catch (err) {
      console.error("Login failed", err);
      notifications.show({
        title: "Login Error",
        message: `Unknown user type. Contact support`,
        color: "red",
        position: "bottom-right",
      });
      navigate("/");
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
                <GoogleOAuthProvider clientId="1047586930496-duptdb5k4o2kldlfsmft3glsal69bo3a.apps.googleusercontent.com">
                  <GoogleLogin
                    buttonText="Login"
                    onSuccess={response => {
                      console.log(response);
                      fetch(
                        "http://localhost:3000/api/auth/google-authentication",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            token: response.credential,
                          }),
                        }
                      )
                        .then(response => console.log(response))
                        .then(data => console.log(data));
                    }}
                  />
                </GoogleOAuthProvider>
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
