import { Tabs } from "@mantine/core";
import { useNavigate, useLocation } from "react-router";
import { Tabsection } from "./styles";
import routePaths from "../../routes/endpoints";

const { dashboard, profile, sponsorships, offerings, stats, newsfeed, inbox } =
  routePaths;

const tabs = [
  { value: dashboard, label: "DASHBOARD" },
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
