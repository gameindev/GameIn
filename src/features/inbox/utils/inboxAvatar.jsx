import ProfileAvatar from "../../../shared/components/ProfileAvatar";

export const inboxAvatar = (avatar, displayName, isOnline = false, showOnlineStatus = false) => {
  return (
    <ProfileAvatar
      size={50}
      avatar={avatar}
      displayName={displayName}
      isOnline={isOnline}
      showOnlineStatus={showOnlineStatus}
      profilePath=""
    />
  );
};
