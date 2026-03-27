import { useState } from "react";
import { useOutletContext } from "react-router";
import { OfferingStatus } from "../../../shared/enums/offeringStatusEnum";
import useSponsorships from "../hooks/useSponsorships";
import { Box, Flex, Paper, Text } from "@mantine/core";
import OngoingSponsorshipHeader from "./OngoingSponsorshipHeader";
import { theme } from "../../../shared/styles/theme/customTheme";
import OngoingSponsorshipRow from "./OngoingSponsorshipRow";
import { usePagination } from "../../../shared/utils/pagination";

const OngoingSponsorships = () => {
  const [openedRow, setOpenedRow] = useState(null);
  const { userProfile, isSelf } = useOutletContext();
  const { sponsorships } = useSponsorships({
    userId: userProfile?.id,
    profileUserType: userProfile?.user_type,
  });
  // console.log(sponsorships);
  const toggleRow = (index) =>
    setOpenedRow((prev) => (prev === index ? null : index));

  const filteredSponsorships = sponsorships?.filter((s) => {
    if (s?.status !== OfferingStatus.SPONSORED) return false;

    const startDate = new Date(s?.start_date);
    const endDate = new Date(s?.end_date);
    const today = new Date();

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return startDate <= today && endDate >= today;
  });

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
    recordsPerPage: 10,
  });

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
    </Box>
  );
};

export default OngoingSponsorships;
