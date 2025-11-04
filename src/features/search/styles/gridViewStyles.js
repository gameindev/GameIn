import styled from "styled-components";
import { theme } from "../../../shared/styles/theme/customTheme";

export const GridStyles = styled.div`
    padding: 2em;
    background-color: ${theme.colors.secondaryGrey[0]};
    border-radius: ${theme.radius.md};
    display: flex;
    flex-direction: column;
    gap: ${theme.gap.xs};

    .avatar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .title {
        display: flex;
        flex-direction: column;
        gap: ${theme.gap.xxs};
        }
    }

    .information {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: ${theme.gap.xs};

        .social_info {
        display: flex;
        padding: 0 ${theme.gap.xs} 0 0;
        flex-direction: column;
        gap: ${theme.gap.xxs};

        .follwers_list {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: ${theme.gap.xs};
        }
        }

        .progress {
        border-left: 1px dashed ${theme.colors.inputBgColor[0]};
        border-right: 1px dashed ${theme.colors.inputBgColor[0]};
        display: flex;
        justify-content: center;
        }
    }
`;