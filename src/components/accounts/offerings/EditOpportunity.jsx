import React from "react";
import { Box, Button, Flex, Grid, Group, Image, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { useFormHandler } from "./../../../hooks/useFormHandler";
import OpportunityFormFields from "./OpportunityFormFields";
import StatBox from "../../shared/ui/StatBox";
import SwitchButton from "../../shared/ui/Switch";
import FormField from "../../shared/ui/FormField";
import streamingLogo from "../../../assets/accounts/offerings/streaming-logo.png";
import commercialBreak from "../../../assets/accounts/offerings/commercial-break.png";
import socialMediaPost from "../../../assets/accounts/offerings/social-media-post.png";
import merchProducts from "../../../assets/accounts/offerings/merch-products.png";

const defaultValues = {
  streaming: { enabled: false, platform: "", timeMode: "", size: "" },
  videoCommercial: {
    enabled: false,
    platform: "",
    timeMode: "",
    size: "",
    duration: "",
    repetation: "",
  },
  socialMedia: { enabled: false, platform: "", timeMode: "", size: "" },
  merchProducts: { enabled: false, platform: "", timeMode: "", types: "" },
  dateTitle: { startDate: null, endDate: null, title: "", description: "" },
  price: {
    choosePrice: "",
    gameinFee: "75.00",
    gameinTax: "1.815,98",
    paymentType: "",
  },
  terms: { acknowledgement: false },
  sponsorEdit: true,
};

export default function EditOpportunity() {
  const navigate = useNavigate();

  const { control, handleSubmit } = useFormHandler({
    defaultValues,
    onSubmit: async (data) => {
      console.log("Form Submitted", data);
    },
  });

  const sections = [
    {
      number: "01",
      title: "STREAMING LOGO PLACEMENT",
      description: "You are offering to place a brand logo in your live stream",
      type: "streaming",
      image: streamingLogo,
    },
    {
      number: "02",
      title: "VIDEO: COMMERCIAL BREAK",
      description: "You are offering to generate product ads in your videos",
      type: "videoCommercial",
      image: commercialBreak,
    },
    {
      number: "03",
      title: "SOCIAL MEDIA POSTING",
      description:
        "You are offering to place branded posts in your social media accounts",
      type: "socialMedia",
      image: socialMediaPost,
    },
    {
      number: "04",
      title: "MERCH, CLOTHING, PRODUCTS",
      description:
        "You are offering to place advertisings in your social media accounts",
      type: "merchProducts",
      image: merchProducts,
    },
  ];

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Group justify="center" mb={20}>
        <Text fz={35} align="center">
          Edit this sponsorship opportunity
        </Text>
      </Group>

      <Grid gutter={20}>
        {sections.map(({ number, title, type, image }) => (
          <Grid.Col key={type} span={{ base: 12, md: 6, lg: 4 }}>
            <StatBox
              title={
                <Text component="span">
                  <Text component="span" fw={700} inherit>
                    {number}
                  </Text>{" "}
                  {title}
                </Text>
              }
            >
              <Box p="2.5rem">
                <Box w={"100%"} h={"5rem"} mb={"md"}>
                  <Image
                    w={"100%"}
                    h={"100%"}
                    fit="cover"
                    radius="md"
                    src={image}
                  />
                </Box>
                <OpportunityFormFields control={control} type={type} />
              </Box>
            </StatBox>
          </Grid.Col>
        ))}
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <StatBox title="Set Date & Title">
            <Box p="2.5rem">
              <OpportunityFormFields control={control} type="dateTitle" />
            </Box>
          </StatBox>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <StatBox title="Set your price">
            <Box p="2.5rem">
              <OpportunityFormFields control={control} type="price" />
            </Box>
          </StatBox>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <StatBox title="Terms of use" background="rgba(105, 179, 231, 0.2)">
            <Box p="2.5rem">
              <OpportunityFormFields control={control} type="terms" />
            </Box>
          </StatBox>
        </Grid.Col>
      </Grid>

      <Group py="3.75rem">
        <Grid gutter={20}></Grid>
      </Group>

      <Box w="100%" h={1} style={{ borderBottom: "1px dashed #50565a" }} />

      <Group py={"3.75rem"} align={"center"} justify={"center"}>
        <Flex gap={32}>
          <Button
            width="11.875rem"
            variant="inputBgColor"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Flex w={"25%"} ta={"right"}>
            <Text>Can sponsor edit you offer</Text>
            <FormField
              name="sponsorEdit"
              control={control}
              Component={SwitchButton}
              componentProps={{ label: "" }}
            />
          </Flex>
          <Button width="11.875rem" variant="primary" type="submit">
            Save
          </Button>
        </Flex>
      </Group>
    </Box>
  );
}
