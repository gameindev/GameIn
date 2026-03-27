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
`;

export const UserAvatar = styled.div`
    position: absolute;
    top: -6em;
    left: 1em;
    /* width: 10.625em;
    height: 11.875em; */
    overflow: hidden;

    .action {
        position: absolute;
        bottom: 0.5em;
        right: 1.5em;
    }
`;

export const ProfileWrapper = styled.div`
    margin-left: 12em;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1.5em;

    .personal_info {
        width: 80%;
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
`;

export const ActionWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.5em;

    .actions {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
`;

export const ModalStyle = styled.div`
.modal_sponsorslogo{
background: red;
}
`;
