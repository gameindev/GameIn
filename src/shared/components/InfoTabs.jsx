import { Tabs } from "@mantine/core";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { theme } from "../styles/theme/customTheme";

const Tabsection = styled.div`
  position: relative;
  background-color: ${theme.colors.secondaryGrey[0]};
  border-radius: ${theme.radius.md};
  margin-top: 0.625em;
  padding: 1em 0.5em;

  button span {
    font-size: ${theme.fontSizes.sm};
    font-weight: 600;
  }

  button[data-active] span {
    position: relative;
    color: ${theme.colors.primary[0]};

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.5em;
      width: 100%;
      height: 0.125em;
      border-radius: 50em;
      background: ${theme.colors.primary[0]};
    }
  }
`;

export default function InfoTabs({ tabLists }) {
  const navigate = useNavigate();
  const location = useLocation();

  const hasOffering = tabLists.some((tab) => tab?.value === "/offerings");

  const matchedTab = tabLists.find((tab) =>
    location.pathname.startsWith(tab.value)
  )?.value;

  const activeTab = location.pathname.startsWith("/offerings")
    ? hasOffering
      ? "/offerings"
      : "/stats"
    : matchedTab || tabLists[0]?.value;

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
