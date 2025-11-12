import AvatarSection from "../../../shared/components/AvatarSection";
import HexContainer from "../../../shared/components/HexContainer";

export const inboxAvatar = (avatar, displayName) => {
  return avatar ? (
    <AvatarSection size={50} avatar={avatar} />
  ) : (
    <HexContainer size={50}>
      {displayName?.trim()?.charAt(0)?.toUpperCase() ?? "?"}
    </HexContainer>
  );
};
