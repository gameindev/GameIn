import React from "react";
import { Box, Grid, Stack, Text } from "@mantine/core";
import SwitchButton from "./../../shared/ui/Switch";
import StatBox from "./../../shared/ui/StatBox";
import { theme } from "../../../styles/theme/customTheme";
import { OpportunityBlock } from "./style";

export default function OpportunitySection({
  number,
  title,
  description,
  statTitle,
  formContent,
  mediaPreview,
}) {
  return (
    <OpportunityBlock>
      <Stack py={"3.75rem"}>
        <Box className="opportunityHeader">
          <div className="opportunityTitle">
            <Text fz={"3.438rem"} c={theme.colors.primary[0]} component="span">
              {number}
            </Text>
            <Text fz={"1.25rem"} c={theme.colors.white[0]}>
              {title}
            </Text>
          </div>
          <div className="opportunitySelector">
            <Text fz={theme.fontSizes.sm} mb={"0.625rem"}>
              {description}
            </Text>
            <SwitchButton />
          </div>
        </Box>
        <Grid gutter={20}>
          <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
            <StatBox
              title={statTitle}
              background="transparent linear-gradient(45deg,  rgba(157, 127, 239, 0.2) 0%, rgba(105, 179, 231, 0.2) 50%, rgba(92, 229, 176, 0.2) 100%) 0% 0% no-repeat padding-box"
            >
              {formContent ? (
                <Box p={"2.5rem"}>{formContent}</Box>
              ) : (
                <Text fz={theme.fontSizes.sm}>
                  Content for {title} goes here.
                </Text>
              )}
            </StatBox>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
            <StatBox></StatBox>
          </Grid.Col>
        </Grid>
      </Stack>
    </OpportunityBlock>
  );
}
