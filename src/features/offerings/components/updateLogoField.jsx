import React, { useMemo, useEffect } from "react";
import { Box, Flex, Text, Image, FileButton, Grid } from "@mantine/core";
import FormField from "../../../components/shared/ui/FormField";
import IconButton from "../../../components/shared/ui/IconButton";
import { IconUpload } from "@tabler/icons-react";
import StatBox from "../../../components/shared/ui/StatBox";

export default function UploadLogoField({ control, uploadedLogo }) {
  const logoPreview = useMemo(() => {
    if (uploadedLogo instanceof File) return URL.createObjectURL(uploadedLogo);
    return null;
  }, [uploadedLogo]);

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  return (
    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
      <StatBox title={"Upload your logo"}>
        <Box p="2.5rem">
          <Text mb="sm">
            Submit your Logo as PDF, SVG, EPS vector graphic or PNG pixel
            graphic with a min. of 1000px width and transparent background if
            possible.
          </Text>

          <Flex gap={20} align="center" mt="lg">
            <FormField
              name="uploadLogo"
              control={control}
              render={({ field }) => (
                <FileButton
                  onChange={field.onChange}
                  accept=".png,.svg,.pdf,.eps"
                >
                  {(props) => <IconButton Icon={IconUpload} {...props} />}
                </FileButton>
              )}
            />
            <Text>Upload</Text>
          </Flex>

          <Box mt="lg">
            <Text my="sm">Preview</Text>
            <Image
              src={
                logoPreview || "https://placehold.co/600x400?text=Placeholder"
              }
              w="100%"
              h="4rem"
              fit="cover"
              radius="md"
            />
          </Box>
        </Box>
      </StatBox>
    </Grid.Col>
  );
}
