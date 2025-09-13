import React from "react";
import { Box, Button, Flex, Grid, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { useFormHandler } from "./../../../hooks/useFormHandler";
import OpportunitySection from "./OpportunitySection";
import OpportunityFormFields from "./OpportunityFormFields";
import StatBox from "../../shared/ui/StatBox";
import SwitchButton from "../../shared/ui/Switch";
import FormField from "../../shared/ui/FormField";
import streamingLogo from "../../../assets/accounts/offerings/streaming-logo.png";
import commercialBreak from "../../../assets/accounts/offerings/commercial-break.png";
import socialMediaPost from "../../../assets/accounts/offerings/social-media-post.png";
import merchProducts from "../../../assets/accounts/offerings/merch-products.png";
import useApi from "./../../../hooks/useApi";
import { API_PATHS } from "../../../services/endpoints";

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
    gameinTax: "215.00",
    paymentType: "PAYPAL",
  },
  terms: { acknowledgement: false },
  sponsorEdit: false,
};

export default function CreateOpportunity() {
  const navigate = useNavigate();
  const { post, loading, error } = useApi();

  const { control, handleSubmit, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data) => {
      const payload = {
        offering: {
          type: "INDIVIDUAL",
          status: "OFFERED",
          ...(data.dateTitle.title && { title: data.dateTitle.title }),
          ...(data.dateTitle.description && {
            description: data.dateTitle.description,
          }),
          ...(data.dateTitle.startDate && {
            start_date: data.dateTitle.startDate,
          }),
          ...(data.dateTitle.endDate && { end_date: data.dateTitle.endDate }),
          ...(data.terms.acknowledgement && {
            is_terms_signed: data.terms.acknowledgement,
          }),
          ...(data.sponsorEdit !== undefined && { can_edit: data.sponsorEdit }),
        },
        offers: [
          data.streaming.enabled && {
            offer_type: "LOGO_STREAM",
            ...(data.streaming.platform && {
              platform: data.streaming.platform.toUpperCase(),
            }),
            ...(data.streaming.timeMode && {
              time_mode: data.streaming.timeMode,
            }),
            ...(data.streaming.size && { size: data.streaming.size }),
          },
          data.videoCommercial.enabled && {
            offer_type: "VIDEO_COMMERCIAL",
            ...(data.videoCommercial.platform && {
              platform: data.videoCommercial.platform.toUpperCase(),
            }),
            ...(data.videoCommercial.timeMode && {
              time_mode: data.videoCommercial.timeMode,
            }),
            ...(data.videoCommercial.duration && {
              duration: data.videoCommercial.duration,
            }),
            ...(data.videoCommercial.repetation && {
              repetition: data.videoCommercial.repetation,
            }),
            ...(data.videoCommercial.size && {
              size: data.videoCommercial.size,
            }),
          },
          data.socialMedia.enabled && {
            offer_type: "SOCIAL_POST",
            ...(data.socialMedia.platform && {
              platform: data.socialMedia.platform.toUpperCase(),
            }),
            ...(data.socialMedia.timeMode && {
              time_mode: data.socialMedia.timeMode,
            }),
            ...(data.socialMedia.size && { size: data.socialMedia.size }),
          },
          data.merchProducts.enabled && {
            offer_type: "MERCH_PRODUCTS",
            ...(data.merchProducts.platform && {
              platform: data.merchProducts.platform.toUpperCase(),
            }),
            ...(data.merchProducts.timeMode && {
              time_mode: data.merchProducts.timeMode,
            }),
            ...(data.merchProducts.types && {
              sub_type: data.merchProducts.types,
            }),
          },
        ].filter(Boolean),
        price: {
          ...(data.price.choosePrice && { price: data.price.choosePrice }),
          ...(data.price.gameinFee && { platform_fee: data.price.gameinFee }),
          ...(data.price.gameinTax && { tax: data.price.gameinTax }),
          ...(data.price.paymentType && {
            payment_provider: data.price.paymentType.toUpperCase(),
          }),
        },
      };
      console.log("Payload to API", payload);
      try {
        const responseData = await post(API_PATHS.OFFERINGS.CREATE, payload);
        reset("");
        console.log("Response from API", responseData);
      } catch (err) {
        console.error("API error", err);
      }
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
            control={control}
            statTitle={`${number} ${title}`}
            formContent={
              <OpportunityFormFields control={control} type={type} />
            }
            mediaPreview={image}
          />
          <Box w="100%" h={1} style={{ borderBottom: "1px dashed #50565a" }} />
        </React.Fragment>
      ))}

      <Group py="3.75rem">
        <Grid gutter={20}>
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
