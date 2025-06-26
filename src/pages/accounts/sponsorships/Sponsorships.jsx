import StatBox from "../../../components/shared/ui/StatBox";
import { Text, Grid } from "@mantine/core";
import IconButton from "./../../../components/shared/ui/IconButton";
import OngoingSponsorships from "../../../components/accounts/sponsorships/OngoingSponsorships";

export default function Sponsorships() {
  return (
    <Grid gutter={20}>
      <Grid.Col span={{ base: 12 }}>
        <StatBox
          title={"Ongoing Sponsorships"}
          action={<IconButton />}
          accordion
          defaultOpen={true}
        >
          <OngoingSponsorships />
        </StatBox>
      </Grid.Col>
      <Grid.Col span={{ base: 12 }}>
        <StatBox>
          <Text>Stat</Text>
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
    </Grid>
  );
}
