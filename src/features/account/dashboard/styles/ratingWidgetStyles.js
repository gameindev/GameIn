import styled from "styled-components";
import { theme } from "../../../../shared/styles/theme/customTheme";

const ratingColors = {
  label: theme.colors.text[0],
  axis: "rgba(255, 255, 255, 0.12)",
  gridOne: "rgba(92, 229, 176, 0.12)",
  gridTwo: "rgba(92, 229, 176, 0.18)",
  gridThree: "rgba(92, 229, 176, 0.26)",
  gridFour: "rgba(92, 229, 176, 0.34)",
  gridFive: "rgba(92, 229, 176, 0.42)",
  value: "rgba(255, 255, 255, 0.34)",
  valueShadow: "rgba(92, 229, 176, 0.34)",
  marker: theme.colors.white[0],
  primary: theme.colors.primary[0],
  mutedDot: theme.colors.inputBgColor[0],
  scoreBackdrop: "rgba(255, 255, 255, 0.28)",
  scoreText: theme.colors.secondaryGrey[0],
};

export const RatingWidgetStyles = styled.div`
  width: 100%;
  min-height: 14.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.gap.xs};

  .rating_chart {
    width: 100%;
    max-width: 15rem;
    aspect-ratio: 1;
  }

  .rating_chart_svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .rating_grid {
    stroke: ${ratingColors.axis};
    stroke-width: 1;
  }

  .rating_grid_1 {
    fill: ${ratingColors.gridFive};
  }

  .rating_grid_2 {
    fill: ${ratingColors.gridFour};
  }

  .rating_grid_3 {
    fill: ${ratingColors.gridThree};
  }

  .rating_grid_4 {
    fill: ${ratingColors.gridTwo};
  }

  .rating_grid_5 {
    fill: ${ratingColors.gridOne};
    filter: drop-shadow(0 0.55rem 0.75rem rgba(0, 0, 0, 0.22));
  }

  .rating_axis {
    stroke: ${ratingColors.axis};
    stroke-width: 1;
  }

  .rating_value_shadow {
    fill: ${ratingColors.valueShadow};
    stroke: transparent;
  }

  .rating_value {
    fill: ${ratingColors.value};
    stroke: rgba(255, 255, 255, 0.24);
    stroke-width: 1;
  }

  .rating_marker {
    fill: ${ratingColors.marker};
    stroke: ${ratingColors.primary};
    stroke-width: 0.5;
  }

  .rating_score_backdrop {
    fill: ${ratingColors.scoreBackdrop};
  }

  .rating_score {
    fill: ${ratingColors.scoreText};
    font-size: 1.05rem;
    font-weight: 700;
  }

  .rating_label {
    fill: ${ratingColors.label};
    font-size: 0.44rem;
    letter-spacing: 0;
    dominant-baseline: middle;
  }

  .rating_pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.gap.xs};
  }

  .rating_dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${ratingColors.mutedDot};
  }

  .rating_dot.is_active {
    background: ${ratingColors.primary};
  }

  @media (max-width: 640px) {
    min-height: 13rem;

    .rating_chart {
      max-width: 13rem;
    }
  }
`;
