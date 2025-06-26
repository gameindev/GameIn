import CoverBanner from "./../shared/ui/CoverBanner";
import AvatarSection from "./../shared/ui/AvatarSection";
import UserInfo from "./UserInfo";
import StatsSection from "./StatsSection";
import SponsorshipSection from "./SponsorshipSection";
import {
  BannerWrapper,
  UserInformation,
  ProfileWrapper,
  ActionWrapper,
  UserAvatar,
} from "./styles";
import { Button } from "@mantine/core";
import LevelBadge from "./LevelBadge";
import { useSelector } from "react-redux";
import { currentUser } from "../../stores/selectors";

const getImageUrl = (path) => (path ? `http://localhost:3000/${path}` : null);

const UserProfileBanner = () => {
  const { user } = useSelector(currentUser);

  if (!user) return null;

  const {
    username,
    userType,
    email,
    dateOfBirth,
    creatorProfile,
    brandProfile,
    userBio,
  } = user;

  const profile = userType === "CREATOR" ? creatorProfile : brandProfile;
  const stats = {
    views: profile?.views || "0",
    followers: profile?.followers || "0",
    joinedOn: new Date(user.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };

  console.log(user);
  

  const avatarUrl = getImageUrl(profile?.profileImage?.path);
  const coverImageUrl = getImageUrl(profile?.coverImage?.path);

  return (
    <BannerWrapper>
      <CoverBanner coverImage={coverImageUrl} controls />
      <UserInformation>
        <UserAvatar>
          <AvatarSection avatar={avatarUrl} size="15em" controls />
        </UserAvatar>
        <ProfileWrapper>
          <div className="personal_info">
            <UserInfo user={user} />
            <StatsSection stats={stats} />
          </div>
          <LevelBadge level={profile?.rank || 1} />
          <SponsorshipSection sponsors={user?.sponsors || []} />
          <ActionWrapper>
            <div className="actions">
              <Button variant="secondary" size="xs">
                Follow
              </Button>
              <Button variant="primary" size="xs">
                Sponsor
              </Button>
            </div>
          </ActionWrapper>
        </ProfileWrapper>
      </UserInformation>
    </BannerWrapper>
  );
};

export default UserProfileBanner;
