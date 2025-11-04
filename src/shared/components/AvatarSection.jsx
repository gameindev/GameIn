import { theme } from "../styles/theme/customTheme";
import HexContainer from "./HexContainer";
import ReusableModal from "./Modals";
import EditAvatar from "../../features/edit-avatar/pages/EditAvatar";

const AvatarSection = ({
    avatar,
    size,
    radius,
    controls = false,
    className = "",
}) => (
    <div className={className}>
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
            {avatar ? (
                <img src={avatar} alt="Avatar" />
            ) : (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: theme.colors.white[0],
                    }}
                >
                    No Avatar
                </div>
            )}
        </HexContainer>
        {controls && (
            <div className="action">
                <ReusableModal title={"Update Profile Picture"}>
                    {({ close }) => <EditAvatar type="avatar" close={close} />}
                </ReusableModal>
            </div>
        )}
    </div>
);

export default AvatarSection;