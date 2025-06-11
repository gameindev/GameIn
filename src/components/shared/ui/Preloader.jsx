import React from "react";
import styled from "styled-components";
import { theme } from "./../../../styles/theme/customTheme";

const duration = "3s";
const pathColor = theme.colors.primary[0];
const dotColor = theme.colors.secondary[0];

const Preloader = () => {
  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <circle r={32} cy={40} cx={40} id="test" />
          </svg>
        </div>
        <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72" />
          </svg>
        </div>
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <rect height={64} width={64} y={8} x={8} />
          </svg>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    --path: ${pathColor};
    --dot: ${dotColor};
    --duration: ${duration};
    width: 2.5rem;
    height: 2.5rem;
    position: relative;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .loader:before {
    content: "";
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 50%;
    position: absolute;
    display: block;
    background: var(--dot);
    top: 2.3125rem;
    left: 1.1875rem;
    transform: translate(-1.125rem, -1.125rem);
    animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
      infinite;
  }

  .loader svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .loader svg rect,
  .loader svg polygon,
  .loader svg circle {
    fill: none;
    stroke: var(--path);
    stroke-width: 0.625rem;
    stroke-linejoin: round;
    stroke-linecap: round;
  }

  .loader svg polygon {
    stroke-dasharray: 145 76 145 76;
    stroke-dashoffset: 0;
    animation: pathTriangle var(--duration)
      cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
  }

  .loader svg rect {
    stroke-dasharray: 192 64 192 64;
    stroke-dashoffset: 0;
    animation: pathRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
      infinite;
  }

  .loader svg circle {
    stroke-dasharray: 150 50 150 50;
    stroke-dashoffset: 75;
    animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
      infinite;
  }

  .loader.triangle {
    width: 3rem;
  }

  .loader.triangle:before {
    left: 1.3125rem;
    transform: translate(-0.625rem, -1.125rem);
    animation: dotTriangle var(--duration)
      cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
  }

  @keyframes pathTriangle {
    33% {
      stroke-dashoffset: 74;
    }

    66% {
      stroke-dashoffset: 147;
    }

    100% {
      stroke-dashoffset: 221;
    }
  }

  @keyframes dotTriangle {
    33% {
      transform: translate(0, 0);
    }

    66% {
      transform: translate(0.625rem, -1.125rem);
    }

    100% {
      transform: translate(-0.625rem, -1.125rem);
    }
  }

  @keyframes pathRect {
    25% {
      stroke-dashoffset: 64;
    }

    50% {
      stroke-dashoffset: 128;
    }

    75% {
      stroke-dashoffset: 192;
    }

    100% {
      stroke-dashoffset: 256;
    }
  }

  @keyframes dotRect {
    25% {
      transform: translate(0, 0);
    }

    50% {
      transform: translate(1.125rem, -1.125rem);
    }

    75% {
      transform: translate(0, -2.25rem);
    }

    100% {
      transform: translate(-1.125rem, -1.125rem);
    }
  }

  @keyframes pathCircle {
    25% {
      stroke-dashoffset: 125;
    }

    50% {
      stroke-dashoffset: 175;
    }

    75% {
      stroke-dashoffset: 225;
    }

    100% {
      stroke-dashoffset: 275;
    }
  }

  .loader {
    display: inline-block;
    margin: 0 0.5rem;
  }
`;

export default Preloader;
