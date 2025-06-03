import {
  Modal,
  Button,
  TextInput,
  Select,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { completeProfile } from "../../utils/validationSchema";
import FormField from "../shared/FormField";
import { USERTYPES } from "../../utils/enum";

const defaultValues = {
  userType: "",
  password: "",
};

export default function CompleteProfile({ opened, onComplete }) {
  const accessToken = useSelector((state) => state.auth.accessToken);

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(completeProfile),
    mode: "onSubmit",
  });

  const onSubmit = async (formData) => {
    try {
      const res = await fetch("http://localhost:3000/api/users/assign-role", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      const { data } = await res.json();
      onComplete({ user: data });
    } catch (error) {
      console.error("Complete profile error:", error);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {}}
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
