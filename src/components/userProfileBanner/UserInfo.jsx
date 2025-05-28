import { UserSection } from "./styles";

const UserInfo = ({ user }) => (
  <UserSection>
    <div className="infoSection">
      <div className="user_info">
        <div className="profile_name">{user.username}</div>
        <div className="profile_info">
          <span>🇺🇸 {user.age} ●</span>
        </div>
      </div>
    </div>
  </UserSection>
);

export default UserInfo;
