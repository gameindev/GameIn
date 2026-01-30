import { Box, Flex, Group, Image, Paper, Text } from "@mantine/core";
import HexContainer from "./HexContainer";
import {
  Separator,
  EmptySeparator,
} from "../../features/sponsorships/utils/separators";
import { theme } from "../styles/theme/customTheme";
import { getTimeRemaining } from "../../features/sponsorships/utils/date.helper";
import useSponsorships from "../../features/sponsorships/hooks/useSponsorships";
import { OfferingStatus } from "../enums/offeringStatusEnum";
import IconButton from "./IconButton";
import { useNavigate, useOutletContext } from "react-router";
import routePaths from "../../app/router/routes";
import { IconFile } from "@tabler/icons-react";

export default function SponsorshipCompactList({
  items,
  emptyText = "No ongoing sponsorships",
  limit = 4,
}) {
  const navigate = useNavigate();
  const { isSelf, userProfile } = useOutletContext();
  const { sponsorships, loading } = useSponsorships({
    userId: userProfile?.id,
    profileUserType: userProfile?.user_type,
  });
  
  const derived =
    items && items.length
      ? items
      : (sponsorships || [])
          .filter((s) => {
            if (s?.status !== OfferingStatus.SPONSORED) return false;
            const startDate = new Date(s?.start_date);
            const today = new Date();
            startDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            return startDate <= today;
          })
          .map((s) => ({
            id: s.id,
            sponsorName: s?.last_adjusted_by?.username || "Unknown",
            sponsorLogo: s?.last_adjusted_by?.logo,
            type: s?.title,
            endDate: s?.end_date,
          }));

  const visible = (derived || []).slice(0, limit);
  const resolvedEmptyText = emptyText;
  
  return (
    <Box>
      {/* Header */}
      <Flex
        p="sm"
        tt="uppercase"
        fz={theme.fontSizes.xs}
        fw={500}
        align="center"
        gap="sm"
      >
        <Box flex={0.5}>Sponsor</Box>
        <EmptySeparator />
        <Box flex={1} ta="center">
          Type
        </Box>
        <EmptySeparator />
        <Box flex={1} ta="center">
          Payment in
        </Box>
        <EmptySeparator />
        <Box flex={1} ta="center">
          Interact
        </Box>
      </Flex>

      {loading && (
        <Paper
          radius="md"
          p="md"
          bg={theme.colors.accordionBg[0]}
          style={{ border: `1px dashed ${theme.colors.secondaryGrey[0]}` }}
        >
          <Text fz="sm" fw={500}>
            Loading...
          </Text>
        </Paper>
      )}

      {!loading && visible.length === 0 && (
        <Paper
          radius="md"
          p="md"
          bg={theme.colors.accordionBg[0]}
          style={{ border: `1px dashed ${theme.colors.secondaryGrey[0]}` }}
        >
          <Text fz="sm" fw={500}>
            {resolvedEmptyText}
          </Text>
        </Paper>
      )}

      {!loading &&
        visible.map((item) => (
          <Paper
            key={item.id}
            radius="md"
            mb="8px"
            bg={theme.colors.accordionBg[0]}
            p="0.5em"
            pl="1.25em"
          >
            <Flex align="center" gap="sm" wrap="nowrap">
              {/* Sponsor */}
              <Box flex={0.5}>
                <Group>
                  <HexContainer size={40}>
                    <Image
                      src={
                        item.sponsorLogo ||
                        `https://placehold.co/40x40/50565a/FFFFFF?text=${(
                          item.sponsorName || "?"
                        ).charAt(0)}`
                      }
                      width={40}
                      height={40}
                      alt={item.sponsorName}
                    />
                  </HexContainer>
                  {/* <Text fz={theme.fontSizes.sm}>{item.sponsorName}</Text> */}
                </Group>
              </Box>
              <Separator />

              {/* Type */}
              <Box flex={1} ta="center">
                <Text fz={theme.fontSizes.sm}>{item.type}</Text>
              </Box>
              <Separator />

              {/* Payment in */}
              <Box flex={1} ta="center">
                <Text
                  fz={theme.fontSizes.sm}
                  fw={700}
                  c={
                    getTimeRemaining(item.endDate) === "Expired"
                      ? theme.colors.hoverRed[0]
                      : theme.colors.primary[0]
                  }
                >
                  {getTimeRemaining(item.endDate)}
                </Text>
              </Box>
              <Separator />

              {/* Interact */}
              <Box flex={1} ta="center">
                <IconButton
                  size="md"
                  iconSize={16}
                  Icon={IconFile}
                  onClick={() =>
                    isSelf
                      ? navigate(
                          routePaths.ACCOUNTS.OFFERINGS.FPP_EDIT_OFFERING.replace(
                            ":offeringId",
                            item.id
                          )
                        )
                      : navigate(
                          routePaths.ACCOUNTS.OFFERINGS.TPP_EDIT_OFFERING.replace(
                            ":username",
                            userProfile?.username
                          ).replace(":offeringId", item.id)
                        )
                  }
                />
              </Box>
            </Flex>
          </Paper>
        ))}
    </Box>
  );
}
