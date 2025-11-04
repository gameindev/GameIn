import { Box, Grid } from "@mantine/core";
import StatBox from "../../../shared/components/StatBox";


export default function OfferingSection({ title, children, background, ...props }) {
    return (
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <StatBox title={title} background={background} {...props}>
                <Box p="1.5rem">{children}</Box>
            </StatBox>
        </Grid.Col>
    );
}