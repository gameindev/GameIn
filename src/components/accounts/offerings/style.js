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
`;

export const OfferingOpportunities = styled.div`

  input,
  select {
    background-color: ${theme.colors.grey[0]} !important;
    color: ${theme.colors.text[0]} !important;
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }

  .mantine-Select-input,
  .mantine-NumberInput-input {
    padding-right: 2rem !important;
  }
`;
