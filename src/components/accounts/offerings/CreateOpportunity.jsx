import React from "react";
import { Box, Button, Flex, Grid, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { useFormHandler } from "../../../hooks/useFormHandler";
import OpportunitySection from "./OpportunitySection";
import OpportunityFormFields from "./OpportunityFormFields";
import StatBox from "../../shared/ui/StatBox";
import SwitchButton from "../../shared/ui/Switch";
import FormField from "../../shared/ui/FormField";
import useApi from "../../../hooks/useApi";
import { API_PATHS } from "../../../services/endpoints";
import { showNotification } from "../../../utils/helpers";
import { buildOfferingPayload } from "../../../config/mappers/offeringMappers";
import {
  defaultValues,
  sections,
} from "../../../config/formConfigs/opportunityConfig";

function Section({ title, children, ...props }) {
  return (
    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
      <StatBox title={title} {...props}>
        <Box p="2.5rem">{children}</Box>
      </StatBox>
    </Grid.Col>
  );
}

export default function CreateOpportunity() {
  const navigate = useNavigate();
  const { post, loading } = useApi();

  const { control, handleSubmit, reset, setValue } = useFormHandler({
    defaultValues,
    onSubmit: async (data) => {
      const payload = buildOfferingPayload(data, "create");
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
          <Section title="Set Date & Title">
            <OpportunityFormFields
              control={control}
              type="dateTitle"
              setValue={setValue}
            />
          </Section>

          <Section title="Set your price">
            <OpportunityFormFields
              control={control}
              type="price"
              setValue={setValue}
            />
          </Section>

          <Section title="Terms of use" background="rgba(105, 179, 231, 0.2)">
            <OpportunityFormFields control={control} type="terms" />
          </Section>
        </Grid>
      </Group>

      <Box w="100%" h={1} style={{ borderBottom: "1px dashed #50565a" }} />

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
