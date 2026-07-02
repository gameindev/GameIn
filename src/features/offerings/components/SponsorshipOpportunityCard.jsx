import { Button, Stack, Text } from "@mantine/core";
import { Link } from "react-router";
import routePaths from "../../../app/router/routes";
import { OpportunityCardContent } from "../styles/offering-card-style";


export default function SponsorshipOpportunityCard() {
    return (
        <OpportunityCardContent>
            <span className="add-symbol" aria-hidden="true">+</span>
            <Stack gap={0}>
                <Text className="add-label">add a</Text>
                <span className="opportunity-title">
                    sponsorship<br />opportunity
                </span>
                <Link to={routePaths.ACCOUNTS.OFFERINGS.CREATE_OFFERING}>
                    <Button variant="primary" className="start-button">
                        get started
                    </Button>
                </Link>
                {/* <Button variant="primary" mt="md" style={{ alignSelf: "flex-start" }}>
                    Import Existing
                </Button> */}
            </Stack>
        </OpportunityCardContent>
    )
}
