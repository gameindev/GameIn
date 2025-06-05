import { Hexagon } from "../shared/HexagonDemo";
import { theme } from "../../styles/theme/customTheme";

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
  </div>
);

export default AvatarSection;
