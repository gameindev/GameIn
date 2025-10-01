import React, { memo, useEffect, useMemo } from "react";
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
} from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { useFormHandler } from "../../../hooks/useFormHandler";
import FormField from "../../../components/shared/ui/FormField";
import {
  editDefaultValues,
  sections,
} from "../../../config/formConfigs/opportunityConfig";
import { IconMessage } from "@tabler/icons-react";
import OpportunityFormFields from "../../../components/accounts/offerings/OpportunityFormFields";
import StatBox from "../../../components/shared/ui/StatBox";
import { useOfferings } from "../hooks/useOfferings";
import { FormDisableProvider } from "../../../context/FormDisableContext";
import Preloader from "../../../components/shared/ui/Preloader";
import UploadLogoField from "./updateLogoField";
import { useOfferExpiry } from "../hooks/useOfferExpiry";
import { theme } from "../../../styles/theme/customTheme";
import ExpiryTimer from "./expiryTimer";
import { offeringService } from "../services/offeringService";

const Section = memo(({ title, children, ...props }) => (
  <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
    <StatBox title={title} {...props}>
      <Box p="2.5rem">{children}</Box>
    </StatBox>
  </Grid.Col>
));

export default function EditOpportunity({ rolePermissions }) {
  const { offeringId } = useParams();
  const navigate = useNavigate();

  const { offerings, loading, error, submitEdit, toFormValues } = useOfferings({
    offeringId,
  });

  const { control, handleSubmit, watch, setValue, reset } = useFormHandler({
    defaultValues: editDefaultValues,
    onSubmit: (data) => {
      if (!expired && offerings?.last_adjusted_at) {
        alert(
          "You cannot edit this sponsorship opportunity until the timer expires."
        );
        return;
      }
      submitEdit(data, () => navigate(-1));
    },
  });

  const sponsorEdit = watch("sponsorEdit");

  useEffect(() => {
    if (offerings) reset(toFormValues(offerings));
  }, [offerings, reset, toFormValues]);

  const { expired } = useOfferExpiry(offerings?.last_adjusted_at);

  const enabledSections = useMemo(() => {
    const latestOffer = offeringService.getLatestOffers(
      offerings?.offering_offers
    );
    if (!latestOffer) return [];

    const enabledTypes = latestOffer
      .filter((o) => o.offer_type)
      .map((o) => o.offer_type);

    return sections
      .filter((s) => enabledTypes.includes(s.type))
      .map((s, idx) => ({
        ...s,
        number: String(idx + 1).padStart(2, "0"),
      }));
  }, [offerings]);

  const overrideDisabledFields = useMemo(() => {
    return rolePermissions?.overrideDisabledFields.length
      ? rolePermissions.overrideDisabledFields
      : [];
  }, [rolePermissions]);

  if (loading) return <Preloader />;
  if (error)
    return (
      <Box p="xl">
        <Text c="red">Failed to load offering. Please try again.</Text>
      </Box>
    );
  if (offerings.length == 0)
    return (
      <Box p="xl">
        <Text c="dimmed">No offering found</Text>
      </Box>
    );

  return (
    <FormDisableProvider disabled={!(sponsorEdit && expired)}>
      <Box component="form" onSubmit={handleSubmit}>
        <Group py="3.75rem" justify="space-between" mb={20}>
          <Text fz={35}>
            Edit this
            <br aria-hidden="true" />
            <Text component="span" c={theme.colors.primary[0]} fw={700}>
              {" "}
              Sponsorship Opportunity
            </Text>
          </Text>
          {offerings?.last_adjusted_at && (
            <ExpiryTimer lastAdjustedAt={offerings?.last_adjusted_at} />
          )}
        </Group>

        <Grid gutter={20}>
          {enabledSections.map((s) => (
            <Section
              key={s.type}
              title={
                <Text component="span">
                  <Text component="span" fw={700}>
                    {s.number}
                  </Text>{" "}
                  {s.title}
                </Text>
              }
            >
              <Image
                src={s.image}
                radius="md"
                w="100%"
                h="5rem"
                mb="md"
                fit="cover"
              />
              <OpportunityFormFields
                control={control}
                type={s.type}
                mode="edit"
                overrideDisabledFields={overrideDisabledFields}
              />
            </Section>
          ))}

          <Section title="Set Date & Title">
            <OpportunityFormFields
              control={control}
              type="dateTitle"
              mode="edit"
              overrideDisabledFields={overrideDisabledFields}
            />
          </Section>

          <Section title="Set your price">
            <OpportunityFormFields
              control={control}
              type="price"
              setValue={setValue}
              mode="edit"
              overrideDisabledFields={overrideDisabledFields}
            />
          </Section>

          <Section title="Leave a note">
            <FormField
              name="note"
              control={control}
              Component={Textarea}
              componentProps={{
                placeholder: "Write your custom message here...",
                autosize: true,
                minRows: 4,
                maxRows: 10,
                disabled: false,
              }}
            />
            <Flex gap={20} align="center" mt="lg">
              <ActionIcon size="lg" color="inputBgColor" variant="filled">
                <IconMessage size={16} />
              </ActionIcon>
              <Text>Get in touch with creator</Text>
            </Flex>
          </Section>

          <UploadLogoField control={control} offering={offerings} />

          <Section title="Terms of use" background="rgba(105, 179, 231, 0.2)">
            <OpportunityFormFields
              control={control}
              type="terms"
              overrideDisabledFields={["terms.acknowledgement"]}
            />
          </Section>
        </Grid>

        <Box w="100%" h={1} style={{ borderBottom: "1px dashed #50565a" }} />

        <Group py="3.75rem" align="center" justify="center">
          <Flex gap={32}>
            <Button variant="inputBgColor" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={!expired && offerings?.last_adjusted_at}
            >
              {!expired && offerings?.last_adjusted_at
                ? `Edit Locked`
                : "Request Sponsorship"}
            </Button>
          </Flex>
        </Group>
      </Box>
    </FormDisableProvider>
  );
}
