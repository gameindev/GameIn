import styled from "styled-components";
import { theme } from "../../../shared/styles/theme/customTheme";

export const SettingsCard = styled.div`
    background: ${theme.colors.darkGrey[0]};
    border-radius: ${theme.radius.sm};
    padding: ${theme.spacing.lg} ;
    margin-bottom: ${theme.spacing.md};

    .mantine-Grid-col{
        width: auto !important;
        min-height: auto !important;
    }

    .title{
        display: flex;
        align-items: center;
        gap: ${theme.spacing.sm};
        margin-bottom: ${theme.spacing.md};

        .icon{
            height: 1.5em;
        }
    }

    .mantine-TextInput-label{
        text-transform: capitalize !important;
    }
`;


export const SettingsWrap = styled.div`
    padding: ${theme.spacing.xl} 0 0;
`;



export const IntegrationsCard = styled.div`
    display: flex;
    gap: ${theme.spacing.md};
    align-items: center;
    background: #6a6d7436;
    border-radius: ${theme.radius.md};
    padding: ${theme.spacing.sm} ;

    .connect_btn{
        margin-left: auto;
    }
`



export const PrivacyRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75em 0;
    border-bottom: 1px solid ${theme.colors.grey[0]};

    &:last-child {
        border-bottom: none;
    }

    .details {
        display: flex;
        flex-direction: column;
    }

    .title {
        color: ${theme.colors.white[0]} !important;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }

    .desc {
        color: ${theme.colors.text[0]};
        font-size: ${theme.fontSizes.sm};
        opacity: 0.8;
    }
`;



export const BalanceCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25em 1.25em;
    border-radius: ${theme.radius.sm};
    background: ${theme.colors.primary[0]}20; /* translucent green */
    border: 1px solid ${theme.colors.primary[0]}55;

    .left {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.md};
    }

    .amount {
        font-size: 2em;
        font-weight: 700;
        color: ${theme.colors.textWhite};
    }

    .sub {
        color: ${theme.colors.text[0]};
    }
`;