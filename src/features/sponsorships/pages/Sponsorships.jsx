import { Grid, Text } from "@mantine/core";
import StatBox from "../../../shared/components/StatBox";
import IconButton from "../../../shared/components/IconButton";
import SponsorshipsOffers from "../components/SponsorshipsOffers";
import OngoingSponsorships from "../components/OngoingSponsorships";
import SocialMediaStats from "../components/SocialMediaStats";
import { BarChart } from "@mantine/charts";

export default function Sponsorships() {
  return (
    <Grid gutter={20}>
      <Grid.Col span={{ base: 12 }} style={{ minHeight: "auto" }}>
        <StatBox title={"Ongoing Sponsorships"} accordion defaultOpen={true}>
          <OngoingSponsorships />
        </StatBox>
      </Grid.Col>

      <Grid.Col span={{ base: 12 }} style={{ minHeight: "auto" }}>
        <StatBox title={"Offers"} accordion defaultOpen={true}>
          <SponsorshipsOffers />
        </StatBox>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <StatBox>
          <BarChart
            h={300}
            data={[
              { month: "Jan", Smartphones: 4000, Laptops: 2400, Tablets: 2400 },
              { month: "Feb", Smartphones: 3000, Laptops: 1398, Tablets: 2210 },
              { month: "Mar", Smartphones: 2000, Laptops: 9800, Tablets: 2290 },
              { month: "Apr", Smartphones: 2780, Laptops: 3908, Tablets: 2000 },
              { month: "May", Smartphones: 1890, Laptops: 4800, Tablets: 2181 },
              { month: "Jun", Smartphones: 2390, Laptops: 3800, Tablets: 2500 },
              { month: "Jul", Smartphones: 3490, Laptops: 4300, Tablets: 2100 },
            ]}
            dataKey="month"
            series={[
              { name: "Smartphones", color: "violet.6" },
              { name: "Laptops", color: "violet.6" },
              { name: "Tablets", color: "violet.6" },
            ]}
            tickLine="y"
          />
        </StatBox>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
        <StatBox
          title="Social Media Stats"
          action={<IconButton hoverClass="hoverYellow" />}
          background={"transparent linear-gradient(45deg, #9d7fef3b 0%, #5ce5b03b 100%) 0% 0% no-repeat"}
        >
          <SocialMediaStats />
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
