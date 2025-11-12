import { useState } from "react";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { useOfferExpiry } from "./useOfferExpiry";
import { OfferingStatus } from "../../../shared/enums/offeringStatusEnum";
import { useOfferings } from "./useOfferings";

export const useEditLock = ({ offering, user }) => {
  const { resetOffering } = useOfferings({ offeringId: offering?.id });
  const [hasReset, setHasReset] = useState(false);
  const isBrand = user?.user_type === USERTYPES.BRAND;
  const isCreator = user?.user_type === USERTYPES.CREATOR;

  const lastAdjustedBy = offering?.last_adjusted_by;
  const lastEditedById = lastAdjustedBy?.id;
  const lastEditedByType = lastAdjustedBy?.user_type;

  const isAccepted =
    offering?.status === OfferingStatus.ACCEPTED ||
    offering?.status === OfferingStatus.SPONSORED;

  const isSponsored = offering?.status === OfferingStatus.SPONSORED;

  const { expired } = useOfferExpiry(
    !isAccepted && lastEditedByType === USERTYPES.BRAND
      ? offering?.last_adjusted_at
      : null,
    async () => {
      await resetOffering();
      setHasReset(true);
    }
  );

  const timerActive =
    !isAccepted &&
    lastEditedByType === USERTYPES.BRAND &&
    !expired &&
    Boolean(offering?.last_adjusted_at);

  const brandLocked = isBrand && lastEditedById === user?.id && timerActive;

  return {
    isBrand,
    isCreator,
    brandLocked,
    isLocked: brandLocked,
    timerActive,
    expired,
    lastEditedById,
    lastEditedByType,
    hasReset,
    isAccepted,
    isSponsored,
  };
};
