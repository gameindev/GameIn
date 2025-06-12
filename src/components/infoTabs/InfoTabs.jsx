import { Tabs } from "@mantine/core";
import { useNavigate, useLocation } from "react-router";
import { Tabsection } from "./styles";
import routePaths from "../../routes/endpoints";

const tabs = [
  { value: routePaths.DASHBOARD.ROOT, label: "DASHBOARD" },
  { value: routePaths.PROFILE.ROOT, label: "PROFILE" },
  { value: routePaths.SPONSORSHIPS.ROOT, label: "SPONSORSHIPS" },
  { value: routePaths.OFFERINGS.ROOT, label: "OFFERINGS" },
  { value: routePaths.STATS.ROOT, label: "STATS" },
  { value: routePaths.NEWSFEED.ROOT, label: "NEWSFEED" },
  { value: routePaths.INBOX.ROOT, label: "INBOX" },
];

export default function InfoTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.split("/")[1];

  return (
    <Tabsection>
      <Tabs
        value={currentPath}
        onChange={(val) => navigate(`/${val}`)}
        variant="none"
      >
        <Tabs.List>
          {tabs.map((tab) => {
            const tabValue = tab.value.replace("/", "");
            return (
              <Tabs.Tab key={tabValue} value={tabValue}>
                {tab.label}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>
      </Tabs>
    </Tabsection>
  );
}
