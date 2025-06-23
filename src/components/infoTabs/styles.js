import styled from "styled-components";
import { theme } from "../../styles/theme/customTheme";

export const Tabsection = styled.div`
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
