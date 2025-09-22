import UserProfileBanner from "../../components/userProfileBanner";
import InfoTabs from "../../components/infoTabs/InfoTabs";
import { Outlet, useParams } from "react-router";
import { Box } from "@mantine/core";
import { useSelector } from "react-redux";
import { currentUser } from "../../stores/selectors";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { getUserProfile } from "../../services/users";
import { roleBasedTabs } from "../../config/mappers/tabsMappers";
import { USERTYPES } from "../../utils/enum";
import Preloader from "../../components/shared/ui/Preloader";

export default function Accounts() {
  const { username } = useParams();
  const { user } = useSelector(currentUser);
  const { get } = useApi();

  const [profileOwner, setProfileOwner] = useState(null);

  const isSelf =
    (!username && user) ||
    user?.username?.toLowerCase() === username?.toLowerCase();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!username || username === user?.username) return;

    const fetchUserData = async () => {
      try {
        const data = await getUserProfile(get, username);
        setProfileOwner(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username, user?.username]);

  if (!isSelf && !profileOwner) return <Preloader />;

  let tabLists = roleBasedTabs.self;

  if (!isSelf && profileOwner?.user_type) {
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
    }
  }

  return (
    <>
      <UserProfileBanner
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
  );
}
