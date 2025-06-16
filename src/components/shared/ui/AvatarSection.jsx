import { Hexagon } from "./HexagonDemo";
import { theme } from "../../../styles/theme/customTheme";
import HexContainer from "./HexContainer";
import ReusableModal from "./../modals/modal";
import EditAvator from "./../modals/EditAvator/EditAvator";

const AvatarSection = ({ avatar, size, controls = false, className = "" }) => (
  <div className={className}>
    <Hexagon
      $mainRadius={10}
      $roundingRadius={15}
      size={size}
      $backgroundColor={theme.colors.inputBgColor[0]}
      $rotated
    >
      <img src={avatar} alt="Avatar" />
    </Hexagon>
    {controls && (
      <div className="action">
        <ReusableModal title={"Update Profile Picture"}>
          <EditAvator />
        </ReusableModal>
      </div>
    )}
    {/* <HexContainer size={size} background={theme.colors.inputBgColor[0]}>
      <img src={avatar} alt="Avatar" />
    </HexContainer> */}
  </div>
);

export default AvatarSection;
