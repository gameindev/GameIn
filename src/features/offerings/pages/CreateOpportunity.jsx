import { Box, Button, Flex, Grid, Group, Text } from "@mantine/core";
import OfferingSection from "../components/OfferingSection";
import FormField from "../../../shared/components/FormField";
import { SwitchButton } from "../../../shared/components/Switch";
import { useNavigate } from "react-router";
import useApi from "../../../shared/hooks/useApi";
import { useOfferingFormHandler } from "../hooks/useOfferingFormHandler";
import { useCreateOffering } from "../hooks/useCreateOffering";
import { defaultValues } from "../types/defaultData.mapper";
import { offeringSectionMapper } from "../types/offeringSection.mapper";
import React from "react";
import OpportunitySection from "../components/OpportunitySection";
import OpportunityFormFields from "../components/OpportunityFormFields";
import { theme } from "../../../shared/styles/theme/customTheme";


export default function CreateOpportunity() {
    const navigate = useNavigate();
    const { loading } = useApi();

    // Create the submit handler
    const submitHandler = useCreateOffering();

    const { control, handleSubmit, reset, setValue } = useOfferingFormHandler({
        defaultValues,
        onSubmit: async (data) => {
            await submitHandler(data, reset);
        },
    });



    return (
        <Box component="form" onSubmit={handleSubmit}>

            <Group  justify="center " mb={20}>
                <Text fz={35} ta="center">
                    setup your
                    <br aria-hidden="true" />
                    <Text component="span" c={theme.colors.primary[0]} fw={700}>
                        {" "}
                        sponsorship opportunity
                    </Text>
                </Text>
            </Group>

            {offeringSectionMapper.map(({ number, title, description, type, image }) => (
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
                    <OfferingSection title="Set Date & Title">
                        <OpportunityFormFields
                            control={control}
                            type="dateTitle"
                            setValue={setValue}
                        />
                    </OfferingSection>

                    <OfferingSection title="Set your price">
                        <OpportunityFormFields
                            control={control}
                            type="price"
                            setValue={setValue}
                        />
                    </OfferingSection>

                    <OfferingSection className="terms_condition"  title="Terms of use" background="rgba(105, 179, 231, 0.2)">
                        <OpportunityFormFields control={control} type="terms" />
                    </OfferingSection>
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
    )
}