import { Box, FileButton, Flex, Grid, Image, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import StatBox from "../../../shared/components/StatBox";
import FormField from "../../../shared/components/FormField";
import IconButton from "../../../shared/components/IconButton";
import { IconUpload } from "@tabler/icons-react";


const UploadLogoField = ({ control, offering }) => {

    const uploadedLogo = useWatch({ control, name: "uploadLogo" });
    const [objectUrl, setObjectUrl] = useState(null);

    useEffect(() => {
        if (uploadedLogo instanceof File) {
            const url = URL.createObjectURL(uploadedLogo);
            setObjectUrl(url);
            return () => URL.revokeObjectURL(url);
        }

        setObjectUrl(null);
    }, [uploadedLogo]);

    const logoSrc = objectUrl
        ? objectUrl
        : offering?.logo?.path
            ? offering.logo.path.startsWith("http")
                ? offering.logo.path
                : `${import.meta.env.VITE_ASSET_URL}/${offering.logo.path}`
            : "https://placehold.co/600x400?text=Placeholder";

    return (
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <StatBox title="Upload your logo">
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
                            src={logoSrc}
                            w="100%"
                            h="4rem"
                            fit="cover"
                            radius="md"
                            alt="Logo preview"
                        />
                    </Box>
                </Box>
            </StatBox>
        </Grid.Col>
    )
}

export default UploadLogoField;