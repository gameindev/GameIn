import AvatarSection from "../../../shared/components/AvatarSection";
import HexContainer from "../../../shared/components/HexContainer";
import getInitials from "../../../shared/utils/helpers/getInitials.helper";

export const inboxAvatar = (avatar, displayName, isOnline = false, showOnlineStatus = false) => {
  return avatar ? (
    <AvatarSection 
      size={50} 
      avatar={avatar}
      displayName={displayName}
      isOnline={isOnline}
      showOnlineStatus={showOnlineStatus}
    />
  ) : (
    <HexContainer size={50}>
      {getInitials({ displayName })}
    </HexContainer>
  );
};
