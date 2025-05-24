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
import { Controller } from "react-hook-form";
import { loginSchema } from "../../utils/validationSchema";
import { useFormStep } from "../../hooks/useFormStep";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../lib/redux/slices/authSlice";
import axios from "axios";

const defaultValues = {
  username: "",
  password: "",
};

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
      dispatch(loginFailure(err.response?.data?.message || "Login failed"));
    }
  };

  const { control, handleSubmit, errors } = useFormStep({
    defaultValues,
    schema: loginSchema,
    onSubmit: handleLogin,
  });

  return (
    <Container size="md">
      <Paper radius="md" p="xl" withBorder bg="#363a3e" m="xl">
        <form onSubmit={handleSubmit}>
          <Stack spacing="xl">
            <Title order={2}>Login</Title>
            {error && (
              <Text color="red" size="sm">
                {error}
              </Text>
            )}
            <Stack w={"50%"} mx="auto">
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="Username"
                    placeholder="Your username"
                    error={errors.username?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    error={errors.password?.message}
                    {...field}
                  />
                )}
              />
              <Group position="apart" mt="md">
                <Button type="submit" loading={loading}>
                  Login
                </Button>
              </Group>
              <Text size="sm" mt="md">
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
