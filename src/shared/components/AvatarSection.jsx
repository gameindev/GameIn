import { useEffect, useMemo, useState } from "react";
import { theme } from "../styles/theme/customTheme";
import HexContainer from "./HexContainer";
import ReusableModal from "./Modals";
import EditAvatar from "../../features/edit-avatar/pages/EditAvatar";
import styled from "styled-components";
import { useNavigate } from "react-router";
import getInitials from "../utils/helpers/getInitials.helper";

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 8px;
  right: 1px;
  width: ${({ size }) => {
        if (size >= 60) return "8px";
        if (size >= 40) return "6px";
        return "8px";
    }};
  height: ${({ size }) => {
        if (size >= 60) return "8px";
        if (size >= 40) return "6px";
        return "8px";
    }};
  background-color: ${({ $isOnline }) => ($isOnline ? "#10b981" : "#9ca3af")};
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const AvatarSection = ({
    avatar,
    size,
    radius,
    controls = false,
    className = "",
    isOnline = false,
    showOnlineStatus = false,
    onClick,
    profilePath,
    profileUsername,
    displayName,
    firstName,
    lastName,
}) => {
    const navigate = useNavigate();
    const [hasImageError, setHasImageError] = useState(false);
    const resolvedProfilePath =
        profilePath !== undefined
            ? profilePath
            : profileUsername
                ? `/${profileUsername}/profile`
                : "";
    const resolvedAvatar =
        typeof avatar === "string" ? avatar.trim() : avatar;
    const initials = useMemo(
        () =>
            getInitials({
                firstName,
                lastName,
                displayName: displayName || profileUsername,
            }),
        [displayName, firstName, lastName, profileUsername]
    );

    useEffect(() => {
        setHasImageError(false);
    }, [resolvedAvatar]);

    const handleClick = (event) => {
        if (onClick) {
            onClick(event);
            return;
        }

        if (resolvedProfilePath) {
            navigate(resolvedProfilePath);
        }
    };

    const isClickable = Boolean(onClick || resolvedProfilePath);

    return (
        <AvatarWrapper
            className={className}
            onClick={isClickable ? handleClick : undefined}
            style={isClickable ? { cursor: "pointer" } : {}}
        >
            {/* <Hexagon
      $mainRadius={10}
      $roundingRadius={15}
      size={size}
      $backgroundColor={theme.colors.inputBgColor[0]}
      $rotated
    >
      <img src={avatar} alt="Avatar" />
    </Hexagon> */}
            <HexContainer
                size={size}
                radius={radius}
                background={theme.colors.inputBgColor[0]}
            >
                {resolvedAvatar && !hasImageError ? (
                    <img
                        src={resolvedAvatar}
                        onError={() => setHasImageError(true)}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        alt="Avatar"
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: theme.colors.white[0],
                            fontWeight: 600,
                        }}
                    >
                        {initials}
                    </div>
                )}
            </HexContainer>
            {showOnlineStatus && (
                <OnlineIndicator
                    className="online-indicator"
                    size={size}
                    $isOnline={isOnline}
                />
            )}
            {controls && (
                <div className="action">
                    <ReusableModal title={"Update Profile Picture"}>
                        {({ close }) => <EditAvatar type="avatar" close={close} />}
                    </ReusableModal>
                </div>
            )}
        </AvatarWrapper>
    );
};

export default AvatarSection;
