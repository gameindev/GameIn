import { useMemo, useState } from "react";
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
import { usePagination } from "../../../shared/utils/pagination";
import PaginationBar from "../../../shared/components/PaginationBar";
import styled from "styled-components";

const SponsorshipsOffers = () => {
    const [openedRow, setOpenedRow] = useState(null);
    const { userProfile, isSelf } = useOutletContext();
    const user = useAppSelector(currentUser);
    const {
        sponsorships,
        handleAcceptOffering,
        handleNegotiateOffering,
        handleResetOffering,
    } = useSponsorships({
        userId: userProfile?.id,
        profileUserType: userProfile?.user_type,
    });

    const navigate = useNavigate();

    const negotiateOffering = (sponsorship) => {
        const offering = sponsorships.find((s) => s.id === sponsorship);
        if (offering) {
            routeService.messageRoute(offering.user.id, navigate, user);
        }
    };

    const toggleRow = (index) =>
        setOpenedRow((prev) => (prev === index ? null : index));

    const filteredSponsorships = useMemo(
        () =>
            sponsorships?.filter((s) => {
                const hiddenStatuses = [OfferingStatus.DISMISSED];
                const isHiddenStatus = hiddenStatuses.includes(s?.status);
                const shouldShow = !isHiddenStatus;

                return shouldShow;
            }),
        [sponsorships],
    );

    const {
        page,
        setPage,
        totalRecords,
        totalPages,
        pageRangeText,
        pagedRecords,
        recordsPerPage,
    } = usePagination({
        records: filteredSponsorships || [],
        recordsPerPage: 7,
    });

    return (
        <OffersResponsiveShell>
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
                pagedRecords?.map((sponsorship, index) => (
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
            {totalRecords > recordsPerPage && (
                <PaginationBar
                    page={page}
                    totalPages={totalPages}
                    totalRecords={totalRecords}
                    pageRangeText={pageRangeText}
                    onPageChange={(nextPage) => {
                        setOpenedRow(null);
                        setPage(nextPage);
                    }}
                />
            )}
        </OffersResponsiveShell>
    );
};

const OffersResponsiveShell = styled(Box)`
    min-width: 0;

    @media (max-width: 768px) {
        .sponsorship-table-head {
            display: none;
        }
    }
`;

export default SponsorshipsOffers;
