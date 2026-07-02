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
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import styled from "styled-components";

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

    const step = statusStep[sponsorship.status];

    const creator = useAppSelector(currentUser);


    return (
        <OfferRowCard
            key={sponsorship.id}
            radius="md"
            mb="sm"
            bg={theme.colors.accordionBg[0]}
        >
            <Box>
                <Flex
                    className="offer-row"
                    p="0.5em"
                    pl="1.25em"
                    align="center"
                    gap="sm"
                    style={{ cursor: "pointer" }}
                >
                    {/* Sponsor */}
                    <Box className="offer-sponsor" flex={1}>
                        <Text className="mobile-field-label">Sponsor</Text>
                        <Group>
                            <HexContainer size={40}>
                                <Image
                                    src={
                                        sponsorship?.last_adjusted_by?.logo ||
                                        `https://placehold.co/40x40/50565a/FFFFFF?text=${sponsorship?.last_adjusted_by?.username?.charAt(0) || creator?.username?.charAt(0) || "?"
                                        }`
                                    }
                                    alt={sponsorship?.last_adjusted_by?.username}
                                    width={40}
                                    height={40}
                                />
                            </HexContainer>
                            <Text fz={theme.fontSizes.sm}>
                                {sponsorship?.last_adjusted_by?.username || creator?.username || "Unknown User"}
                            </Text>
                        </Group>
                    </Box>

                    <Separator />

                    <Box className="offer-type" flex={0.75}>
                        <Text className="mobile-field-label">Type</Text>
                        <Text fz={theme.fontSizes.sm}>{sponsorship.title}</Text>
                    </Box>

                    <Separator />

                    <Flex className="offer-stage" flex={2} gap="sm" align="center">
                        <Text className="mobile-field-label">Stage</Text>
                        <StepCalculator currentStep={step} />
                        {sponsorship.last_adjusted_by &&
                            sponsorship.status !== OfferingStatus.DRAFT &&
                            sponsorship.status !== OfferingStatus.ACCEPTED &&
                            sponsorship.status !== OfferingStatus.COMPLETED &&
                            sponsorship.status !== OfferingStatus.SPONSORED ? (
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

                    <Box className="offer-expiring" flex={0.75} ta="center">
                        <Text className="mobile-field-label">Expiring</Text>
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

                    <Box className="offer-starting" flex={0.75} ta="center">
                        <Text className="mobile-field-label">Starting</Text>
                        <Text fz={theme.fontSizes.sm} fw={700} c={theme.colors.primary[0]}>
                            {formatDate(sponsorship.start_date)}
                        </Text>
                    </Box>

                    <Separator />

                    <Box className="offer-actions" flex={2}>
                        <Text className="mobile-field-label">Actions</Text>
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
        </OfferRowCard>
    );
};

const OfferRowCard = styled(Paper)`
    min-width: 0;

    .mobile-field-label {
        display: none;
    }

    @media (max-width: 768px) {
        border: 1px solid rgba(255,255,255,0.06);
        overflow: hidden;

        .offer-row {
            display: grid !important;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            grid-template-areas:
                "sponsor type"
                "stage stage"
                "expiring starting"
                "actions actions";
            gap: 0.85em !important;
            padding: 1em !important;
        }

        .sponsorship-separator {
            display: none;
        }

        .mobile-field-label {
            display: block;
            margin-bottom: 0.25rem;
            color: ${theme.colors.text[0]};
            font-size: 0.66rem;
            font-weight: 700;
            letter-spacing: 0;
            text-transform: uppercase;
            opacity: 0.74;
        }

        .offer-sponsor {
            grid-area: sponsor;
            min-width: 0;
        }

        .offer-sponsor .mantine-Group-root {
            gap: 0.55em;
            flex-wrap: nowrap;
        }

        .offer-sponsor .mantine-Text-root {
            max-width: 7.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .offer-type {
            grid-area: type;
            min-width: 0;
            text-align: left !important;
        }

        .offer-type .mantine-Text-root:not(.mobile-field-label) {
            overflow-wrap: anywhere;
        }

        .offer-stage {
            grid-area: stage;
            min-width: 0;
            align-items: flex-start !important;
            flex-direction: column;
            gap: 0.45em !important;
            padding: 0.75em 0.85em;
            border-radius: ${theme.radius.md};
            background: rgba(0,0,0,0.16);
        }

        .offer-stage svg {
            max-width: 100%;
        }

        .offer-expiring {
            grid-area: expiring;
            text-align: left !important;
        }

        .offer-starting {
            grid-area: starting;
            text-align: left !important;
        }

        .offer-actions {
            grid-area: actions;
            min-width: 0;
            padding-top: 0.25em;
            border-top: 1px solid rgba(255,255,255,0.06);
        }

        .offer-actions > .mobile-field-label {
            text-align: left;
        }

        .offer-actions > .mantine-Group-root {
            justify-content: space-between !important;
            gap: 0.5em;
        }

        .offer-actions .mantine-ActionIcon-root {
            width: 2rem;
            height: 2rem;
            min-width: 2rem;
        }

        .offer-actions .mantine-ActionIcon-root svg {
            width: 0.9rem;
            height: 0.9rem;
        }

        .offer-details {
            padding: 0 1em 1em !important;
        }

        .offer-details-layout {
            flex-direction: column !important;
            gap: 1em !important;
            padding: 1em;
            border-radius: ${theme.radius.md};
            background: rgba(0,0,0,0.12);
        }

        .offer-details-summary,
        .offer-details-list,
        .offer-status-box {
            width: 100%;
            flex: 1 1 auto !important;
            min-width: 0;
        }

        .offer-details-price {
            font-size: 1.85rem !important;
        }

        .offer-status-box {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr);
            gap: 0.75em;
            align-items: start;
            padding-top: 0.25em;
        }

        .offer-status-box > .mantine-Flex-root:first-child {
            width: 5.75rem !important;
            height: 5.75rem !important;
            margin-bottom: 0 !important;
        }

        .offer-status-box > .mantine-Text-root {
            margin-top: 0 !important;
            line-height: 1.35;
        }

        .offer-status-box > .mantine-Flex-root:last-child {
            grid-column: 1 / -1;
            flex-direction: row !important;
            flex-wrap: wrap;
            gap: 0.6em !important;
        }

        .offer-status-box > .mantine-Flex-root:last-child .mantine-Group-root {
            gap: 0.4em;
        }
    }
`;

export default SponsorshipRow;
