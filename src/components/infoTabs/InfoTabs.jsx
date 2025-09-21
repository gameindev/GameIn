import { Tabs } from "@mantine/core";
import { useNavigate, useLocation } from "react-router";
import { Tabsection } from "./styles";

export default function InfoTabs({ tabLists }) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab =
    tabLists.find((tab) => location.pathname.startsWith(tab.value))?.value ||
    tabLists[0]?.value;

  return (
    <Tabsection>
      <Tabs value={activeTab} onChange={(val) => navigate(val)} variant="none">
        <Tabs.List>
          {tabLists.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </Tabsection>
  );
}
