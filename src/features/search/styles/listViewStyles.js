import styled from "styled-components";
import { theme } from "../../../shared/styles/theme/customTheme";

export const ListviewStyles = styled.div`
    display: flex;
    align-items: center;
    padding: ${theme.spacing.sm};
    margin: ${theme.gap.md} 0;
    background-color: ${theme.colors.secondaryGrey[0]};
    gap: ${theme.gap.xs};

    .avatar {
        flex: 0 0 7.5rem;
        text-align: center;
    }

    .list_content {
        flex: 1 1 24rem;
        min-width: 0;
    }

    .list_metrics {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: ${theme.gap.xs};
        margin-left: auto;
        min-width: 0;
        flex-wrap: nowrap;
    }

    .list_metrics > span {
        flex: 0 0 auto;
    }

    .levels {
        // border-left: 1px dashed ${theme.colors.inputBgColor[0]};
        flex: 0 0 5.75rem;
        min-width: 5rem;
        gap: 0.1rem;
        text-align: center;
    }

    .level_label {
        color: #9aa3aa;
        letter-spacing: 0.08em;
        line-height: 1;
    }

    .followers_count {
        margin-top: 0.2rem;
        line-height: 1;
        letter-spacing: 0.02em;
    }

    .followers_label {
        color: #cfd5da;
        letter-spacing: 0.08em;
        line-height: 1;
    }

    .social_info {
        // border-right: 1px dashed ${theme.colors.inputBgColor[0]};
        flex: 0 0 8.75rem;
        display: flex;
        padding: 0 ${theme.gap.xs} 0 0;
        flex-direction: column;
        gap: ${theme.gap.sm};
        min-width: 8.75rem;
        text-align: center;

        .follwers_list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${theme.gap.xs};
        }
    }

    .offerings_panel {
        flex: 0 0 18rem;
        min-width: 18rem;
        text-align: left;
        padding-right: ${theme.gap.xs};
    }

    .offering_carousel {
        width: 100%;
    }

    .offering_shell {
        width: 100%;
        background: rgba(255, 255, 255, 0.015);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 6px;
        padding: 0.55rem 0.65rem 0.55rem 0.65rem;
    }

    .offering_nav_header {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        margin-bottom: 0.25rem;
    }

    .offering_slide {
        background: transparent;
        border: 0;
        border-radius: 0;
        padding: 0.05rem 0;
        min-height: 4.25rem;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 0.75rem;
    }

    .offering_caption {
        letter-spacing: 0.08em;
        color: #9aa3aa;
        line-height: 1;
    }

    .offering_nav {
        display: flex;
        align-items: center;
        gap: 0.22rem;
        width: 100%;
        max-width: 8rem;
    }

    .offering_nav_btn {
        width: 0.85rem;
        height: 0.85rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        padding: 0;
        background: transparent;
        color: #a6adb4;
        cursor: pointer;
    }

    .offering_nav_btn:hover {
        color: #d2d7dc;
    }

    .offering_bullets {
        display: flex;
        align-items: center;
        gap: 0.12rem;
        flex: 1;
    }

    .offering_bullet {
        flex: 1;
        height: 2px;
        border: 0;
        padding: 0;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.16);
        cursor: pointer;
    }

    .offering_bullet.is-active {
        background: ${theme.colors.primary[0]};
    }

    .offering_left {
        flex: 1;
        min-width: 0;
    }

    .offering_title_row {
        display: flex;
        align-items: center;
        gap: 0.28rem;
        min-width: 0;
        margin-bottom: 0.3rem;
    }

    .offering_title {
        line-height: 1.2;
        font-size: 0.67rem;
        flex: 1;
        min-width: 0;
    }

    .offering_info_btn {
        width: 0.78rem;
        height: 0.78rem;
        border-radius: 999px;
        border: 0;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.12);
        color: #cfd5da;
        font-size: 0.55rem;
        font-weight: 700;
        line-height: 1;
        cursor: pointer;
        flex: 0 0 auto;
    }

    .offering_info_btn:hover {
        background: rgba(255, 255, 255, 0.2);
        color: #ffffff;
    }

    .offering_meta_row {
        display: flex;
        align-items: center;
        gap: 0.32rem;
        min-width: 0;
        margin-top: 0.06rem;
    }

    .offering_meta_label {
        min-width: 2.95rem;
        color: #979fa7;
        line-height: 1.1;
    }

    .offering_meta_value {
        min-width: 0;
        color: ${theme.colors.secondary[0]};
        line-height: 1.1;
    }

    .offering_right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex: 0 0 auto;
        padding-left: 0.35rem;
    }

    .offering_price {
        color: ${theme.colors.secondary[0]};
        white-space: nowrap;
        line-height: 1;
        font-size: 1.8rem;
    }

    .offerings_empty {
        min-height: 6.6rem;
        border: 1px dashed rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.65rem;
    }

    .offerings_empty,
    .offering_shell {
        min-height: 6.2rem;
    }

    .action_btns {
        flex: 0 0 6.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: end;
        gap: 1em;
    }

    @media (max-width: 1280px) {
        flex-wrap: wrap;
        align-items: flex-start;

        .list_content {
            flex: 1 1 calc(100% - 9rem);
        }

        .list_metrics {
            flex: 1 0 100%;
            justify-content: flex-end;
        }
    }

    @media (max-width: 920px) {
        .list_metrics {
            align-items: stretch;
            justify-content: space-between;
            gap: ${theme.gap.sm};
            flex-wrap: wrap;
        }

        .list_metrics > span {
            display: none;
        }

        .levels,
        .social_info,
        .action_btns {
            flex: 1 1 0;
        }

        .offerings_panel {
            flex: 1 1 100%;
            min-width: 0;
            padding-right: 0;
        }

        .action_btns {
            align-items: flex-end;
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        padding: 1rem;
        border-radius: ${theme.radius.md};
        gap: 0.85rem;

        .avatar {
            flex: 0 0 auto;
            align-self: center;
        }

        .avatar > div > div {
            width: 5.75rem !important;
        }

        .list_content {
            flex: 0 0 auto;
            text-align: center;
        }

        .list_content .mantine-Text-root {
            overflow-wrap: anywhere;
        }

        .list_content .mantine-Group-root {
            justify-content: center;
        }

        .list_metrics {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            margin-left: 0;
            gap: 0.85rem;
        }

        .levels,
        .social_info,
        .offerings_panel,
        .action_btns {
            flex: 0 0 auto;
            width: 100%;
            min-width: 0;
        }

        .social_info {
            padding-right: 0;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.5rem;
            text-align: left;
        }

        .social_info .follwers_list {
            background: rgba(0,0,0,0.12);
            border-radius: ${theme.radius.md};
            padding: 0.55rem;
            min-width: 0;
            width: 100%;
        }

        .social_info .follwers_list > .mantine-Group-root {
            min-width: 0;
            gap: 0.35rem;
        }

        .social_info .follwers_list .mantine-Text-root {
            overflow-wrap: anywhere;
        }

        .offering_shell,
        .offerings_empty {
            min-height: 0;
        }

        .offering_slide {
            min-height: 0;
            align-items: center;
        }

        .offering_price {
            font-size: 1.25rem;
        }

        .action_btns {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr)) 2rem;
            justify-content: stretch;
            align-items: center;
            gap: 0.5rem;
        }

        .action_btns .mantine-Button-root {
            width: 100% !important;
            min-width: 0;
        }

        .action_btns .mantine-ActionIcon-root {
            width: 2rem;
            height: 2rem;
            min-width: 2rem;
        }
    }

    @media (max-width: 420px) {
        .social_info {
            grid-template-columns: minmax(0, 1fr);
        }

        .action_btns {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .action_btns .mantine-ActionIcon-root {
            justify-self: end;
        }
    }
`;
