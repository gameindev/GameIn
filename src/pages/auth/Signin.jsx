/* eslint-disable */
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
import { useFormStep } from "../../hooks/useFormStep";
import { loginSchema } from "../../utils/validationSchema";
import { loginStart, loginFailure } from "../../lib/redux/slices/authSlice";
import FormField from "../../components/shared/FormField";

const defaultValues = {
  username: "",
  password: "",
};

const fields = [
  {
    name: "username",
    label: "Username",
    placeholder: "Your username",
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
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (data) => {
    try {
      dispatch(loginStart());
      console.log(data);
      navigate("/dashboard");
    } catch (err) {
      dispatch(loginFailure(err?.response?.data?.message || "Login failed"));
    }
  };

  const { control, handleSubmit, errors } = useFormStep({
    defaultValues,
    schema: loginSchema,
    onSubmit: handleLogin,
  });

  return (
    <Container size="md">
      <Paper radius="sm" p="xl" withBorder bg="#363a3e" my="5rem" mx="xl">
        <form onSubmit={handleSubmit}>
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
