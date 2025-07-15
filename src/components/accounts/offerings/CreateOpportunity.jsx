import React from "react";
import { Box, Button, Grid, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { useFormHandler } from "./../../../hooks/useFormHandler";
import { OpportunityFormFields } from "./OpportunityFormFields";
import OpportunitySection from "./OpportunitySection";
import StatBox from "../../shared/ui/StatBox";

export default function CreateOpportunity() {
  const navigate = useNavigate();

  const { control, handleSubmit } = useFormHandler({
    defaultValues: {
      streaming: {
        platform: "",
        timeMode: "",
        repetation: "",
        duration: "",
        within: "",
        beginning: "",
        ending: "",
        size: "",
      },
    },
    onSubmit: async (data) => {
      console.log("Form Submitted", data);
    },
  });

  const sections = [
    {
      number: "01",
      title: "STREAMING LOGO PLACEMENT",
      description: "You are offering to place a brand logo in your live stream",
      statTitle: "01 Streaming logo placement",
      formContent: <OpportunityFormFields control={control} type="streaming" />,
      mediaPreview: (
        <img src="/assets/streaming-logo.png" width="100%" alt="Preview" />
      ),
    },
    {
      number: "02",
      title: "VIDEO: COMMERCIAL BREAK",
      description: "You are offering to generate product ads in your videos",
      statTitle: "02 Video: Commercial break",
      formContent: (
        <OpportunityFormFields control={control} type="videoCommercial" />
      ),
      mediaPreview: (
        <img src="/assets/commercial-break.png" width="100%" alt="Preview" />
      ),
    },
    {
      number: "03",
      title: "SOCIAL MEDIA POSTING",
      description:
        "You are offering to place branded posts in your social media accounts",
      statTitle: "03 Social media posting",
      formContent: (
        <OpportunityFormFields control={control} type="socialMedia" />
      ),
      mediaPreview: (
        <img src="/assets/social-media-post.png" width="100%" alt="Preview" />
      ),
    },
    {
      number: "04",
      title: "MERCH, CLOTHING, PRODUCTS",
      description:
        "You are offering to place advertisings in your social media accounts",
      statTitle: "04 Merch, clothing, products",
      formContent: (
        <OpportunityFormFields control={control} type="merchProducts" />
      ),
      mediaPreview: (
        <img src="/assets/social-media-post.png" width="100%" alt="Preview" />
      ),
    },
  ];

  return (
    <Box>
      <Group pos={"relative"} justify="center">
        <Button
          pos={"absolute"}
          left={0}
          variant="light"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Text fz={35} align="center" mb={20}>
          Setup Your Sponsorship Opportunity
        </Text>
      </Group>

      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <OpportunitySection {...section} />
          <Box w="100%" h={1} style={{ borderBottom: "1px dashed #50565a" }} />
        </React.Fragment>
      ))}

      <Group py={"3.75rem"}>
        <Grid gutter={20}>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <StatBox title={"Set Date & Title"}>
              <Box p={"2.5rem"}>
                <OpportunityFormFields control={control} type="dateTitle" />
              </Box>
            </StatBox>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <StatBox title={"Set your price"}>
              <Box p={"2.5rem"}>
                <OpportunityFormFields control={control} type="price" />
              </Box>
            </StatBox>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <StatBox
              title={"Terms of use"}
              background={"rgba(105, 179, 231, 0.2)"}
            >
              <Box p={"2.5rem"}>
                <OpportunityFormFields control={control} type="terms" />
              </Box>
            </StatBox>
          </Grid.Col>
        </Grid>
      </Group>
    </Box>
  );
}
