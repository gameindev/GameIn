import { Box, Collapse, Flex, Group, Image, Paper, Text } from "@mantine/core";
import { theme } from "../../../shared/styles/theme/customTheme";
import HexContainer from "../../../shared/components/HexContainer";
import { Separator } from "../utils/separators";
import { IconCheck, IconSettings } from "@tabler/icons-react";
import { formatDate, getTimeRemaining } from "../utils/date.helper";
import SponsorshipDetails from "./SponsorshipDetails";
import StepCalculator from "./StepCalculator";
import { statusStep } from "../utils/step.helper";
import SponsorshipActions from "./SponsorshipActions";
import { OfferingStatus } from "../../../shared/enums/offeringStatusEnum";

const SponsorshipRow = ({
  sponsorship,
  index,
  openedRow,
  toggleRow,
  user,
  handleAcceptOffering,
  handleNegotiateOffering,
  handleResetOffering,
}) => {
  console.log(sponsorship);
  const step = statusStep[sponsorship.status];

  return (
    <Paper
      key={sponsorship.id}
      radius="md"
      mb="sm"
      bg={theme.colors.accordionBg[0]}
    >
      <Box>
        <Flex
          p="0.5em"
          pl="1.25em"
          align="center"
          gap="sm"
          style={{ cursor: "pointer" }}
        >
          {/* Sponsor */}
          <Box flex={1}>
            <Group>
              <HexContainer size={40}>
                <Image
                  src={
                    sponsorship?.last_adjusted_by?.logo ||
                    `https://placehold.co/40x40/50565a/FFFFFF?text=${
                      sponsorship?.last_adjusted_by?.username?.charAt(0) ?? "?"
                    }`
                  }
                  alt={sponsorship?.last_adjusted_by?.username}
                  width={40}
                  height={40}
                />
              </HexContainer>
              <Text fz={theme.fontSizes.sm}>
                {sponsorship?.last_adjusted_by?.username || "Unknown User"}
              </Text>
            </Group>
          </Box>

          <Separator />

          <Box flex={0.75}>
            <Text fz={theme.fontSizes.sm}>{sponsorship.title}</Text>
          </Box>

          <Separator />

          <Flex flex={2} gap="sm" align="center">
            <StepCalculator currentStep={step} />
            {sponsorship.last_adjusted_by &&
            sponsorship.status !== OfferingStatus.DRAFT &&
            sponsorship.status !== OfferingStatus.ACCEPTED &&
            sponsorship.status !== OfferingStatus.COMPLETED ? (
              <IconSettings
                stroke={1.5}
                size={14}
                color={theme.colors.yellow[0]}
              />
            ) : (
              <IconCheck
                stroke={2}
                size={14}
                color={
                  sponsorship.status !== OfferingStatus.DRAFT
                    ? theme.colors.primary[0]
                    : "transparent"
                }
              />
            )}
          </Flex>

          <Separator />

          <Box flex={0.75} ta="center">
            <Text
              fz={theme.fontSizes.sm}
              fw={700}
              c={
                getTimeRemaining(sponsorship.end_date) === "Expired"
                  ? theme.colors.hoverRed[0]
                  : theme.colors.primary[0]
              }
            >
              {getTimeRemaining(sponsorship.end_date)}
            </Text>
          </Box>

          <Separator />

          <Box flex={0.75} ta="center">
            <Text fz={theme.fontSizes.sm} fw={700} c={theme.colors.primary[0]}>
              {formatDate(sponsorship.start_date)}
            </Text>
          </Box>

          <Separator />

          <Box flex={2}>
            <SponsorshipActions
              sponsorship={sponsorship}
              openedRow={openedRow}
              index={index}
              toggleRow={toggleRow}
              theme={theme}
              onAccept={handleAcceptOffering}
              onNegotiate={handleNegotiateOffering}
              onReject={handleResetOffering}
            />
          </Box>
        </Flex>

        <Collapse in={openedRow === index}>
          <SponsorshipDetails
            sponsorship={sponsorship}
            user={user}
            theme={theme}
            onAccept={handleAcceptOffering}
            onNegotiate={handleNegotiateOffering}
            onReject={handleResetOffering}
          />
        </Collapse>
      </Box>
    </Paper>
  );
};

export default SponsorshipRow;
