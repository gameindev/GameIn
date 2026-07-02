import styled from "styled-components";
import { theme } from "../../../shared/styles/theme/customTheme";

export const AddPostContent = styled.div`
    display: flex;
    align-items: flex-start;
    min-height: 15rem;
    padding: 2.25rem 1rem 1rem;

    .add-symbol {
        margin-right: 0.25rem;
        color: ${theme.colors.white[0]};
        font-size: 3.5rem;
        font-weight: 300;
        line-height: 0.8;
    }

    .add-label {
        color: ${theme.colors.white[0]};
        font-size: 0.9rem;
        line-height: 1;
        text-transform: lowercase;
    }

    .post-title {
        color: ${theme.colors.primary[0]};
        font-size: clamp(1.75rem, 2.5vw, 2.25rem);
        font-weight: 800;
        letter-spacing: 0.01em;
        line-height: 0.9;
        text-transform: lowercase;
    }

    .add-post-button {
        margin-top: 1.25rem;
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: lowercase;
    }
`;
