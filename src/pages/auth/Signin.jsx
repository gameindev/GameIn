import { TextInput, Container, Paper, PasswordInput, Stack, Button, Group, Title, Text, } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validationSchema";
import FormField from "../../components/shared/FormField";
import useApi from "../../hooks/useApi";
import { API_PATHS } from "../../services/endpoints";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { showNotification } from "../../utils/helpers";
import { setUser } from "../../stores/slices/user";
import { setAuth } from "../../stores/slices/auth";

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
  const { control, handleSubmit } = useForm({ defaultValues, resolver: yupResolver(loginSchema), mode: "onSubmit", });
  const { post, loading, error } = useApi();

  const handleLogin = async formData => {
    try {
      const { data } = await post(API_PATHS.AUTH.LOGIN, formData);
      dispatch(setAuth({accessToken: data.accessToken, refreshToken: data.refreshToken}));
      dispatch(setUser({user: data.user}))
      showNotification("Login Successful", `Welcome back, ${data?.user?.username}!`)

      const userType = data?.user?.userType?.toUpperCase();

      if (!userType) {
        showNotification("Login Error", `Unknown user type. Contact support`, "red")
        navigate("/"); 
        return;
      }
      if (userType === "BRAND") navigate("/brand/dashboard")
        
      if (userType === "ADMIN") navigate("/admin/dashboard")
    } catch (err) {
      showNotification("Login Error", `${err?.message || "Something went wrong"}`, "red")
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
