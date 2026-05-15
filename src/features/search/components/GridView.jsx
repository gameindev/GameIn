import { Button, Group, RingProgress, Space, Text } from "@mantine/core";
import { currentUser } from "../../auth/store/selector";
import { useAppSelector } from "../../../app/store/hooks";
import { SearchContext } from "../../../shared/context/searchContext";
import { useContext, useMemo } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { getFollowerStats } from "../../../app/services/user/user-follower.service";
import { GridStyles } from "../styles/gridViewStyles";
import ProfileAvatar from "../../../shared/components/ProfileAvatar";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { calculateAge } from "../../../shared/utils/helpers/calculateAge.helper";
import Verifed from "../../../shared/components/svg-icons/Verifed";
import Badge from "../../../shared/components/svg-icons/Badge";
import { IconMessage, IconUser } from "@tabler/icons-react";
import BadgeLevels from "../../../shared/components/svg-icons/LevelBadge";
import FollowButton from "../../../shared/components/FollowButton";
import { Link, useNavigate } from "react-router";
import CountryFlag from "../../../shared/components/CountryFlag";
import Separator from "../../../shared/components/Separator";
import IconButton from "../../../shared/components/IconButton";
import routeService from "../../../app/services/route/routeService";

export default function GridView({ SocialInfo }) {
  const user = useAppSelector(currentUser);
  const { searchData, userType } = useContext(SearchContext);
  const bigscreen = useMediaQuery("(min-width: 1680px)");
  const navigate = useNavigate();

  const filteredSearchData = useMemo(() => {
    return searchData?.filter(({ id }) => id !== user.id);
  }, [searchData, user.id]);

  return (
    <Group>
      {filteredSearchData?.map((userItem) => {
        const { id, username, date_of_birth, is_verified } = userItem;
        const { totalFollowers } = getFollowerStats(userItem);
        const profile =
          userItem.creator_profile ||
          userItem.brand_profile ||
          userItem.community_profile;
        const certificationLevel = Math.min(
          6,
          Math.max(1, Math.round(Number(profile?.rank) || 1)),
        );

        return (
          <div style={{ position: "relative", flexBasis: "calc(33.3% - 0.8em)" }} key={id}>
            <GridStyles>
              <div className="avatar">
                <ProfileAvatar
                  user={userItem}
                  className="avatar"
                  size="112"
                  profilePath={`/${username}/profile`}
                />
                <div className="title">
                  <Link
                    to={`/${username}/profile`}
                    style={{ textDecoration: "none" }}
                  >
                    <Text c="white" size="xl">
                      {username}
                    </Text>
                  </Link>
                  <Group>
                    {userType.toUpperCase() === USERTYPES.CREATOR && (
                      <Text size="sm">{calculateAge(date_of_birth)}</Text>
                    )}
                    {profile?.country && (
                      <div className="nationality">
                        {
                          <CountryFlag
                            countryCode={profile?.country.toUpperCase()}
                            size={16}
                          />
                        }
                      </div>
                    )}
                    {is_verified && <Verifed />}
                    <Badge />
                  </Group>
                </div>
              </div>

              <Text size="sm">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat...
              </Text>

              <Space />

              <div className="information">
                {/* <div className="social_info">
                  {SocialInfo?.map(({ text, icon, followers, color }) => (
                    <Group className="follwers_list" ta="center" key={text}>
                      <Group>
                        {icon}
                        <Text size="xs" span c={color} ta="left">
                          {text}
                        </Text>
                      </Group>
                      <Text size="xs" span c="white">
                        {followers}
                      </Text>
                    </Group>
                  ))}
                </div> */}
                <div className="progress">
                  <RingProgress
                    size={bigscreen ? 90 : 90}
                    thickness={5}
                    roundCaps
                    label={
                      <div className="flex flex-col items-center">
                        <Text
                          size={bigscreen ? "sm" : "xs"}
                          ta="center"
                          c="white"
                        >
                          {" "}
                          {totalFollowers || 0}
                        </Text>
                        <Text size={bigscreen ? "xs" : "xs"} ta="center">
                          FOLLOWERS
                        </Text>
                        <Text size={bigscreen ? "xs" : "xs"} ta="center">
                          <IconUser size={12} />
                        </Text>
                      </div>
                    }
                    sections={[
                      { value: 25, color: "primary" },
                      { value: 15, color: "secondary" },
                      { value: 15, color: "skyblue" },
                      { value: 25, color: "primary" },
                    ]}
                  />
                </div>
                <Separator size="7em" />
                <div className="levels">
                  <Text size="sm" ta="center" mb="xs">
                    LEVEL
                  </Text>
                  <BadgeLevels
                    fill="#E2BB63"
                    number={certificationLevel}
                    width="3.125em"
                    height="4.375em"
                  />
                </div>
              </div>

              <Space />

              <Group className="action_btns">
                <FollowButton targetUserId={id} width="6.25em" />

                <Button w="6.25em" variant="primary">
                  sponsor
                </Button>
              </Group>
              <Group pos={"absolute"} bottom={"1em"} right={"1em"}>
                <IconButton
                  Icon={IconMessage}
                  onClick={() => routeService.messageRoute(id, navigate, user)}
                />
              </Group>
            </GridStyles>
          </div>
        );
      })}
    </Group>
  );
}
