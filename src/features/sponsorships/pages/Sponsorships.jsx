import { Grid, Text } from "@mantine/core";
import StatBox from "../../../shared/components/StatBox";
import IconButton from "../../../shared/components/IconButton";
import SponsorshipsOffers from "../components/SponsorshipsOffers";
import OngoingSponsorships from "../components/OngoingSponsorships";

export default function Sponsorships() {
    return (
        <Grid gutter={20}>
            <Grid.Col span={{ base: 12 }} style={{ minHeight: "auto" }}>
                <StatBox
                    title={"Ongoing Sponsorships"}
                    action={<IconButton hoverClass="hoverYellow" />}
                    accordion
                    defaultOpen={true}
                >
                    <OngoingSponsorships />
                </StatBox>
            </Grid.Col>

            <Grid.Col span={{ base: 12 }} style={{ minHeight: "auto" }}>
                <StatBox
                    title={"Offers"}
                    action={<IconButton hoverClass="hoverYellow" />}
                    accordion
                    defaultOpen={true}
                >
                    <SponsorshipsOffers />
                </StatBox>
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
                <StatBox>
                    <Text>Stat</Text>
                </StatBox>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <StatBox>
                    <Text>Stat</Text>
                </StatBox>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <StatBox>
                    <Text>Stat</Text>
                </StatBox>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <StatBox>
                    <Text>Stat</Text>
                </StatBox>
            </Grid.Col>
        </Grid >
    )
}