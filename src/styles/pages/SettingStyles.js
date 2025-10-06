import styled from "styled-components";
import { theme } from "../theme/customTheme";



export const SettingsWrap = styled.div`
    padding: ${theme.spacing.xl} 0 0;
`;

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