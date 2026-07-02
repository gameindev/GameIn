import { Box, Flex, Group, Image, Paper, Text } from "@mantine/core";
import styled from "styled-components";
import HexContainer from "./HexContainer";
import {
  Separator,
  EmptySeparator,
} from "../../features/sponsorships/utils/separators";
import { theme } from "../styles/theme/customTheme";
import useSponsorships from "../../features/sponsorships/hooks/useSponsorships";
import { OfferingStatus } from "../enums/offeringStatusEnum";
import {
  statusStep,
  stepColors,
} from "../../features/sponsorships/utils/step.helper";
import { IconMessage, IconCheck, IconX, IconFile } from "@tabler/icons-react";
import { useNavigate, useOutletContext } from "react-router";
import routeService from "../../app/services/route/routeService";
import { useAppSelector } from "../../app/store/hooks";
import { currentUser } from "../../features/auth/store/selector";
import IconButton from "./IconButton";
import { USERTYPES } from "../enums/userTypesEnum";
import routePaths from "../../app/router/routes";
import { useMemo, useCallback } from "react";

export default function OffersCompactList({ limit = 4 }) {
  const navigate = useNavigate();
  const user = useAppSelector(currentUser);
  const { isSelf, userProfile } = useOutletContext();
  const { sponsorships, loading, handleAcceptOffering, handleResetOffering } =
    useSponsorships({
      userId: userProfile?.id,
      profileUserType: userProfile?.user_type,
    });

  const offers = useMemo(() => {
    return (sponsorships || []).filter(
      (s) => s?.status !== OfferingStatus.DISMISSED
    );
  }, [sponsorships]);

  const visible = useMemo(() => offers.slice(0, limit), [offers, limit]);

  const handleMessage = useCallback(
    async (s) => {
      const targetId = s?.user?.id || s?.last_adjusted_by?.id;
      if (!targetId) return;
      await routeService.messageRoute(targetId, navigate, user);
    },
    [navigate, user]
  );

  const renderLoadingOrEmpty = () => (
    <Paper
      radius="md"
      p="md"
      bg={theme.colors.accordionBg[0]}
      style={{ border: `1px dashed ${theme.colors.secondaryGrey[0]}` }}
    >
      <Text fz="sm" fw={500}>
        {loading ? "Loading..." : "No sponsorship offers yet"}
      </Text>
    </Paper>
  );

  return (
    <CompactListShell>
      {/* Header */}
      <Flex
        className="compact-list-head"
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
        <Box flex={0.5} ta="center">
          Stage
        </Box>
        <EmptySeparator />
        <Box
          // flex={user.user_type === USERTYPES.CREATOR ? 1.5 : 0.5}
          flex={0.5}
          ta="center"
        >
          Interact
        </Box>
      </Flex>

      {loading || visible.length === 0
        ? renderLoadingOrEmpty()
        : visible.map((s) => {
            const stage = statusStep[s?.status] ?? 0;
            const username = s?.last_adjusted_by?.username ?? "?";
            const placeholderImg = `https://placehold.co/40x40/50565a/FFFFFF?text=${username.charAt(
              0
            )}`;

            const isAccepted = s?.status === OfferingStatus.ACCEPTED;
            const isDraft = s?.status === OfferingStatus.DRAFT;

            return (
              <Paper
                className="compact-list-row"
                key={s.id}
                radius="md"
                mb="8px"
                bg={theme.colors.accordionBg[0]}
                p="0.5em"
                pl="1.25em"
              >
                <Flex className="compact-row-flex" align="center" gap="sm" wrap="nowrap">
                  {/* Sponsor */}
                  <Box className="compact-logo" flex={0.5}>
                    <Group>
                      <HexContainer size={40}>
                        <Image
                          src={placeholderImg}
                          width={40}
                          height={40}
                          fit="contain"
                          alt={username}
                        />
                      </HexContainer>
                    </Group>
                  </Box>

                  <Separator />

                  {/* Type */}
                  <Box className="compact-title" flex={1} ta="center">
                    <Text fz={theme.fontSizes.sm}>{s?.title}</Text>
                  </Box>

                  <Separator />

                  {/* Stage */}
                  <Flex className="compact-status" flex={0.5} justify="center">
                    <HexContainer
                      size={28}
                      background={stepColors[stage] || stepColors[0]}
                    >
                      <Text size="xs" fw={900} c="#3C4044">
                        {stage + 1}
                      </Text>
                    </HexContainer>
                  </Flex>

                  <Separator />

                  {/* Interact */}
                  {/* {user.user_type === USERTYPES.CREATOR ? (
                    <Box flex={1.5} ta="center">
                      <Flex align="center" justify="center" gap="xs">
                        <IconButton
                          size="md"
                          iconSize={16}
                          Icon={IconMessage}
                          hoverClass="hoverGrey"
                          onClick={() => handleMessage(s)}
                        />

                        <IconButton
                          size="md"
                          iconSize={16}
                          Icon={IconCheck}
                          hoverClass={
                            !(isAccepted || isDraft) ? "hoverGreen" : ""
                          }
                          onClick={() => handleAcceptOffering(s.id)}
                          disabled={isAccepted || isDraft}
                        />

                        <IconButton
                          size="md"
                          iconSize={16}
                          Icon={IconX}
                          hoverClass={
                            !(isAccepted || isDraft) ? "hoverRed" : ""
                          }
                          onClick={() => handleResetOffering(s.id)}
                          disabled={isAccepted || isDraft}
                        />
                      </Flex>
                    </Box>
                  ) : (
                    
                  )} */}

                  <Box className="compact-action" flex={0.5} ta="center">
                    <IconButton
                      size="md"
                      iconSize={16}
                      Icon={IconFile}
                      onClick={() =>
                        isSelf
                          ? navigate(
                              routePaths.ACCOUNTS.OFFERINGS.FPP_EDIT_OFFERING.replace(
                                ":offeringId",
                                s.id
                              )
                            )
                          : navigate(
                              routePaths.ACCOUNTS.OFFERINGS.TPP_EDIT_OFFERING.replace(
                                ":username",
                                userProfile?.username
                              ).replace(":offeringId", s.id)
                            )
                      }
                    />
                  </Box>
                </Flex>
              </Paper>
            );
          })}
    </CompactListShell>
  );
}

const CompactListShell = styled(Box)`
  min-width: 0;

  @media (max-width: 768px) {
    .compact-list-head {
      display: none;
    }

    .compact-list-row {
      padding: 0.75em !important;
    }

    .compact-row-flex {
      display: grid !important;
      grid-template-columns: auto minmax(0, 1fr) auto;
      grid-template-areas:
        "logo title action"
        "logo status action";
      gap: 0.2em 0.75em !important;
    }

    .compact-row-flex > [style*="border-left"] {
      display: none;
    }

    .compact-logo {
      grid-area: logo;
    }

    .compact-title {
      grid-area: title;
      text-align: left !important;
      min-width: 0;
    }

    .compact-status {
      grid-area: status;
      justify-content: flex-start !important;
    }

    .compact-action {
      grid-area: action;
    }
  }
`;
