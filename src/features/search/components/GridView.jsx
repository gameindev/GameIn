import { Button, Group, RingProgress, Space, Text } from "@mantine/core";
import { currentUser } from "../../auth/store/selector";
import { useAppSelector } from "../../../app/store/hooks";
import { SearchContext } from "../../../shared/context/searchContext";
import { useContext, useMemo } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { getFollowerStats } from "../../../app/services/user/user-follower.service";
import { GridStyles } from "../styles/gridViewStyles";
import AvatarSection from "../../../shared/components/AvatarSection";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { calculateAge } from "../../../shared/utils/helpers/calculateAge.helper";
import Verifed from "../../../shared/components/svg-icons/Verifed";
import Badge from "../../../shared/components/svg-icons/Badge";
import creator from "../../../assets/creators/creator_image.jpg"
import { IconUser } from "@tabler/icons-react";
import BadgeLevels from "../../../shared/components/svg-icons/LevelBadge";
import FollowButton from "../../../shared/components/FollowButton";


export default function GridView({ SocialInfo }) {
    const user = useAppSelector(currentUser);
    const { searchData, userType } = useContext(SearchContext);
    const bigscreen = useMediaQuery("(min-width: 1680px)");

    const filteredSearchData = useMemo(() => {
        return searchData?.filter(({ id }) => id !== user.id);
    }, [searchData, user.id]);

    return (
        <Group>
            {filteredSearchData?.map((userItem) => {
                const { id, username, dateOfBirth, isVerified } = userItem;
                const { totalFollowers } = getFollowerStats(userItem);

                const avatarUrl = userItem.creator_profile?.profile_image?.path || userItem.brand_profile?.profile_image?.path || userItem.community_profile?.profile_image?.path;
                const profileImageUrl = avatarUrl ? `${import.meta.env.VITE_ASSET_URL}/${avatarUrl}` : creator;

                return (
                    <div style={{ flexBasis: "calc(33.3% - 0.8em)" }} key={id}>
                        <GridStyles>
                            <div className="avatar">
                                <AvatarSection className="avatar" avatar={profileImageUrl} size="112" />
                                <div className="title">
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
                                </div>
                            </div>

                            <Text size="sm" >
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                                aliquam erat...
                            </Text>

                            <Space />

                            <div className="information">
                                <div className="social_info">
                                    {SocialInfo.map(({ text, icon, followers, color }) => (
                                        <Group className="follwers_list" ta="center" key={text}>
                                            <Group>
                                                {icon}
                                                <Text size="xs" span c={color} ta="left">
                                                    {text}
                                                </Text>
                                            </Group>
                                            <Text size="xs" span c="white" >
                                                {followers}
                                            </Text>
                                        </Group>
                                    ))}
                                </div>
                                <div className="progress">
                                    <RingProgress
                                        size={bigscreen ? 120 : 90}
                                        thickness={5}
                                        roundCaps
                                        label={
                                            <div className="flex flex-col items-center">
                                                <Text
                                                    size={bigscreen ? "md" : "sm"}
                                                    ta="center"
                                                    c="white"
                                                >
                                                    {" "}
                                                    {totalFollowers || 0}
                                                </Text>
                                                <Text size={bigscreen ? "sm" : "xs"} ta="center">
                                                    FOLLOWERS
                                                </Text>
                                                <Text size={bigscreen ? "sm" : "xs"} ta="center">
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
                                <div className="levels">
                                    <Text size="sm" ta="center" mb="xs">
                                        LEVEL
                                    </Text>
                                    <BadgeLevels width="3.125em" height="4.375em" />
                                </div>
                            </div>

                            <Space />
                            

                            <Group className="action_btns">
                                <FollowButton
                                    targetUserId={id}
                                    width="6.25em"
                                />

                                <Button w="6.25em" variant="primary">
                                    sponsor
                                </Button>
                            </Group>
                        </GridStyles>
                    </div>
                )
            })}
        </Group>
    )
}