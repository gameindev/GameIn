import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme/customTheme";
import { Group, SegmentedControl, Text } from "@mantine/core";
import { LayoutGrid, List, Table } from "lucide-react";

const SectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header {
    display: flex;
    align-items: center;
    gap: 1.563rem;

    span {
      display: inline-flex;
      color: ${theme.colors.primary[0]};
    }

    .header_icon {
      display: flex;
      align-items: center;
    }

    .header_text {
      font-size: 1.563rem;
      font-weight: 400;
      line-height: 1.4;
      letter-spacing: 0.2em;
      color: ${theme.colors.primary[0]};
    }
  }
`;

const SectionControl = styled.div``;

export default function SectionHeader({ icon, text, $controls }) {
  const [viewMode, setViewMode] = useState("cards");

  const iconProps = {
    style: { display: "block" },
    size: 14,
  };

  return (
    <SectionWrapper>
      <Group className="header">
        <div className="header_icon">
          <span>{icon}</span>
        </div>
        <div className="header_text">
          <span>{text}</span>
        </div>
      </Group>
      {$controls && (
        <SectionControl className="section_controls">
          <Group className="visible_row"></Group>
          <Group className="segmentControl">
            <Text>Select View</Text>
            <SegmentedControl
              withItemsBorders={false}
              value={viewMode}
              onChange={(value) => setViewMode(value)}
              data={[
                { label: <LayoutGrid {...iconProps} />, value: "cards" },
                { label: <List {...iconProps} />, value: "list" },
                { label: <Table {...iconProps} />, value: "table" },
              ]}
            />
          </Group>
        </SectionControl>
      )}
    </SectionWrapper>
  );
}
