import { Avatar, Badge, Button, Text } from "@mantine/core";
import {
  BannerWrapper,
  Banner,
  UserAvatar,
  UserInformation,
  ProfileWrapper,
  ActionWrapper,
} from "../../styles/components/userProfileBanner";
import { Eye, UserRound } from "lucide-react";
import SponserBy from "../../assets/creators/sponsers.svg";
import creator from "../../assets/creators/creator_image.jpg";
import { Hexagon } from "../shared/HexagonDemo";
import { theme } from "../../styles/theme/customTheme";
import badge from "../../assets/creators/badge.svg";
import coverImage from "../../assets/creators/cover_image.jpg";

export default function UserProfileBanner({ currentUser }) {
  return (
    <BannerWrapper>
      <Banner>
        <div className="banner_overlay" />
        <div className="banner_image">
          <img src={coverImage} alt="" />
        </div>
      </Banner>

      <UserInformation>
        <UserAvatar>
          <Hexagon
            mainRadius={10}
            roundingRadius={15}
            size="15em"
            backgroundColor={theme.colors.inputBgColor[0]}
            rotated
          >
            <img src={creator} alt="" />
          </Hexagon>
        </UserAvatar>
        <ProfileWrapper>
          <div className="infoSection">
            <div className="user_info">
              <div className="profile_name">{currentUser.username}</div>
              <div className="profile_info">
                <Text component="span" size="sm" color="dimmed">
                  🇺🇸 24 ●
                </Text>
              </div>
            </div>
            <div className="profile_stats">
              <div className="stats_section">
                <Eye className="views_icon" size={12} />
                <Text className="views" component="span" size="md" weight={500}>
                  11,294
                </Text>
                <Text
                  className="helperText"
                  component="span"
                  size="xs"
                  color="dimmed"
                >
                  Views
                </Text>
              </div>
              <div className="stats_section">
                <UserRound className="followers_icon" size={12} />
                <Text
                  className="followers"
                  component="span"
                  size="md"
                  weight={500}
                >
                  1,224
                </Text>
                <Text
                  className="helperText"
                  component="span"
                  size="xs"
                  color="dimmed"
                >
                  Followers
                </Text>
              </div>
              <div className="stats_section">
                <Text
                  className="joined"
                  component="span"
                  size="md"
                  weight={600}
                >
                  Joined:
                </Text>
                <Text
                  className="joined_date"
                  component="span"
                  size="xs"
                  color="dimmed"
                >
                  Oct. 23rd, 2022
                </Text>
              </div>
            </div>
          </div>
          <div className="levels">
            <div className="badge_info">
              <img src={badge} alt="" />
            </div>
          </div>
          <div className="sponsorship">
            <Text
              className="sponsorship_text"
              component="span"
              size="sm"
              color="dimmed"
            >
              Sponsored by
            </Text>
            <div className="sponsorship_tracker">
              <div className="sponsors">
                <img
                  className="sponsor_logo"
                  src={SponserBy}
                  alt="Nike"
                  width={50}
                />
                <img
                  className="sponsor_logo"
                  src={SponserBy}
                  alt="Nike"
                  width={50}
                />
                <img
                  className="sponsor_logo"
                  src={SponserBy}
                  alt="Nike"
                  width={50}
                />
              </div>
            </div>
          </div>
          <ActionWrapper>
            <div className="actions">
              <Button variant="secondary" size="xs">
                Follow
              </Button>
            </div>
          </ActionWrapper>
        </ProfileWrapper>
      </UserInformation>
    </BannerWrapper>
  );
}
