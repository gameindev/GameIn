import {
  ActionWrapper,
  BannerWrapper,
  ProfileWrapper,
  UserAvatar,
  UserInformation,
} from "./styles/style";
import profileMediaUrlsHelper from "../../../shared/utils/helpers/useProfileMediaUrl.helper";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import AvatarSection from "../../../shared/components/AvatarSection";
import CoverBanner from "../../../shared/components/CoverBanner";
import UserInfo from "./components/UserInfo";
import StatsSection from "./components/StatsSection";
import LevelBadge from "./components/LevelBadge";
import SponsorshipSection from "./components/SponsorshipSection";
import { Button } from "@mantine/core";
import { Link, useNavigate } from "react-router";
import IconButton from "../../../shared/components/IconButton";
import { IconMessage } from "@tabler/icons-react";
import FollowButton from "../../../shared/components/FollowButton";
import routePaths from "../../../app/router/routes";

export default function ProfileBanner({ userProfile, isSelf }) {
  if (!userProfile) return null;
  const navigate = useNavigate();

  const { avatarUrl, coverImageUrl } = profileMediaUrlsHelper(userProfile);
  // console.log(userProfile)
  const { user_type, creator_profile, brand_profile, community_profile } =
    userProfile;

  const profile =
    user_type === USERTYPES.CREATOR
      ? creator_profile
      : user_type === USERTYPES.BRAND
      ? brand_profile
      : community_profile;

  const stats = {
    views: profile?.views || "0",
    followers: profile?.followers || "0",
    joinedOn: new Date(userProfile.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };

  return (
    <BannerWrapper>
      <CoverBanner coverImage={coverImageUrl} controls={isSelf} />
      <UserInformation>
        <UserAvatar>
          <AvatarSection
            avatar={avatarUrl}
            radius={0.35}
            size="180"
            controls={isSelf}
          />
        </UserAvatar>

        <ProfileWrapper>
          <div className="personal_info">
            <UserInfo user={userProfile} />
            <StatsSection stats={stats} />
          </div>
          <LevelBadge level={profile?.rank || 1} />
          <SponsorshipSection sponsors={userProfile?.sponsors || []} />

          <ActionWrapper>
            {isSelf ? (
              <div className="actions">
                <Button
                  variant="secondary"
                  size="xs"
                  onClick={() => {
                    navigate(routePaths.SETTINGS.ACCOUNT);
                  }}
                >
                  Edit Profile
                </Button>
              </div>
            ) : (
              <>
                {/* <div className="interaction">
                                    <Link to={`/inbox`}>
                                        <IconButton Icon={IconMessage} hoverClass="hoverGrey" />
                                    </Link>
                                </div> */}
                <div className="actions">
                  <FollowButton targetUserId={userProfile.id} />
                  <Button variant="primary" size="xs">
                    Sponsor
                  </Button>
                </div>
              </>
            )}
          </ActionWrapper>
        </ProfileWrapper>
      </UserInformation>
    </BannerWrapper>
  );
}
