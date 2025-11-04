import { Box, Button, Stack, Text } from "@mantine/core";
import { theme } from "../../../shared/styles/theme/customTheme";
import { Link } from "react-router";
import routePaths from "../../../app/router/routes";


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
                {/* <Button variant="primary" mt="md" style={{ alignSelf: "flex-start" }}>
                    Import Existing
                </Button> */}
            </Stack>
        </Box>
    )
}