import { Settings as SettingsIcon } from "lucide-react";
import SectionHeader from "../../components/shared/ui/SectionHeader";
import InfoTabs from "../../components/infoTabs/InfoTabs";
import routePaths from "../../routes/endpoints";
import { Box } from "@mantine/core";
import { Outlet } from "react-router";

const SettingsTab = [
  { value: routePaths.SETTINGS.ROOT, label: "GENERAL" },
  { value: routePaths.SETTINGS.ACCOUNT, label: "ACCOUNT" },
  { value: routePaths.SETTINGS.CONTACT, label: "CONTACT" },
  { value: routePaths.SETTINGS.PRIVACY, label: "PRIVACY" },
];

export default function Settings() {
  return (
    <>
        <SectionHeader icon={<SettingsIcon />} text={"GAMEIN"} />
        <InfoTabs tabLists={SettingsTab} />
        <Box><Outlet /></Box>
    </>
  )
}
