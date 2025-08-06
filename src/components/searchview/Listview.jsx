import styled from "styled-components";
import { theme } from "../../styles/theme/customTheme";
import AvatarSection from "../shared/ui/AvatarSection";
import creator from "../../assets/creators/creator_image.jpg";
import { Button, Group, RingProgress, Text } from "@mantine/core";
import Verifed from "../svg-icons/Verifed";
import Badge from "../svg-icons/Badge";
import BadgeLevels from "../svg-icons/LevelBadge";
import { Search, User } from "lucide-react";
import { useMediaQuery } from "@mantine/hooks";
import { useContext, useEffect, useMemo, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { USERTYPES } from "../../utils/enum";
import { calculateAge } from "../../utils/helpers/calculateAge";
import useApi from "../../hooks/useApi";
import { useSelector } from "react-redux";
import { currentUser } from "../../stores/selectors";

const ListviewStyles = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.sm};
  margin: ${theme.gap.md} 0;
  background-color: ${theme.colors.secondaryGrey[0]};
  gap: ${theme.gap.xs};

  .avatar,
  .levels,
  .progress,
  .social_info,
  .action_btns {
    flex: 1;
    text-align: center;
  }

  .list_content {
    flex: 1 0 25%;
  }

  .levels {
    border-left: 1px dashed ${theme.colors.inputBgColor[0]};
  }

  .progress {
    border-left: 1px dashed ${theme.colors.inputBgColor[0]};
    border-right: 1px dashed ${theme.colors.inputBgColor[0]};
    display: flex;
    justify-content: center;
  }

  .social_info {
    border-right: 1px dashed ${theme.colors.inputBgColor[0]};
    display: flex;
    padding: 0 ${theme.gap.xs} 0 0;
    flex-direction: column;
    gap: ${theme.gap.xxs};

    .follwers_list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${theme.gap.xs};
    }
  }

  .action_btns {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    gap: 1em;
  }
`;

export default function Listview({ SocialInfo }) {
  const { user } = useSelector(currentUser);
  const { searchData, userType } = useContext(SearchContext);
  const bigscreen = useMediaQuery("(min-width: 1680px)");
  console.log("Listview searchData:", searchData);

  const { post, get, del } = useApi();

  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      try {
        const response = await get(`/users/${user.id}/follow/followers`);
        console.log(response);

        const ids = response?.data?.map((u) => u.id);
        setFollowedUsers(ids);
      } catch (err) {
        console.error("Failed to load followed users:", err);
      }
    };

    fetchFollowedUsers();
  }, []);

  const handleFollow = async (followId) => {
    try {
      const isAlreadyFollowed = followedUsers.includes(followId);
      console.log(isAlreadyFollowed, "isAlreadyFollowed");

      if (isAlreadyFollowed) {
        await del(`/users/${user.id}/follow/${followId}`, {
          followingId : followId,
        });
        setFollowedUsers((prev) => prev.filter((id) => id !== followId));
      } else {
        await post(`/users/${user.id}/follow`, { followingId: followId });
        setFollowedUsers((prev) => [...prev, followId]);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  const filteredSearchData = useMemo(() => {
    return searchData?.filter(({ id }) => id !== user.id);
  }, [searchData, user.id]);

  return filteredSearchData?.map(
    ({ id, username, dateOfBirth, isVerified }) => (
      <ListviewStyles key={id}>
        <AvatarSection className="avatar" avatar={creator} size="7em" />
        <div className="list_content">
          <Text c="white" size="xl">
            {username}
          </Text>
          <Group>
            {userType.toUpperCase() === USERTYPES.CREATOR && (
              <Text size="sm">{calculateAge(dateOfBirth)}</Text>
            )}
            {isVerified && <Verifed />}
            <Badge />
          </Group>
          <Text size="sm">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam
          </Text>
        </div>
        <div className="levels">
          <Text size="sm" ta="center" mb="xs">
            LEVEL
          </Text>
          <BadgeLevels width="3.125em" height="4.375em" />
        </div>
        <div className="progress">
          <RingProgress
            size={bigscreen ? 120 : 90}
            thickness={5}
            roundCaps
            label={
              <>
                <Text size={bigscreen ? "md" : "sm"} ta="center" c="white">
                  {" "}
                  1.5M
                </Text>
                <Text size={bigscreen ? "sm" : "xs"} ta="center">
                  FOLLOWERS
                </Text>
                <Text size={bigscreen ? "sm" : "xs"} ta="center">
                  <User />
                </Text>
              </>
            }
            sections={[
              { value: 25, color: "primary" },
              { value: 15, color: "secondary" },
              { value: 15, color: "skyblue" },
              { value: 25, color: "primary" },
            ]}
          />
        </div>
        <div className="social_info">
          {SocialInfo.map(({ text, icon, followers, color }) => (
            <Text className="follwers_list" ta="center" key={text}>
              {icon}
              <Text size="xs" span c={color}>
                {text}
              </Text>
              <Text size="xs" span c="white">
                {followers}
              </Text>
            </Text>
          ))}
        </div>
        <div className="action_btns">
          <Button
            width="6.25em"
            variant="secondary"
            onClick={() => handleFollow(id)}
          >
            {followedUsers.includes(id) ? "Following" : "Follow"}
          </Button>
          <Button width="6.25em" variant="primary">
            sponsor
          </Button>
        </div>
      </ListviewStyles>
    )
  );
}
