import AvatarSection from "./AvatarSection";
import {
    getProfileAvatarUrl,
    getProfileDisplayName,
    getProfileNameParts,
} from "../utils/helpers/useProfileMediaUrl.helper";

const ProfileAvatar = ({
    user,
    avatar,
    displayName,
    firstName,
    lastName,
    profileUsername,
    profilePath,
    ...props
}) => {
    const resolvedAvatar = avatar ?? getProfileAvatarUrl(user);
    const resolvedDisplayName = displayName ?? getProfileDisplayName(user);
    const resolvedNameParts = getProfileNameParts(user);
    const resolvedUsername = profileUsername ?? user?.username;
    const resolvedProfilePath =
        profilePath !== undefined
            ? profilePath
            : resolvedUsername
                ? `/${resolvedUsername}/profile`
                : "";

    return (
        <AvatarSection
            {...props}
            avatar={resolvedAvatar}
            displayName={resolvedDisplayName}
            firstName={firstName ?? resolvedNameParts.firstName}
            lastName={lastName ?? resolvedNameParts.lastName}
            profileUsername={resolvedUsername}
            profilePath={resolvedProfilePath}
        />
    );
};

export default ProfileAvatar;
