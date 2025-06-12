import StatBox from './../../components/shared/ui/StatBox';
import { Text, Grid } from "@mantine/core";

export default function NewsFeed() {
  return (
    <Grid gutter={20}>
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
