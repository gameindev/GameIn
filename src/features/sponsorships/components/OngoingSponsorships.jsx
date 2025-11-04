import { useState } from "react";
import { useOutletContext } from "react-router";
import { OfferingStatus } from "../../../shared/enums/offeringStatusEnum";
import useSponsorships from "../hooks/useSponsorships";
import { Box, Flex, Paper, Text } from "@mantine/core";
import OngoingSponsorshipHeader from "./OngoingSponsorshipHeader";
import { theme } from "../../../shared/styles/theme/customTheme";
import OngoingSponsorshipRow from "./OngoingSponsorshipRow";



const OngoingSponsorships = () => {
    const [openedRow, setOpenedRow] = useState(null);
    const { userProfile, isSelf } = useOutletContext();
    const { sponsorships } = useSponsorships({ userId: userProfile?.id });
    // console.log(sponsorships);
    const toggleRow = (index) =>
        setOpenedRow((prev) => (prev === index ? null : index));

    const filteredSponsorships = sponsorships?.filter(
        (s) => s?.status === OfferingStatus.SPONSORED
    );

    return (
        <Box>
            <OngoingSponsorshipHeader />
            {filteredSponsorships?.length === 0 ? (
                <Flex
                    align="center"
                    justify="center"
                    direction="column"
                    p="1rem"
                    bg={theme.colors.accordionBg[0]}
                    style={{
                        borderRadius: theme.radius.md,
                        border: `1px dashed ${theme.colors.secondaryGrey[0]}`,
                    }}
                >
                    <Text fz="sm" fw={500}>
                        No Ongoing sponsorship offers yet
                    </Text>
                    <Text fz="xs">When a both accept an offer, it will appear here.</Text>
                </Flex>
            ) : (
                filteredSponsorships?.map((sponsorship, index) => (
                    <Paper
                        key={sponsorship.id}
                        radius="md"
                        mb="8px"
                        bg={theme.colors.accordionBg[0]}
                    >
                        <OngoingSponsorshipRow
                            sponsorship={sponsorship}
                            index={index}
                            openedRow={openedRow}
                            toggleRow={toggleRow}
                        />
                    </Paper>
                ))
            )}
        </Box>
    )
}

export default OngoingSponsorships;