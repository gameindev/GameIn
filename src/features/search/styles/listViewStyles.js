import styled from "styled-components";
import { theme } from "../../../shared/styles/theme/customTheme";

export const ListviewStyles = styled.div`
    display: flex;
    align-items: center;
    padding: ${theme.spacing.sm};
    margin: ${theme.gap.md} 0;
    background-color: ${theme.colors.secondaryGrey[0]};
    gap: ${theme.gap.xs};

    .avatar,
    .levels,
    .progress,
    .social_info,
    .action_btns {
        flex: 1;
        text-align: center;
    }

    .list_content {
        flex: 1 0 25%;
    }

    .levels {
        border-left: 1px dashed ${theme.colors.inputBgColor[0]};
    }

    .progress {
        border-left: 1px dashed ${theme.colors.inputBgColor[0]};
        border-right: 1px dashed ${theme.colors.inputBgColor[0]};
        display: flex;
        justify-content: center;
    }

    .social_info {
        border-right: 1px dashed ${theme.colors.inputBgColor[0]};
        display: flex;
        padding: 0 ${theme.gap.xs} 0 0;
        flex-direction: column;
        gap: ${theme.gap.xxs};

        .follwers_list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${theme.gap.xs};
        }
    }

    .action_btns {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: end;
        gap: 1em;
    }
`;