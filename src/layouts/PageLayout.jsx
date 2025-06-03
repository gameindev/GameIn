import UserProfileBanner from "./../components/userProfileBanner/index";
import InfoTabs from "../components/infoTabs/InfoTabs";
import { Outlet } from "react-router";
import { Box } from "@mantine/core";

export default function PageLayout() {
  return (
    <>
      <UserProfileBanner />
      <InfoTabs />
      <Box mt={40}>
        <Outlet />
      </Box>
    </>
  );
}
