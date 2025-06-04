import { Tabs } from "@mantine/core";
import { useNavigate, useLocation } from "react-router";
import { Tabsection } from "./styles";
import routePaths from "../../routes/endpoints";

const { dashboard: { base, profile, sponsorships, offerings, stats, newsfeed, inbox} } = routePaths

const tabs = [
  { value: base, label: "DASHBOARD" },
  { value: profile, label: "PROFILE" },
  { value: sponsorships, label: "SPONSORSHIPS" },
  { value: offerings, label: "OFFERINGS" },
  { value: stats, label: "STATS" },
  { value: newsfeed, label: "NEWSFEED" },
  { value: inbox, label: "INBOX" },
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
