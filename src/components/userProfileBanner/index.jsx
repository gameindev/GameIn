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
} from "./styles";
import { Button } from "@mantine/core";
import LevelBadge from "./LevelBadge";
import Nike from "../../assets/creators/sponsers.svg";
import creator from "../../assets/creators/creator_image.jpg";
import coverImage from "../../assets/creators/cover_image.jpg";
import { UserAvatar } from "./styles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./../../stores/auth/authSelector";

const UserProfileBanner = () => {
  const currentUser = {
    dateOfBirth: "1997-09-08",
    email: "idiiiotboy@gmail.com",
    id: 1,
    isActive: true,
    isVerified: false,
    userType: "BRAND",
    username: "supriseMF",
    avatar: creator,
    coverImage: coverImage,
    age: 24,
    stats: {
      views: "11254",
      followers: "1125",
      joinedOn: "OCT 23rd, 2022",
    },
    level: 5,
    sponsors: [
      {
        name: "Nike",
        logo: Nike,
        size: "7rem",
      },
      // {
      //   name: "Nike",
      //   logo: Nike,
      // },
    ],
  };
  const user = useSelector(selectCurrentUser);

  return (
    <>
      <BannerWrapper>
        <CoverBanner coverImage={currentUser.coverImage} controls />
        <UserInformation>
          <UserAvatar>
            <AvatarSection avatar={currentUser.avatar} size="15em" controls />
          </UserAvatar>
          <ProfileWrapper>
            <div className="personal_info">
              <UserInfo user={user} />
              <StatsSection stats={currentUser.stats} />
            </div>
            <LevelBadge level={currentUser.level} />
            <SponsorshipSection sponsors={user} />
            <ActionWrapper>
              <div className="actions">
                <Button
                  variant="secondary"
                  size="xs"
                  padding="0.25rem 0.5rem"
                  width="6.25rem"
                >
                  Follow
                </Button>
                <Button
                  variant="primary"
                  size="xs"
                  padding="0.25rem 0.5rem"
                  width="6.25rem"
                >
                  Sponsor
                </Button>
              </div>
            </ActionWrapper>
          </ProfileWrapper>
        </UserInformation>
      </BannerWrapper>
    </>
  );
};

export default UserProfileBanner;
