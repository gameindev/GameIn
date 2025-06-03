import React from "react";
import { Grid } from "@mantine/core";
import { theme } from "../../styles/theme/customTheme";

export default function Profile() {
  return (
    <Grid sx={{ gap: "1rem" }}>
      <Grid.Col
        h={"15rem"}
        bg={theme.colors.secondaryGrey[0]}
        span={{ base: 12, md: 6, lg: 4 }}
      >
        Stats
      </Grid.Col>
      <Grid.Col
        bg={theme.colors.secondaryGrey[0]}
        span={{ base: 12, md: 6, lg: 4 }}
      >
        2
      </Grid.Col>
      <Grid.Col
        bg={theme.colors.secondaryGrey[0]}
        span={{ base: 12, md: 6, lg: 4 }}
      >
        3
      </Grid.Col>
    </Grid>
  );
}
