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
        // justify-content: space-between;
        align-items: center;
        gap: ${theme.gap.md};

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
        // border-left: 1px dashed ${theme.colors.inputBgColor[0]};
        // border-right: 1px dashed ${theme.colors.inputBgColor[0]};
        display: flex;
        justify-content: center;
        }
    }

    .action_btns {
        width: 100%;
    }

    @media (max-width: 768px) {
        padding: 1rem;
        gap: 0.85rem;
        min-height: 100%;

        .avatar {
            gap: 0.85rem;
            align-items: center;
            flex-wrap: nowrap;
        }

        .avatar > .avatar {
            flex: 0 0 auto;
        }

        .avatar > .avatar > div {
            width: 4.75rem !important;
        }

        .avatar .title {
            min-width: 0;
            flex: 1;
        }

        .avatar .title .mantine-Text-root {
            overflow-wrap: anywhere;
        }

        .information {
            justify-content: space-between;
            gap: 0.75rem;
            padding: 0.75rem;
            border-radius: ${theme.radius.md};
            background: rgba(0,0,0,0.12);
        }

        .information > span {
            display: none;
        }

        .progress {
            flex: 1 1 8rem;
        }

        .levels {
            flex: 1 1 6rem;
            text-align: center;
        }

        .action_btns {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.65rem;
        }

        .action_btns .mantine-Button-root {
            width: 100% !important;
            min-width: 0;
        }

        & > .mantine-Group-root:last-child {
            position: static !important;
            justify-content: flex-end;
            margin-top: -0.25rem;
        }

        .mantine-ActionIcon-root {
            width: 2rem;
            height: 2rem;
            min-width: 2rem;
        }
    }

    @media (max-width: 420px) {
        .avatar {
            align-items: flex-start;
        }

        .information {
            align-items: center;
        }
    }
`;
