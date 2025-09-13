import { Box, Stack, Text, Button, Group } from "@mantine/core";
import routePaths from "../../../routes/endpoints";
import { Link } from "react-router";
import { theme } from "../../../styles/theme/customTheme";

export default function SponsorshipOpportunityCard() {
  return (
    <Box p="lg">
      <Stack gap={0} mt={"xl"}>
        <Text size="sm">add a</Text>
        <Text
          size="xl"
          weight={700}
          c={theme.colors.primary[0]}
          style={{ lineHeight: 1.2, textTransform: "uppercase" }}
        >
          sponsorship <br /> opportunity
        </Text>
      </Stack>

      <Stack gap={0}>
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
