import styled from "styled-components";
import { theme } from "../../../shared/styles/theme/customTheme";

export const OfferingCardContent = styled.div`
    min-height: 19rem;
    padding: 1.5rem 1.25rem 0.75rem;

    .offering-price {
        display: flex;
        align-items: flex-start;
        gap: 0.35rem;
        margin-bottom: 0.75rem;
        color: ${theme.colors.white[0]};
        line-height: 1;
    }

    .currency {
        margin-top: 0.2rem;
        font-size: 1.25rem;
        font-weight: 400;
    }

    .price-major {
        font-size: 1.75rem;
        font-weight: 800;
        letter-spacing: 0.02em;
    }

    .price-minor {
        margin-top: 0.15rem;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .price-changed {
        color: ${theme.colors.yellow[0]};
    }

    .offering-title {
        color: ${theme.colors.white[0]};
        font-size: 0.8rem;
        font-weight: 800;
        letter-spacing: 0.035em;
        line-height: 1.2;
        text-transform: uppercase;
    }

    .offering-description {
        margin-top: 0.15rem;
        color: ${theme.colors.text[0]};
        font-size: 0.68rem;
        font-weight: 400;
        line-height: 1.3;
    }

    .offering-label {
        margin: 1.1rem 0 0.45rem;
        color: ${theme.colors.primary[0]};
        font-size: 0.68rem;
        font-weight: 800;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .offering-list {
        color: ${theme.colors.text[0]};
        font-size: 0.68rem;
        line-height: 1.25;
        text-transform: uppercase;
    }

    .offering-list .mantine-List-itemWrapper {
        align-items: flex-start;
    }

    .offering-list .offer-type {
        color: ${theme.colors.white[0]};
        font-weight: 800;
    }

    @media (max-width: 48rem) {
        min-height: 17rem;
        padding: 1.25rem 0.75rem 0.5rem;
    }
`;

export const OpportunityCardContent = styled.div`
    display: flex;
    align-items: flex-start;
    min-height: 15rem;
    padding: 2.25rem 1rem 1rem;

    .add-symbol {
        margin-right: 0.25rem;
        color: ${theme.colors.white[0]};
        font-size: 3.5rem;
        font-weight: 300;
        line-height: 0.8;
    }

    .add-label {
        color: ${theme.colors.white[0]};
        font-size: 0.9rem;
        line-height: 1;
        text-transform: lowercase;
    }

    .opportunity-title {
        color: ${theme.colors.primary[0]};
        font-size: clamp(1.75rem, 2.5vw, 2.25rem);
        font-weight: 800;
        letter-spacing: 0.01em;
        line-height: 0.9;
        text-transform: lowercase;
    }

    .start-button {
        margin-top: 1.25rem;
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: lowercase;
    }
`;
