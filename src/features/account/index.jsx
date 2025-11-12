import { Box } from "@mantine/core";
import { Outlet, useParams } from "react-router";
import { currentUser, isLoggedIn } from "../auth/store/selector";
import { useAppSelector } from "../../app/store/hooks";
import useApi from "../../shared/hooks/useApi";
import { useEffect, useState } from "react";
import { roleBasedTabs } from "./types/tabs.mapper";
import { USERTYPES } from "../../shared/enums/userTypesEnum";
import { getUserProfile } from "../../app/services/user/fetch-user-data.service";
import { getAccessToken } from "../../app/services/token";
import ProfileBanner from "./profile-banner/ProfileBanner";
import InfoTabs from "../../shared/components/InfoTabs";
import Preloader from "../../shared/components/Preloader";
import VerifyEmailBanner from "../../shared/components/VerifyEmailBanner";


const Account = () => {

    const { username } = useParams();
    const user = useAppSelector(currentUser);
    const { get } = useApi();
    
    const [profileOwner, setProfileOwner] = useState(null);
    
    const isSelf =
        (!username && user) ||
        user?.username?.toLowerCase() === username?.toLowerCase();
    
    useEffect(() => {
        window.scrollTo(0, 0);

        if (!username || username === user?.username) {
            setProfileOwner(null);
            return;
        }
        
        let cancelled = false;
        
        const fetchUserProfile = async () => {
            try {
                const accessToken = getAccessToken();
                const userType = user?.user_type;
                const data = await getUserProfile(get, username, accessToken, userType);
                if (!cancelled && data) {
                    setProfileOwner(data);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("Error fetching user profile:", error);
                }
            }
        };
        
        fetchUserProfile();
        
        return () => {
            cancelled = true;
        };
    }, [username, user?.username, user?.user_type]); 


    if (!isSelf && !profileOwner) return <Preloader />;

    let tabLists = [];


    if (isSelf) {
        tabLists = roleBasedTabs.self.filter(
            (tab) =>
                !(tab.label === "OFFERINGS" && user?.user_type === USERTYPES.BRAND)
        );
    } else if (profileOwner?.user_type) {
        switch (profileOwner.user_type) {
            case USERTYPES.CREATOR:
                tabLists = roleBasedTabs.otherCreator(username);
                break;
            case USERTYPES.BRAND:
                tabLists = roleBasedTabs.otherBrand(username);
                break;
            case USERTYPES.COMMUNITY:
                tabLists = roleBasedTabs.otherCommunity(username);
                break;
            default:
                tabLists = [];
        }
    }

    return (
        <>
            {isSelf && <VerifyEmailBanner />}
            <ProfileBanner
                userProfile={isSelf ? user : profileOwner}
                isSelf={isSelf}
            />
            <InfoTabs tabLists={tabLists} />
            <Box mt={40}>
                <Outlet
                    context={{ userProfile: !isSelf ? profileOwner : user, isSelf }}
                />
            </Box>
        </>
    )
}

export default Account;
