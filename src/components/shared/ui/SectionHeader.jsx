import styled from "styled-components";
import { theme } from "../../../styles/theme/customTheme";

const SectionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.563em;

  span {
    display: inline-flex;
    color: ${theme.colors.primary[0]};
  }

  .header_icon {
    display: flex;
    align-items: center;
  }

  .header_text {
    font-size: 1.563em;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.2em;
    color: ${theme.colors.primary[0]};
  }
`;

export default function SectionHeader({ icon, text }) {
  return (
      <SectionWrapper className="header">
        <div className="header_icon">
          <span>{icon}</span>
        </div>
        <div className="header_text">
          <span>{text}</span>
        </div>
      </SectionWrapper>
  );
}
