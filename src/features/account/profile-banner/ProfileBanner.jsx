import {
    ActionWrapper,
    BannerWrapper,
    ProfileWrapper,
    UserAvatar,
    UserInformation,
} from "./styles/style";
import profileMediaUrlsHelper from "../../../shared/utils/helpers/useProfileMediaUrl.helper";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import ProfileAvatar from "../../../shared/components/ProfileAvatar";
import CoverBanner from "../../../shared/components/CoverBanner";
import UserInfo from "./components/UserInfo";
import StatsSection from "./components/StatsSection";
import LevelBadge from "./components/LevelBadge";
import SponsorshipSection from "./components/SponsorshipSection";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router";
import IconButton from "../../../shared/components/IconButton";
import { IconMessage } from "@tabler/icons-react";
import FollowButton from "../../../shared/components/FollowButton";
import Separator from "../../../shared/components/Separator";
import routePaths from "../../../app/router/routes";
import routeService from "../../../app/services/route/routeService";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";

export default function ProfileBanner({ userProfile, isSelf }) {
    if (!userProfile) return null;
    const navigate = useNavigate();
    const user = useAppSelector(currentUser);

    const { coverImageUrl } = profileMediaUrlsHelper(userProfile);
    // console.log(userProfile)
    const { user_type, creator_profile, brand_profile, community_profile } =
        userProfile;

    const profile =
        user_type === USERTYPES.CREATOR
            ? creator_profile
            : user_type === USERTYPES.BRAND
                ? brand_profile
                : community_profile;

    const certificationLevel = Math.min(
        6,
        Math.max(1, Math.round(Number(profile?.rank) || 1)),
    );
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
                    <ProfileAvatar
                        user={userProfile}
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
                    <Separator size="3.5em" />
                    <LevelBadge level={certificationLevel} />
                    <Separator size="3.5em" />
                    <SponsorshipSection
                        sponsors={userProfile?.sponsors || []}
                        userProfile={userProfile}
                        isSelf={isSelf}
                    />
                    <Separator size="3.5em" />

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
                                <div className="interaction">
                                    <IconButton
                                        Icon={IconMessage}
                                        hoverClass="hoverGrey"
                                        onClick={() =>
                                            routeService.messageRoute(userProfile.id, navigate, user)
                                        }
                                    />
                                </div>
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
