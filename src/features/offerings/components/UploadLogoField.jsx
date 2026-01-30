import { Box, FileButton, Flex, Grid, Image, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { set, useWatch } from "react-hook-form";
import StatBox from "../../../shared/components/StatBox";
import FormField from "../../../shared/components/FormField";
import IconButton from "../../../shared/components/IconButton";
import { IconDownload, IconUpload } from "@tabler/icons-react";

const UploadLogoField = ({ control, offering, isAccepted, isCreator }) => {
    const uploadedLogo = useWatch({ control, name: "uploadLogo" });
    const [objectUrl, setObjectUrl] = useState(null);
    const [fileName, setFileName] = useState(null);

    useEffect(() => {
        if (uploadedLogo instanceof File) {
            const isImage = uploadedLogo.type.startsWith("image/");
            if (isImage) {
                const url = URL.createObjectURL(uploadedLogo);
                setObjectUrl(url);
                setFileName(null);
                return () => URL.revokeObjectURL(url);
            } else {
                setObjectUrl(null);
                setFileName(uploadedLogo?.name);
            }
        } else {
            setObjectUrl(null);
            setFileName(uploadedLogo?.name);
        }
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
                                    title="Upload Logo"
                                    disabled={isCreator || isAccepted}
                                    onChange={field.onChange}
                                    accept=".png,.svg,.pdf,.eps"
                                >
                                    {(props) => <IconButton Icon={IconUpload} {...props} />}
                                </FileButton>
                            )}
                        />
                        {/* <Text>Upload</Text> */}
                        {offering?.logo?.path && isCreator && (
                            <a
                                href={
                                    offering.logo.path.startsWith("http")
                                        ? offering.logo.path
                                        : `${import.meta.env.VITE_ASSET_URL}/${offering.logo.path}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                style={{ 
                                    marginLeft: 16, 
                                    textDecoration: "none", 
                                    display: "inline-flex",
                                    alignItems: "center",
                                    cursor: "pointer"
                                }}
                                title="Download Logo"
                            >
                                <IconButton
                                    Icon={IconDownload}
                                    aria-label="Download Logo"
                                >
                                    <Text
                                        variant="link"
                                        color="blue"
                                        style={{ cursor: "pointer", marginLeft: 4 }}
                                    >
                                        Download
                                    </Text>
                                </IconButton>
                            </a>
                        )}
                    </Flex>

                    <Box mt="lg">
                        <Text my="sm">Preview</Text>
                        {objectUrl ? (
                            <Image
                                src={logoSrc}
                                w="100%"
                                h="4rem"
                                fit="cover"
                                radius="md"
                                alt="Logo preview"
                            />
                        ) : fileName ? (
                            <Text size="sm" fw={500}>
                                {fileName}
                            </Text>
                        ) : logoSrc ? (
                            <Image
                                src={logoSrc}
                                w="100%"
                                h="4rem"
                                fit="cover"
                                radius="md"
                                alt="Logo preview"
                            />
                        ) : (
                            <Text size="sm" color="dimmed">
                                No file selected
                            </Text>
                        )}
                    </Box>
                </Box>
            </StatBox>
        </Grid.Col>
    );
};

export default UploadLogoField;
