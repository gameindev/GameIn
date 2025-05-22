import { Stack, Button, Group, Title, Text, Box, Transition } from '@mantine/core';
import { useSelector } from 'react-redux';

export default function Completed({ onPrev }) {
  const formData = useSelector((state) => state.multiStepForm.formData);

  return (
    <Stack spacing="xl" align="center">
      <Transition
        mounted={true}
        transition="bounce"
        duration={1000}
        timingFunction="ease"
        keepMounted
      >
        {(styles) => (
          <Box style={{ ...styles, fontSize: '64px' }}>
            🎉
          </Box>
        )}
      </Transition>

      <Title order={2} ta="center">
        Congratulations!
      </Title>

      <Text size="lg" ta="center">
        Your account has been successfully created.
      </Text>

      <Box
        p="md"
        style={{
          backgroundColor: 'var(--mantine-color-gray-0)',
          borderRadius: 'var(--mantine-radius-md)',
          width: '100%'
        }}
      >
        <Text size="sm" fw={500}>
          Account Details:
        </Text>
        <Text size="sm" c="dimmed">
          Username: {formData.username}
        </Text>
        <Text size="sm" c="dimmed">
          Email: {formData.email}
        </Text>
        <Text size="sm" c="dimmed">
          Account Type: {formData.role}
        </Text>
        {formData.website && (
          <Text size="sm" c="dimmed">
            Website: {formData.website}
          </Text>
        )}
        {formData.github && (
          <Text size="sm" c="dimmed">
            GitHub: {formData.github}
          </Text>
        )}
      </Box>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={onPrev}>
          Back
        </Button>
      </Group>
    </Stack>
  );
}
