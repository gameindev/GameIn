import React from "react";
import { Box, Button, Flex, Grid, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { useFormHandler } from "./../../../hooks/useFormHandler";
import OpportunitySection from "./OpportunitySection";
import OpportunityFormFields from "./OpportunityFormFields";
import StatBox from "../../shared/ui/StatBox";
import SwitchButton from "../../shared/ui/Switch";
import FormField from "../../shared/ui/FormField";
import useApi from "./../../../hooks/useApi";
import streamingLogo from "../../../assets/accounts/offerings/streaming-logo.png";
import commercialBreak from "../../../assets/accounts/offerings/commercial-break.png";
import socialMediaPost from "../../../assets/accounts/offerings/social-media-post.png";
import merchProducts from "../../../assets/accounts/offerings/merch-products.png";
import { API_PATHS } from "../../../services/endpoints";
import { showNotification } from "../../../utils/helpers";
import { buildOfferingPayload } from "../../../config/mappers/offeringMappers";

// static form defaults stay here
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
    gameinFee: "00.00",
    gameinTax: "00.00",
    paymentType: "PAYPAL",
  },
  terms: { acknowledgement: false },
  sponsorEdit: false,
};

export default function CreateOpportunity() {
  const navigate = useNavigate();
  const { post, loading } = useApi();

  const { control, handleSubmit, reset, setValue } = useFormHandler({
    defaultValues,
    onSubmit: async (data) => {

      const payload = buildOfferingPayload(data);
      console.log("Payload to API", payload);

      try {
        const res = await post({ url: API_PATHS.OFFERINGS.CREATE, payload });
        const title = res?.data?.offering?.title || "Offering";

        reset();
        showNotification(
          "Offering Created",
          `${title} has been created successfully.`,
          "green"
        );
        console.log("Response from API", res);

        navigate(-1);
      } catch (err) {
        console.error("API error", err);
        showNotification(
          "Error",
          `Something went wrong while creating the offering. ${err}`,
          "red"
        );
      }
    },
  });

  // your section configs for UI
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
          Setup Your Sponsorship Opportunity
        </Text>
      </Group>

      {sections.map(({ number, title, description, type, image }) => (
        <React.Fragment key={type}>
          <OpportunitySection
            number={number}
            title={title}
            description={description}
            type={type}
            mediaPreview={image}
            control={control}
            statTitle={`${number} ${title}`}
            formContent={
              <OpportunityFormFields control={control} type={type} />
            }
          />
          <Box w="100%" h={1} style={{ borderBottom: "1px dashed #50565a" }} />
        </React.Fragment>
      ))}

      {/* Dates, Price, Terms */}
      <Group py="3.75rem">
        <Grid gutter={20}>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <StatBox title="Set Date & Title">
              <Box p="2.5rem">
                <OpportunityFormFields
                  control={control}
                  type="dateTitle"
                  setValue={setValue}
                />
              </Box>
            </StatBox>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <StatBox title="Set your price">
              <Box p="2.5rem">
                <OpportunityFormFields
                  control={control}
                  type="price"
                  setValue={setValue}
                />
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
      </Group>

      <Box w="100%" h={1} style={{ borderBottom: "1px dashed #50565a" }} />

      {/* Footer buttons */}
      <Group py="3.75rem" align="center" justify="center">
        <Flex gap={32}>
          <Button
            width="11.875rem"
            variant="inputBgColor"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Back
          </Button>

          <Flex w="25%" ta="right">
            <Text>Can sponsor edit your offer</Text>
            <FormField
              name="sponsorEdit"
              control={control}
              Component={SwitchButton}
              componentProps={{ label: "" }}
            />
          </Flex>

          <Button
            width="11.875rem"
            variant="primary"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Save
          </Button>
        </Flex>
      </Group>
    </Box>
  );
}
