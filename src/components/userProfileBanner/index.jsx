import CoverBanner from './../shared/ui/CoverBanner';
import AvatarSection from './../shared/ui/AvatarSection';
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
import { currentUser } from '../../stores/selectors';


const UserProfileBanner = () => {
  const userData = {
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
  const { user } = useSelector(currentUser);
  

  return (
    <>
      <BannerWrapper>
        <CoverBanner coverImage={userData.coverImage} />
        <UserInformation>
          <UserAvatar>
            <AvatarSection avatar={userData.avatar} size="15em" />
          </UserAvatar>
          <ProfileWrapper>
            <div className="personal_info">
              <UserInfo user={user} />
              <StatsSection stats={userData.stats} />
            </div>
            <LevelBadge level={userData.level} />
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
