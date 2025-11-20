import { Box, Grid, Stack, Text } from "@mantine/core";
import { OpportunityBlock } from "../styles/opportunity-styles";
import FormField from "../../../shared/components/FormField";
import { SwitchButton } from "../../../shared/components/Switch";
import { theme } from "../../../shared/styles/theme/customTheme";
import StatBox from "../../../shared/components/StatBox";




const OpportunitySection = ({
    number,
    title,
    description,
    statTitle,
    formContent,
    mediaPreview,
    control,
    type,
}) => {
    return (
        <OpportunityBlock>
            <Stack py={"3.75rem"}>
                <Box className="opportunityHeader">
                    <div className="opportunityTitle">
                        <Text fz={"3.438rem"} c={theme.colors.primary[0]} component="span">
                            {number}
                        </Text>
                        <Text fz={"1.25rem"} c={theme.colors.white[0]}>
                            {title}
                        </Text>
                    </div>
                    <div className="opportunitySelector">
                        <Text fz={theme.fontSizes.sm} mb={"0.625rem"}>
                            {description}
                        </Text>
                        <FormField
                            name={`${type}.enabled`}
                            control={control}
                            Component={SwitchButton}
                            componentProps={{
                                label: "",
                            }}
                        />
                    </div>
                </Box>

                <Grid gutter={20}>
                    <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                        <StatBox
                            title={" "}
                            background="transparent linear-gradient(45deg,  rgba(157, 127, 239, 0.2) 0%, rgba(105, 179, 231, 0.2) 50%, rgba(92, 229, 176, 0.2) 100%) 0% 0% no-repeat padding-box"
                        >
                            {formContent ? (
                                <Box p={"2.5rem"}>{formContent}</Box>
                            ) : (
                                <Text fz={theme.fontSizes.sm}>
                                    Content for {title} goes here.
                                </Text>
                            )}
                        </StatBox>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
                        <StatBox title={" "} background={`url(${mediaPreview})`}></StatBox>
                    </Grid.Col>
                </Grid>
            </Stack>
        </OpportunityBlock>
    );
};

export default OpportunitySection;