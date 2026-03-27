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
    .offerings_panel,
    .action_btns {
        flex: 0.75;
        text-align: center;
    }

    .list_content {
        flex: 1 0 25%;
    }

    .levels {
        // border-left: 1px dashed ${theme.colors.inputBgColor[0]};
    }

    .progress {
        // border-left: 1px dashed ${theme.colors.inputBgColor[0]};
        // border-right: 1px dashed ${theme.colors.inputBgColor[0]};
        display: flex;
        justify-content: center;
    }

    .social_info {
        // border-right: 1px dashed ${theme.colors.inputBgColor[0]};
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

    .offerings_panel {
        flex: 1.4;
        min-width: 17rem;
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: end;
        gap: 1em;
    }
`;
