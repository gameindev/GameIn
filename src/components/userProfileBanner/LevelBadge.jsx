import BadgeLevels from "../svg-icons/LevelBadge";
import { BadgeSection } from "./styles";

const levelColors = {
  1: "#9D7FEF",
  2: "#76A2EE",
  3: "#65C3D6",
  4: "#5CE5B0",
  5: "#AAD980",
  6: "#E2BB63",
};


const LevelBadge = ({ level }) => {
  const colors = levelColors[level] || "#E2BB63";

  return (
    <BadgeSection>
      <div className="levels">
        <div className="badge_info">
          <BadgeLevels fill={colors} number={level} />
        </div>
      </div>
    </BadgeSection>
  );
};

export default LevelBadge;
