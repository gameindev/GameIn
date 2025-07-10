import { Box, Button, Grid, Group, Select, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import StatBox from "../../shared/ui/StatBox";
import SwitchButton from "../../shared/ui/Switch";
import { theme } from "../../../styles/theme/customTheme";
import { OpportunityBlock } from "./style";
import React from "react";

const StreamingLogoInputs = () => (
  <Stack>
    <Select
      label="Platform"
      data={["Twitch", "YouTube"]}
      placeholder="Select"
    />
    <Select
      label="Time mode"
      data={["Live", "Pre-recorded"]}
      placeholder="Select"
    />
    <Select
      label="Size"
      data={["150 px", "300 px", "450 px"]}
      placeholder="Select size"
    />
  </Stack>
);

const opportunitySections = [
  {
    number: "01",
    title: "STREAMING LOGO PLACEMENT",
    description: "You are offering to place a brand logo in your live stream",
    statTitle: "01 Streaming logo placement",
    renderContent: StreamingLogoInputs,
  },
  {
    number: "02",
    title: "VIDEO: COMMERCIAL BREAK",
    description: "You are offering to generate product ads in your videos",
    statTitle: "02 Video: Commercial break",
    renderContent: null,
  },
  {
    number: "03",
    title: "SOCIAL MEDIA POSTING",
    description:
      "You are offering to place branded posts in your social media accounts",
    statTitle: "03 Social media posting",
    renderContent: null,
  },
  {
    number: "04",
    title: "MERCH, CLOTHING, PRODUCTS",
    description:
      "You are offering to place advertisings in your social media accounts",
    statTitle: "04 Merch, clothing, products",
    renderContent: null,
  },
];

export default function CreateOpportunity() {
  const navigate = useNavigate();
  const Separator = () => (
    <Box w="100%" h={1} style={{ borderBottom: "0.063rem dashed #50565a" }} />
  );
  return (
    <>
      <Group pos={"relative"} justify="center">
        <Button
          pos={"absolute"}
          left={0}
          variant="darkGrey"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Text fz={35} align="center" mb={20}>
          Setup Your Sponsorship Opportunity
        </Text>
      </Group>

      {opportunitySections.map((section, index) => (
        <React.Fragment key={index}>
          <OpportunityBlock key={index}>
            <Stack py={"3.75rem"}>
              <Box className="opportunityHeader">
                <div className="opportunityTitle">
                  <Text
                    fz={"3.438rem"}
                    c={theme.colors.primary[0]}
                    component="span"
                  >
                    {section.number}
                  </Text>
                  <Text fz={"1.25rem"} c={theme.colors.white[0]}>
                    {section.title}
                  </Text>
                </div>
                <div className="opportunitySelector">
                  <Text fz={theme.fontSizes.sm} mb={"0.625rem"}>
                    {section.description}
                  </Text>
                  <SwitchButton />
                </div>
              </Box>
              <Grid gutter={20}>
                <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                  <StatBox
                    title={section.statTitle}
                    background={
                      "transparent linear-gradient(45deg,  rgba(157, 127, 239, 0.2) 0%, rgba(105, 179, 231, 0.2) 50%, rgba(92, 229, 176, 0.2) 100%) 0% 0% no-repeat padding-box"
                    }
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
                  <StatBox>
                    {console.log(section.renderContent)}
                    {section.renderContent !== null ? (
                      section.renderContent()
                    ) : (
                      <Text fz={theme.fontSizes.sm}>
                        Content for {section.title} goes here.
                      </Text>
                    )}
                  </StatBox>
                </Grid.Col>
              </Grid>
            </Stack>
          </OpportunityBlock>
          <Separator key={`separator-${index}`} />
        </React.Fragment>
      ))}
    </>
  );
}
