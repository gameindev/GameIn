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
import { Link } from "react-router";
import ProfileMediaUrls from "./../../utils/helpers/useProfileMediaUrl";
import { USERTYPES } from "../../utils/enum";
import FollowButton from "../shared/ui/FollowButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

const UserProfileBanner = ({ userProfile, isSelf }) => {
    if (!userProfile) return null;

    const { avatarUrl, coverImageUrl } = ProfileMediaUrls(userProfile);

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
                                <Button variant="secondary" size="xs">
                                    Edit Profile
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="interaction">
                                    <Link to={`/inbox`}>
                                        <ActionIcon size="lg" color="inputBgColor" variant="filled">
                                            <Text size="xs"><FontAwesomeIcon icon={faMessage} /></Text>
                                        </ActionIcon>
                                    </Link>
                                </div>
                                <div className="actions">
                                    <FollowButton
                                        targetUserId={userProfile.id}
                                        onChange={(newStatus) =>
                                            console.log("Followed:", newStatus)
                                        }
                                    />
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
};

export default UserProfileBanner;
