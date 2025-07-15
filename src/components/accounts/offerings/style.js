import styled from "styled-components";
import { theme } from "./../../../styles/theme/customTheme";

export const OpportunityBlock = styled.div`
  width: 100%;

  .opportunityHeader {
    width: 40%;
    display: flex;
    align-items: flex-start;
    gap: 3.5rem;
    margin-bottom: 2.5rem;

    .opportunityTitle {
      display: flex;
      align-items: flex-start;
      gap: 2rem;
    }
  }

  input {
    background-color: ${theme.colors.grey[0]} !important;
  }
`;
