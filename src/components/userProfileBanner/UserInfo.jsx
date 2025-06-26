import { calculateAge } from "../../utils/helpers/calculateAge";
import Badge from "../svg-icons/Badge";
import Verifed from "../svg-icons/Verifed";
import { UserSection } from "./styles";

const UserInfo = ({ user }) => {
  const age = calculateAge(user?.dateOfBirth);
  return (
    <UserSection>
      <div className="infoSection">
        <div className="user_info">
          <div className="profile_name">{user.username}</div>
          <div className="profile_info">
            <div className="nationality">{user.nationality || "IND"}</div>
            {user.userType === "CREATOR" && (
              <>
                <div className="age">{age || "N/A"}</div>
                <div className="gender_info"></div>
              </>
            )}
            <div className="verified">
              <Verifed />
            </div>
            <div className="badge_info">
              <Badge />
            </div>
          </div>
        </div>
      </div>
    </UserSection>
  );
};

export default UserInfo;
