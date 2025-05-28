import { UserAvatar } from "./styles";
import { Hexagon } from "../shared/HexagonDemo";
import { theme } from "../../styles/theme/customTheme";

const AvatarSection = ({ avatar }) => (
  <UserAvatar>
    <Hexagon
      $mainRadius={10}
      $roundingRadius={15}
      size="15em"
      $backgroundColor={theme.colors.inputBgColor[0]}
      $rotated
    >
      <img src={avatar} alt="Avatar" />
    </Hexagon>
  </UserAvatar>
);

export default AvatarSection;
