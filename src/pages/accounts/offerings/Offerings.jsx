import SponsorshipOpportunityCard from "../../../components/accounts/offerings/SponsorshipOpportunityCard";
import IconButton from "../../../components/shared/ui/IconButton";
import StatBox from "../../../components/shared/ui/StatBox";
import { Text, Grid } from "@mantine/core";

export default function Offerings() {
  return (
    <Grid gutter={20}>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <StatBox
          title="Sponsorships"
          action={<IconButton onClick={() => {}} />}
        >
          <SponsorshipOpportunityCard />
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
    </Grid>
  );
}
