import styled from "styled-components";

const RatingCardSplitLayout = styled.div`
    display: flex;
    align-items: stretch;
    min-height: 13.5rem;
    padding: 0.35rem 0 0.15rem;

    .rating-score-panel,
    .rating-cta-panel {
        flex: 1 1 50%;
        min-width: 0;
    }

    .rating-score-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-right: 1rem;
    }

    .rating-status {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.58);
        line-height: 1.35;
    }

    .rating-divider {
        flex: 0 0 1px;
        align-self: stretch;
        margin: 0.35rem 0;
        border-left: 1px dotted rgba(255, 255, 255, 0.18);
    }

    .rating-cta-panel {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 1.35rem;
        padding-right: 0.25rem;
        overflow: visible;
    }

    .rating-score-panel--chart {
        padding-right: 0.5rem;
    }

    .rating-cta-title {
        font-size: 0.95rem;
        font-weight: 700;
        color: white;
        line-height: 1.35;
    }

    .rating-cta-copy {
        font-size: 0.78rem;
        color: rgba(255, 255, 255, 0.52);
        line-height: 1.55;
        max-width: 16rem;
    }

    .rating-cta-button {
        width: fit-content;
        margin-top: 0.65rem;
        background: rgba(0, 0, 0, 0.32) !important;
        border: 1px solid rgba(255, 255, 255, 0.14) !important;
        color: white !important;
        font-weight: 500;
        height: 2rem;
        padding-inline: 1rem;

        &:hover {
            background: rgba(255, 255, 255, 0.06) !important;
        }
    }

    @media (max-width: 640px) {
        flex-direction: column;
        gap: 1.1rem;
        min-height: 0;
        padding-bottom: 0.25rem;

        .rating-score-panel {
            padding-right: 0;
            padding-bottom: 0.85rem;
            border-bottom: 1px dotted rgba(255, 255, 255, 0.18);
        }

        .rating-divider {
            display: none;
        }

        .rating-cta-panel {
            padding-left: 0;
            align-items: center;
            text-align: center;
        }

        .rating-cta-copy {
            max-width: 100%;
        }
    }
`;

export default RatingCardSplitLayout;
