import React from "react";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Image,
  Text,
  Textarea,
  FileInput,
} from "@mantine/core";
import { useNavigate } from "react-router";
import { useFormHandler } from "../../../hooks/useFormHandler";
import OpportunityFormFields from "./OpportunityFormFields";
import StatBox from "../../shared/ui/StatBox";
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
  note: `Dear creator XYZ,
  We like your content and want to support this tournament! We are looking for a permanent Logo Placement throughout the tournament and a Commercial Break after every game, therefore we can skip all social media posts or merch. We uploaded all the data for you to download here: https://www.googledrive... We are looking forward to work with you!,`,
  uploadLogo: null,
};

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
    description: "You are offering to post branded content on social media",
    type: "socialMedia",
    image: socialMediaPost,
  },
  {
    number: "04",
    title: "MERCH, CLOTHING, PRODUCTS",
    description: "You are offering to advertise via merch or physical products",
    type: "merchProducts",
    image: merchProducts,
  },
];

export default function EditOpportunity() {
  const navigate = useNavigate();

  const { control, handleSubmit, watch } = useFormHandler({
    defaultValues,
    onSubmit: async (data) => {
      console.log("Form Submitted", data);
    },
  });

  const uploadedLogo = watch("uploadLogo");

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Group py="3.75rem" justify="center" mb={20}>
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
                  <Text component="span" fw={700}>
                    {number}
                  </Text>{" "}
                  {title}
                </Text>
              }
            >
              <Box p="2.5rem">
                <Image
                  src={image}
                  radius="md"
                  w="100%"
                  h="5rem"
                  mb="md"
                  fit="cover"
                />
                <OpportunityFormFields
                  control={control}
                  type={type}
                  mode="edit"
                />
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
          <StatBox title="Leave a note">
            <Box p="2.5rem">
              <FormField
                name="note"
                control={control}
                Component={Textarea}
                componentProps={{
                  placeholder: "Write your custom message here...",
                  autosize: true,
                  minRows: 4,
                  maxRows: 10,
                }}
              />
              <Flex gap={20} align="center" mt="lg">
                <ActionIcon size="lg" color="inputBgColor" variant="filled">
                  <Text size="xs">Inbox</Text>
                </ActionIcon>
                <Text>Get in touch with creator</Text>
              </Flex>
            </Box>
          </StatBox>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <StatBox title="Upload your logo">
            <Box p="2.5rem">
              <Text mb="sm">
                Submit your Logo as PDF, SVG, EPS vector graphic or PNG pixel
                graphic with a min. of 1000px width and transparent background
                if possible. All other data must be exchanged directly.
              </Text>
              <Box>
                <Flex gap={20} align={"center"} mt={"lg"}>
                  <ActionIcon size="lg" color="inputBgColor" variant="filled">
                    <FormField
                      name="uploadLogo"
                      control={control}
                      Component={FileInput}
                      componentProps={{
                        placeholder: "Upload logo",
                        accept: ".png,.svg,.pdf,.eps",
                      }}
                    />
                  </ActionIcon>
                  <Text>Upload</Text>
                </Flex>
              </Box>
              <Box mt="lg">
                <Text my="sm">Preview</Text>
                {uploadedLogo ? (
                  <Image
                    src={URL.createObjectURL(uploadedLogo)}
                    w="100%"
                    h="4rem"
                    fit="cover"
                    radius="md"
                  />
                ) : (
                  <Image
                    radius="md"
                    src={null}
                    h="4rem"
                    w="100%"
                    fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                  />
                )}
              </Box>
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

      <Box w="100%" h={1} style={{ borderBottom: "1px dashed #50565a" }} />

      <Group py="3.75rem" align="center" justify="center">
        <Flex gap={32}>
          <Button variant="inputBgColor" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="primary" type="submit">
            Request Sponsorship
          </Button>
        </Flex>
      </Group>
    </Box>
  );
}
