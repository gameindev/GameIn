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
import { ActionIcon, Button, Text } from "@mantine/core";
import LevelBadge from "./LevelBadge";
import { useSelector } from "react-redux";
import { currentUser } from "../../stores/selectors";
import useProfileMediaUrls from "../../utils/helpers/useProfileMediaUrl";
import { Link } from "react-router";

const UserProfileBanner = () => {
  const { user } = useSelector(currentUser);
  console.log(user);

  const { avatarUrl, coverImageUrl } = useProfileMediaUrls();
  if (!user) return null;

  const { user_type, creator_profile, brand_profile } = user;

  const profile = user_type === "CREATOR" ? creator_profile : brand_profile;

  const stats = {
    views: profile?.views || "0",
    followers: profile?.followers || "0",
    joinedOn: new Date(user.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };

  return (
    <BannerWrapper>
      <CoverBanner coverImage={coverImageUrl} controls />
      <UserInformation>
        <UserAvatar>
          <AvatarSection avatar={avatarUrl} radius={0.35} size="180" controls />
        </UserAvatar>
        <ProfileWrapper>
          <div className="personal_info">
            <UserInfo user={user} />
            <StatsSection stats={stats} />
          </div>
          <LevelBadge level={profile?.rank || 1} />
          <SponsorshipSection sponsors={user?.sponsors || []} />
          <ActionWrapper>
            <div className="interaction">
              <Link to={`/inbox`}>
                <ActionIcon size="lg" color="inputBgColor" variant="filled">
                  <Text size="xs">Inbox</Text>
                </ActionIcon>
              </Link>
            </div>
            <div className="actions">
              {/* <Button variant="secondary" size="xs">
                Follow
              </Button> */}
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
