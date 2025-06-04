import StatBox from "../../components/shared/StatBox";
import { Text, Grid } from "@mantine/core";

export default function Inbox() {
  return (
    <Grid gutter={20}>
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
      <Grid.Col span={{ base: 12 }}>
        <StatBox>
          <Text>Stat</Text>
        </StatBox>
      </Grid.Col>
    </Grid>
  );
}
