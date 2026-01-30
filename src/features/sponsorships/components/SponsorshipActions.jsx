import { ActionIcon, Box, Group } from "@mantine/core";
import IconButton from "../../../shared/components/IconButton";
import {
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconDeviceFloppy,
  IconFile,
  IconMessage,
  IconX,
} from "@tabler/icons-react";
import { OfferingStatus } from "../../../shared/enums/offeringStatusEnum";
import { useNavigate, useOutletContext } from "react-router";
import routePaths from "../../../app/router/routes";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";

const SponsorshipActions = ({
  sponsorship,
  openedRow,
  index,
  toggleRow,
  theme,
  onAccept,
  onNegotiate,
  onReject,
}) => {
  const navigate = useNavigate();
  const { userProfile, isSelf } = useOutletContext();
  const user = useAppSelector(currentUser);

  const isOwner = !isSelf && sponsorship.offering_offers.some(
    (owner) =>
      owner.updated_by_user_id !== null && owner.updated_by_user_id !== user.id,
  );

  return (
    <Group justify="space-between" align="center" w="100%" wrap="nowrap">
      <Group gap="0.4em" wrap="nowrap">
        <IconButton
          iconSize={18}
          disabled={isOwner}
          Icon={IconFile}
          onClick={() =>
            isSelf
              ? navigate(
                  routePaths.ACCOUNTS.OFFERINGS.FPP_EDIT_OFFERING.replace(
                    ":offeringId",
                    sponsorship.id,
                  ),
                )
              : navigate(
                  routePaths.ACCOUNTS.OFFERINGS.TPP_EDIT_OFFERING.replace(
                    ":username",
                    userProfile?.username,
                  ).replace(":offeringId", sponsorship.id),
                )
          }
        />
        {/* <IconButton iconSize={18} Icon={IconDeviceFloppy} /> */}
        {openedRow !== index && (
          <>
            {sponsorship.status !== OfferingStatus.DRAFT &&
            sponsorship.status !== OfferingStatus.ACCEPTED &&
            sponsorship.status !== OfferingStatus.SPONSORED &&
            user.user_type === USERTYPES.CREATOR ? (
              <>
                <IconButton
                  iconSize={18}
                  Icon={IconCheck}
                  hoverClass="hoverGreen"
                  onClick={() => onAccept && onAccept(sponsorship?.id)}
                />
                <IconButton
                  iconSize={18}
                  Icon={IconMessage}
                  hoverClass="hoverGrey"
                  onClick={() => onNegotiate && onNegotiate(sponsorship?.id)}
                />
                <IconButton
                  iconSize={18}
                  Icon={IconX}
                  hoverClass="hoverRed"
                  onClick={() => onReject && onReject(sponsorship?.id)}
                />
              </>
            ) : null}
          </>
        )}
      </Group>
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
  );
};

export default SponsorshipActions;
