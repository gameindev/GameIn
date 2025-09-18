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

export default function Accounts() {
  const { id } = useParams();
  const { user } = useSelector(currentUser);
  const { get } = useApi();

  const [profileOwner, setProfileOwner] = useState(null);

  const isSelf = !id || Number(user?.id) === Number(id);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!id || isSelf) return;

    const fetchUserData = async () => {
      try {
        const data = await getUserProfile(get, id);
        setProfileOwner(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id, isSelf]);

  let tabLists = roleBasedTabs.self;

  if (!isSelf && profileOwner?.user_type) {
    if (profileOwner.user_type === USERTYPES.CREATOR) {
      tabLists = roleBasedTabs.otherCreator(id);
    }
    if (profileOwner.user_type === USERTYPES.BRAND) {
      tabLists = roleBasedTabs.otherBrand(id);
    }
    if (profileOwner.user_type === USERTYPES.COMMUNITY) {
      tabLists = roleBasedTabs.otherCommunity(id);
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
