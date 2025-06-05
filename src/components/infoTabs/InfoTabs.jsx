import { Tabs } from "@mantine/core";
import { useNavigate, useLocation } from "react-router";
import { Tabsection } from "./styles";
import routePaths from "../../routes/endpoints";

const tabs = [
  { value: routePaths.dashboard, label: "DASHBOARD" },
  { value: routePaths.profile, label: "PROFILE" },
  { value: routePaths.sponsorships, label: "SPONSORSHIPS" },
  { value: routePaths.offerings, label: "OFFERINGS" },
  { value: routePaths.stats, label: "STATS" },
  { value: routePaths.newsfeed, label: "NEWSFEED" },
  { value: routePaths.inbox, label: "INBOX" },
];

export default function InfoTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();

  return (
    <Tabsection>
      <Tabs
        value={currentPath}
        onChange={(val) => navigate(val)}
        variant="none"
      >
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </Tabsection>
  );
}
