import {
  ActionIcon,
  Box,
  Collapse,
  Flex,
  Group,
  Image,
  Text,
} from "@mantine/core";
import HexContainer from "../../../shared/components/HexContainer";
import { Separator } from "../utils/separators";
import IconButton from "../../../shared/components/IconButton";
import {
  IconChevronDown,
  IconChevronUp,
  IconDeviceFloppy,
  IconFile,
  IconMessage,
  IconX,
} from "@tabler/icons-react";
import { theme } from "../../../shared/styles/theme/customTheme";
import { formatStyledPrice } from "../utils/formatPrice";
import { getTimeRemaining } from "../utils/date.helper";
import { useNavigate, useOutletContext } from "react-router";
import routePaths from "../../../app/router/routes";

const OngoingSponsorshipRow = ({
  sponsorship,
  index,
  openedRow,
  toggleRow,
}) => {
  const navigate = useNavigate();
  const { userProfile, isSelf } = useOutletContext();
  return (
    <Box>
      <Flex
        p="0.5em"
        pl="1.25em"
        align="center"
        gap="sm"
        wrap="nowrap"
        style={{ cursor: "pointer" }}
      >
        {/* Sponsor */}
        <Box flex={1}>
          <Group>
            <HexContainer size={40}>
              <Image
                src={
                  sponsorship?.last_adjusted_by?.logo ||
                  `https://placehold.co/40x40/50565a/FFFFFF?text=${sponsorship?.last_adjusted_by?.username?.charAt(
                    0
                  )}`
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

        {/* Type */}
        <Box flex={1} ta="center">
          <Text fz={theme.fontSizes.sm}>{sponsorship?.title}</Text>
        </Box>
        <Separator />

        {/* Info */}
        <Box flex={2.35}>
          <Text fz={theme.fontSizes.sm}>
            {sponsorship?.description ||
              "Sponsorship contract description, etc"}
          </Text>
        </Box>
        <Separator />

        {/* Price */}
        <Box flex={0.75} ta="right">
          {formatStyledPrice(sponsorship?.offering_price?.price)}
        </Box>
        <Separator />

        {/* Time */}
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

        {/* Actions */}
        <Box flex={1.65}>
          <Group gap="0.3em">
            <IconButton
              iconSize={18}
              Icon={IconFile}
              onClick={() =>
                isSelf
                  ? navigate(
                      routePaths.ACCOUNTS.OFFERINGS.FPP_EDIT_OFFERING.replace(
                        ":offeringId",
                        sponsorship.id
                      )
                    )
                  : navigate(
                      routePaths.ACCOUNTS.OFFERINGS.TPP_EDIT_OFFERING.replace(
                        ":username",
                        userProfile?.username
                      ).replace(":offeringId", sponsorship.id)
                    )
              }
            />
            <IconButton iconSize={18} Icon={IconDeviceFloppy} />
            <IconButton
              iconSize={18}
              Icon={IconMessage}
              hoverClass="hoverGrey"
            />
            <IconButton iconSize={18} Icon={IconX} hoverClass="hoverRed" />
            <ActionIcon
              variant="subtle"
              onClick={() => toggleRow(index)}
              aria-label="Toggle row"
            >
              {openedRow === index ? (
                <IconChevronUp size={20} stroke={1.5} />
              ) : (
                <IconChevronDown size={20} stroke={1.5} />
              )}
            </ActionIcon>
          </Group>
        </Box>
      </Flex>

      <Collapse in={openedRow === index}>
        <Box p="sm">
          <Text size="sm" c="dimmed">
            {sponsorship.details}
          </Text>
        </Box>
      </Collapse>
    </Box>
  );
};

export default OngoingSponsorshipRow;
