import { Box, Button, Flex, Group, Paper, Text, Title } from "@mantine/core";
import { IconX, IconCircleX } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { theme } from "../../../shared/styles/theme/customTheme";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: theme.colors.grey[0],
      }}
    >
      <Paper
        p="xl"
        radius="lg"
        shadow="md"
        style={{ maxWidth: 500, width: "100%" }}
      >
        <Flex direction="column" align="center" gap="md">
          <Box
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: theme.colors.error?.[0] || "#f44336",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconCircleX size={50} color="white" />
          </Box>

          <Title order={2} ta="center">
            Payment Cancelled
          </Title>

          <Text c="dimmed" ta="center" size="sm">
            Your payment was cancelled. You can try again anytime.
          </Text>

          <Flex gap="md" mt="xl" w="100%">
            <Button
              variant="default"
              onClick={() => navigate("/dashboard")}
              style={{ flex: 1 }}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate(-1)}
              style={{ flex: 1 }}
            >
              Try Again
            </Button>
          </Flex>
        </Flex>
      </Paper>
    </Box>
  );
};

export default PaymentCancel;
