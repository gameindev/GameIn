import { Tabs } from "@mantine/core";
import { useNavigate, useLocation } from "react-router";
import { Tabsection } from "./styles";

export default function InfoTabs({ tabLists }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Tabsection>
      <Tabs
        value={location.pathname}
        onChange={(val) => navigate(val)}
        variant="none"
      >
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
