import { UserAvatar } from "./styles";
import { Hexagon } from "../shared/HexagonDemo";
import { theme } from "../../styles/theme/customTheme";

const AvatarSection = ({ avatar, size, className='' }) => (
  <UserAvatar className={className}>
    <Hexagon
      $mainRadius={10}
      $roundingRadius={15}
      size={size}
      $backgroundColor={theme.colors.inputBgColor[0]}
      $rotated
    >
      <img src={avatar} alt="Avatar" />
    </Hexagon>
  </UserAvatar>
);

export default AvatarSection;
