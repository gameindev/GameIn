
import { currentUser } from "../../auth/store/selector";
import { useAppSelector } from "../../../app/store/hooks";
import { useContext, useMemo } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { SearchContext } from "../../../shared/context/searchContext";
import { getFollowerStats } from "../../../app/services/user/user-follower.service";
import AvatarSection from "../../../shared/components/AvatarSection";
import creator from "../../../assets/creators/creator_image.jpg"
import { Button, Group, RingProgress, Text } from "@mantine/core";
import { SocialInfo } from "../types/socialInfoData.mapper";
import BadgeLevels from "../../../shared/components/svg-icons/LevelBadge";
import { Link } from "react-router";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { calculateAge } from "../../../shared/utils/helpers/calculateAge.helper";
import Verifed from "../../../shared/components/svg-icons/Verifed";
import Badge from "../../../shared/components/svg-icons/Badge";
import { ListviewStyles } from "../styles/listViewStyles";
import { IconUser } from "@tabler/icons-react";
import FollowButton from "../../../shared/components/FollowButton";



export default function ListView() {
    const user = useAppSelector(currentUser);
    const { searchData, userType } = useContext(SearchContext);
    const bigscreen = useMediaQuery("(min-width: 1680px)");

    const filteredSearchData = useMemo(() => {
        return searchData?.filter(({ id }) => id !== user.id);
    }, [searchData, user.id]);

    return filteredSearchData?.map((userItem) => {
        const { id, username, dateOfBirth, isVerified } = userItem;
        const { totalFollowers } = getFollowerStats(userItem);


        const avatarUrl = userItem.creator_profile?.profile_image?.path || userItem.brand_profile?.profile_image?.path || userItem.community_profile?.profile_image?.path;
        const profileImageUrl = avatarUrl ? `${import.meta.env.VITE_ASSET_URL}/${avatarUrl}` : creator;

        return (
            <ListviewStyles key={id}>
                <AvatarSection className="avatar" avatar={profileImageUrl} size="7em" />
                <div className="list_content">
                    <Link to={`/${username}/profile`} style={{ textDecoration: "none" }}>
                        <Text c="white" size="xl">
                            {username}
                        </Text>
                    </Link>


                    <Group className="mb-1 mt-1">
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

                <div className="levels flex flex-col items-center">
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

                <div className="action_btns">
                    <FollowButton
                        targetUserId={id}
                        width="6.25em"
                    />

                    <Button w="6.25em" variant="primary">
                        sponsor
                    </Button>
                </div>
            </ListviewStyles>
        )
    })


}