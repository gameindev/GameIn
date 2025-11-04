import { Grid, Text } from "@mantine/core";
import StatBox from "../../../shared/components/StatBox";


const NewsFeed = () => {
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


export default NewsFeed