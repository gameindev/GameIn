import styled from "styled-components";
import { rgba } from "@mantine/core";
import { theme } from "../../../../shared/styles/theme/customTheme";

export const ImageWrapper = styled.div`
    width: 100%;
    height: 11em;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    position: relative;
    border-radius: ${theme.radius.md};
`;

export const PlayIcon = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    width: 3em;
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5em;
`;

export const VideoWrapper = styled.div`
    iframe,
    video {
        border-radius: ${theme.radius.md};
        width: 100%;
        height: 11em;
        object-fit: cover;
    }
`;

export const SponsorCardContent = styled.div`
    position: relative;
    min-height: 18rem;
    overflow: hidden;
    color: ${theme.colors.white[0]};

    .content {
        position: relative;
        z-index: 1;
        width: 100%;
        margin-top: 1.75rem;
    }

    h2 {
        color: ${theme.colors.white[0]};
        font-size: clamp(1.55rem, 2.3vw, 2rem);
        font-weight: 800;
        line-height: 1;
        text-transform: uppercase;
    }

    .accent {
        display: block;
        width: 2.5rem;
        height: 0.15rem;
        margin: 0.8rem 0 1.25rem;
        background: ${theme.colors.white[0]};
    }

    .tagline {
        margin-bottom: 0.8rem;
        color: ${theme.colors.white[0]} !important;
        font-size: 0.82rem;
        font-weight: 700;
    }

    .description {
        color: ${theme.colors.white[0]} !important;
        font-size: 0.75rem;
        line-height: 1.45;
        font-weight: 300;
    }

    .search-button {
        min-width: 6rem;
        margin-top: 1.2rem;
        color: ${theme.colors.white[0]};
        font-weight: 700;
        text-transform: lowercase;
    }

    .illustration {
        position: absolute;
        right: 0.7rem;
        bottom: 1rem;
        width: 38%;
        height: auto;
    }

    @media (max-width: 48rem) {
        min-height: 20rem;

        .content {
            width: 82%;
        }
    }
`;
