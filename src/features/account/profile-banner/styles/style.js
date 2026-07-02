import styled from "styled-components";
import { theme } from "../../../../shared/styles/theme/customTheme";

export const BannerWrapper = styled.div`
    width: 100%;
    background-color: #1f2937;
    border-radius: ${theme.radius.md};
    overflow: hidden;
    /* box-shadow: 0 0.25em 0.75em rgba(0, 0, 0, 0.3); */
`;

export const UserInformation = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 1.25em;
    background-color: ${theme.colors.secondaryGrey[0]};
    color: white;

    @media (max-width: 768px) {
        align-items: flex-start;
        padding: 0 1.25em 1.25em;
        gap: 1.125em;
        flex-wrap: nowrap;
    }

    @media (max-width: 560px) {
        display: block;
        padding: 3.7em 1em 1em;
    }
`;

export const UserAvatar = styled.div`
    position: absolute;
    top: -6em;
    left: 1em;
    /* width: 10.625em;
    height: 11.875em; */
    overflow: visible;

    .action {
        position: absolute;
        bottom: 0.5em;
        right: 1.5em;

        .mantine-ActionIcon-root {
            width: 2.25rem;
            height: 2.25rem;
            min-width: 2.25rem;
        }

        .mantine-ActionIcon-root img,
        .mantine-ActionIcon-root svg {
            width: 0.9rem;
            height: 0.9rem;
        }
    }

    @media (max-width: 768px) {
        position: relative;
        top: auto;
        left: auto;
        margin-top: -4.35em;
        flex: 0 0 auto;

        & > div > div {
            width: 7.5em !important;
        }

        .action {
            left: 70%;
            bottom: 0.35em;
        }

        .action .mantine-ActionIcon-root {
           width: 1.25rem;
        height: 1.25rem;
        min-width: 1.25rem;
        min-height: 1.25rem;
        }

        .action .mantine-ActionIcon-root img,
        .action .mantine-ActionIcon-root svg {
            width: 0.5rem;
            height: 0.5rem;
        }
    }

    @media (max-width: 560px) {
        position: absolute;
        top: -3.15em;
        left: 1em;
        margin-top: 0;

        & > div > div {
            width: 5.75em !important;
        }

        .action {
            right: 0.25em;
            bottom: 0.15em;
            left: auto;
        }
    }

    @media (max-width: 380px) {
        & > div > div {
            width: 6.25em !important;
        }

        .action {
            right: 0.2em;
            bottom: 0.15em;
        }
    }
`;

export const ProfileWrapper = styled.div`
    margin-left: 12em;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1.5em;
    min-width: 0;

    .personal_info {
        flex: 1 1 18em;
        min-width: 0;
    }

    .level_section {
        flex: 0 0 auto;
    }

    .sponsor_section {
        flex: 1 1 12em;
        min-width: 10em;
    }

    @media (max-width: 1180px) {
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 1em;

        .personal_info {
            width: auto;
            flex: 1 1 18em;
            min-width: 0;
        }
    }

    @media (max-width: 768px) {
        margin-left: 0;
        width: auto;
        min-width: 0;
        flex: 1 1 0;
        align-items: flex-start;
        align-content: flex-start;
        gap: 0.85em 1.125em;

        .personal_info {
            width: 100%;
            flex: 1 1 100%;
            min-width: 0;
        }

        & > span {
            display: none;
        }

        .level_section {
            order: 2;
        }

        .sponsor_section {
            order: 3;
            flex: 1 1 11em;
            min-width: 0;
        }
    }

    @media (max-width: 560px) {
        display: grid;
        position: relative;
        grid-template-columns: minmax(0, 1fr);
        grid-template-areas:
            "personal"
            "level"
            "sponsor";
        gap: 0.75em;
        width: 100%;

        .personal_info {
            grid-area: personal;
            min-width: 0;
        }

        .level_section {
            grid-area: level;
            align-self: flex-end;
        }

        .sponsor_section {
            grid-area: sponsor;
            min-width: 0;
            align-self: center;
        }
    }
`;

export const UserSection = styled.div`
    .user_info {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1.875em;
        margin-bottom: 0.5em;
    }

    .profile_name {
        font-size: 1.875em;
        font-weight: 600;
        line-height: 1.2;
        letter-spacing: 0.02em;
        color: ${theme.colors.white[0]};
    }

    .profile_info {
        font-size: 0.875em;
        color: #a0aec0;
        display: flex;
        align-items: center;
        gap: 1em;
        flex-wrap: wrap;
    }

    @media (max-width: 768px) {
        .user_info {
            align-items: flex-start;
            gap: 0.35em 0.75em;
            flex-direction: column;
        }

        .profile_name {
            font-size: 1.5em;
        }

        .profile_info {
            gap: 0.6em;
        }
    }

    @media (max-width: 560px) {
        .user_info {
            margin-bottom: 0.45em;
            align-items: flex-start;
        }

        .profile_name {
            font-size: 1.55em;
            word-break: break-word;
        }

        .profile_info {
            gap: 0.65em;
        }
    }
