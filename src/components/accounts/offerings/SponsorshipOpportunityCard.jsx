import { Box, Stack, Text, Button, Group } from "@mantine/core";
import routePaths from "../../../routes/endpoints";
import { Link } from "react-router";

export default function SponsorshipOpportunityCard() {
  return (
    <Box p="lg">
      <Stack spacing="xs">
        <Group spacing="xs">
          <Text size="sm">add a</Text>
        </Group>
        <Text
          size="xl"
          weight={700}
          style={{ lineHeight: 1.2, textTransform: "uppercase" }}
        >
          sponsorship <br /> opportunity
        </Text>
      </Stack>

      <Stack spacing="xs">
        <Link to={routePaths.ACCOUNTS.OFFERINGS.CREATE_OFFERING}>
          <Button variant="primary" mt="md" style={{ alignSelf: "flex-start" }}>
            get started
          </Button>
        </Link>
        <Button variant="primary" mt="md" style={{ alignSelf: "flex-start" }}>
          Import Existing
        </Button>
      </Stack>
    </Box>
  );
}
