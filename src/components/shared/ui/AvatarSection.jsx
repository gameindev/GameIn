import { Hexagon } from "./HexagonDemo";
import { theme } from "../../../styles/theme/customTheme";
import HexContainer from './HexContainer';

const AvatarSection = ({ avatar, size, className = "" }) => (
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
    {/* <HexContainer size={size} background={theme.colors.inputBgColor[0]}>
      <img src={avatar} alt="Avatar" />
    </HexContainer> */}
  </div>
);

export default AvatarSection;