`;

export const ProfileStats = styled.div`
    .profile_stats {
        display: flex;
        justify-content: flex-start;
        gap: 1.25em;
        color: white;

        .stats_section {
            text-align: center;
            display: flex;
            align-items: center;

            .views,
            .followers,
            .joined {
                font-size: 0.625em;
                margin: 0 0.5em 0 0.5em;
                font-weight: 800;
                line-height: 1.2;
            }

            .helperText {
                font-size: 0.625em;
                font-weight: 400;
                color: #a0aec0;
                text-transform: uppercase;
            }
        }
    }

    @media (max-width: 768px) {
        .profile_stats {
            gap: 0.55em 0.8em;
            flex-wrap: wrap;

            .stats_section {
                text-align: left;
                min-width: max-content;
            }
        }
    }

    @media (max-width: 560px) {
        .profile_stats {
            gap: 0.45em 0.75em;
            align-items: center;

            .stats_section {
                line-height: 1;

                .views,
                .followers,
                .joined {
                    margin: 0 0.35em;
                }
            }
        }
    }
`;

export const BadgeSection = styled.div`
    .levels {
        /* flex: 1; */
        display: flex;
        align-items: center;
        padding: 0 1.25em;

        svg text {
        font-family: ${theme.fontFamily};
        }
    }

    @media (max-width: 768px) {
        .levels {
            padding: 0;
        }
    }

    @media (max-width: 560px) {
        .levels {
            justify-content: flex-start;
            transform: scale(0.82);
            transform-origin: left center;
        }
    }
`;

export const SponsorShip = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    gap: 0.5em;
    font-size: 0.875em;
    color: #a0aec0;
    padding: 0.5em 0.75em;
    margin-right: auto;

    .sponsorship_text {
        font-size: 0.625em;
        font-weight: 400;
        text-transform: uppercase;
    }

    .sponsorship_tracker {
        display: flex;
        align-items: center;
        gap: 0.5em;
        flex-wrap: wrap;
    }

    .sponsor_logo {
        height: 1.75em;
        width: auto;
        object-fit: contain;
    }

    .sponsorship_badge {
        background-color: #2b6cb0;
        color: white;
        padding: 0.25em 0.5em;
        border-radius: 0.25em;
        font-size: 0.75em;
    }
    
    .sponsorslogo {
        img{
        //     transform: scale(0.8);
        // object-fit: contain !important;
        // clip-path: initial !important;
        }
    }

    @media (max-width: 768px) {
        padding: 0;
        gap: 0.35em;

        .sponsorship_tracker {
            gap: 0.4em;
        }

        .sponsorslogo > .hex_container {
            width: 3rem !important;
            height: 3rem !important;
        }

        .sponsorslogo .online-indicator {
            right: 0;
            bottom: 0.25rem;
            width: 0.5rem;
            height: 0.5rem;
            border: 0.125rem solid ${theme.colors.secondaryGrey[0]};
            box-sizing: content-box;
        }
    }

    @media (max-width: 560px) {
        justify-content: flex-start;
        min-height: auto;
        padding: 0;

        .sponsorship_text,
        .sponsorship_tracker {
            width: 100%;
            text-align: left;
            justify-content: flex-start;
        }
    }
`;

export const ActionWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.5em;
    flex: 0 0 auto;

    .actions {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    @media (max-width: 768px) {
        order: 4;
        width: auto;

        .actions {
            width: auto;
        }

        .actions button {
            width: auto;
            min-width: 9.5em;
        }
    }

    @media (max-width: 560px) {
        position: absolute;
        top: -2.65em;
        right: 0;
        width: auto;
        justify-content: flex-end;

        .actions {
            width: auto;
        }

        .actions button {
            width: auto;
            min-width: 0;
            min-height: 2.25em;
            padding: 0.4em 1.2em;
            border-radius: 999px;
            font-size: 0.8em;
            line-height: 1.1;
        }

        .actions button .mantine-Button-label {
            font-size: 1.1em;
            line-height: 1.1;
        }
    }
`;

export const ProfileContextWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    @media screen and (max-width: 575px){
        flex-wrap: wrap;
        row-gap: 1rem;
        .personal_info{
            width: 70%;
            flex: 1 1 70%;
        }

        .level_section{
            width: 30%;
            flex: 1 1 30%;
        }

        .sponsor_section{
            width: 100%;
        }

        .separator{
            display: none;
        }
    }
`;

export const ModalStyle = styled.div`
.modal_sponsorslogo{
background: red;
}
`;
