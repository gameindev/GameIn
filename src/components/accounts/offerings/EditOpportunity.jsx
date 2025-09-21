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
  FileButton,
} from "@mantine/core";
import { useNavigate } from "react-router";
import { useFormHandler } from "../../../hooks/useFormHandler";
import OpportunityFormFields from "./OpportunityFormFields";
import StatBox from "../../shared/ui/StatBox";
import FormField from "../../shared/ui/FormField";
import {
  editDefaultValues,
  sections,
} from "./../../../config/formConfigs/opportunityConfig";
import { IconMessage } from "@tabler/icons-react";

function Section({ title, children, ...props }) {
  return (
    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
      <StatBox title={title} {...props}>
        <Box p="2.5rem">{children}</Box>
      </StatBox>
    </Grid.Col>
  );
}

function UploadLogoField({ control, uploadedLogo }) {
  return (
    <Section title="Upload your logo">
      <Text mb="sm">
        Submit your Logo as PDF, SVG, EPS vector graphic or PNG pixel graphic
        with a min. of 1000px width and transparent background if possible.
      </Text>

      <Flex gap={20} align="center" mt="lg">
        <FormField
          name="uploadLogo"
          control={control}
          render={({ field }) => (
            <FileButton onChange={field.onChange} accept=".png,.svg,.pdf,.eps">
              {(props) => (
                <ActionIcon
                  size="lg"
                  color="inputBgColor"
                  variant="filled"
                  {...props}
                />
              )}
            </FileButton>
          )}
        />
        <Text>Upload</Text>
      </Flex>

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
            h="4rem"
            w="100%"
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        )}
      </Box>
    </Section>
  );
}

export default function EditOpportunity() {
  const navigate = useNavigate();
  const { control, handleSubmit, watch, setValue } = useFormHandler({
    defaultValues: editDefaultValues,
    onSubmit: (data) => console.log("Form Submitted", data),
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
        {sections.map((s) => (
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
            />
          </Section>
        ))}

        <Section title="Set Date & Title">
          <OpportunityFormFields control={control} type="dateTitle" />
        </Section>

        <Section title="Set your price">
          <OpportunityFormFields
            control={control}
            type="price"
            setValue={setValue}
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
            }}
          />
          <Flex gap={20} align="center" mt="lg">
            <ActionIcon size="lg" color="inputBgColor" variant="filled">
              <Text size="xs">
                <IconMessage size={16}/>
              </Text>
            </ActionIcon>
            <Text>Get in touch with creator</Text>
          </Flex>
        </Section>

        <UploadLogoField control={control} uploadedLogo={uploadedLogo} />

        <Section title="Terms of use" background="rgba(105, 179, 231, 0.2)">
          <OpportunityFormFields control={control} type="terms" />
        </Section>
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
