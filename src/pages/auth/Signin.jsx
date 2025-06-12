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
import useApi from "../../hooks/useApi";
import { API_PATHS } from "../../services/endpoints";
import { showNotification } from "../../utils/helpers";
import { setUser } from "../../stores/slices/user";
import { setAuth } from "../../stores/slices/auth";
import GoogleLoginBtn from "./../../components/shared/oAuth/GoogleLoginBtn";
import routePaths from "../../routes/endpoints";
import FormField from './../../components/shared/ui/FormField';

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

  const handleLogin = async (formData) => {
    try {
      const { data } = await post(API_PATHS.AUTH.LOGIN, formData);
      dispatch(
        setAuth({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );
      dispatch(setUser({ user: data.user }));
      showNotification(
        "Login Successful",
        `Welcome back, ${data?.user?.username}!`
      );

      const userType = data?.user?.userType?.toUpperCase();

      if (!userType) {
        showNotification(
          "Login Error",
          `Unknown user type. Contact support`,
          "red"
        );
        navigate(routePaths.welcomePage);
        return;
      }
      if (userType === "BRAND") navigate(routePaths.dashboard);

      if (userType === "ADMIN") navigate(routePaths.dashboard);
    } catch (err) {
      showNotification(
        "Login Error",
        `${err?.message || "Something went wrong"}`,
        "red"
      );
      navigate(routePaths.welcomePage);
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

              <Group
                position="apart"
                mt="md"
                style={{ justifyContent: "center" }}
              >
                <Button
                  variant="primary"
                  size="sm"
                  padding="0.5rem"
                  width="8.5rem"
                  type="submit"
                  loading={loading}
                >
                  Login
                </Button>
              </Group>

              <Text size="xs" mt="sm" align="center">
                Don't have an account?{" "}
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Register
                </Link>
              </Text>
            </Stack>
            <Group position="apart" style={{ justifyContent: "center" }}>
              <GoogleLoginBtn />
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
