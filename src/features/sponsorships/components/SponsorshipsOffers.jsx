import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import useSponsorships from "../hooks/useSponsorships";
import { OfferingStatus } from "../../../shared/enums/offeringStatusEnum";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import SponsorshipHeader from "./SponsorshipHeader";
import { Box, Flex, Text } from "@mantine/core";
import SponsorshipRow from "./SponsorshipRow";
import { theme } from "../../../shared/styles/theme/customTheme";
import routeService from "../../../app/services/route/routeService";


const SponsorshipsOffers = () => {
    const [openedRow, setOpenedRow] = useState(null);
    const { userProfile, isSelf } = useOutletContext();
    const user = useAppSelector(currentUser);
    const { sponsorships, handleAcceptOffering, handleNegotiateOffering, handleResetOffering } =
        useSponsorships({ userId: userProfile?.id });
    
    
    
    const navigate = useNavigate();
    
   
    const negotiateOffering = (sponsorship) => { 
       
        const offering = sponsorships.find(s => s.id === sponsorship);
        if (offering) {
            // console.log(offering);
            routeService.messageRoute(
                offering.user.id,
                navigate,
                user,
            )
        }
    }
    

    const toggleRow = (index) =>
        setOpenedRow((prev) => (prev === index ? null : index));
    
    const filteredSponsorships = sponsorships?.filter((s) => {
        const hiddenStatuses = [
            OfferingStatus.DISMISSED,
        ];
        const isHiddenStatus = hiddenStatuses.includes(s?.status);
        // const isSelfAdjusted = s?.last_adjusted_by?.id === user?.id;        
        // console.log(isHiddenStatus);
        const shouldShow = !isHiddenStatus;
         
        return shouldShow;
    });

    return (
        <Box>
            <SponsorshipHeader />
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
                        No sponsorship offers yet
                    </Text>
                    <Text fz="xs">
                        When a sponsor sends an offer, it will appear here.
                    </Text>
                </Flex>
            ) : (
                filteredSponsorships?.map((sponsorship, index) => (
                    <SponsorshipRow
                        key={sponsorship.id}
                        sponsorship={sponsorship}
                        index={index}
                        openedRow={openedRow}
                        toggleRow={toggleRow}
                        user={user}
                        handleAcceptOffering={handleAcceptOffering}
                        handleNegotiateOffering={negotiateOffering}
                        handleResetOffering={handleResetOffering}
                    />
                ))
            )}
        </Box>
    )
}

export default SponsorshipsOffers;