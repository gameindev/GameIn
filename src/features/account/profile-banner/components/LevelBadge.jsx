import BadgeLevels from "../../../../shared/components/svg-icons/LevelBadge";
import { BadgeSection } from "../styles/style";

/** Original badge accent; stars + shield use one color for all levels. */
const BADGE_FILL = "#E2BB63";

const LevelBadge = ({ level }) => {
    return (
        <BadgeSection>
            <div className="levels">
                <div className="badge_info">
                    <BadgeLevels fill={BADGE_FILL} number={level} />
                </div>
            </div>
        </BadgeSection>
    );
};

export default LevelBadge;