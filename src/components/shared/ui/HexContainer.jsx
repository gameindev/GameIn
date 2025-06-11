import React from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme/customTheme";

const pxToRem = (px) => `${px / 16}rem`;
const StyledHexContainer = styled.div`
  --r: ${({ radius }) => radius};
  --a: ${({ angle }) => angle};

  width: ${({ size }) => pxToRem(size)};
  background: ${({ background }) => background || theme.colors.inputBgColor[0]};
  aspect-ratio: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 0.063rem solid transparent;
  --_a: calc(30deg * var(--r));
  --_r: calc(50% * cos(30deg) / cos(30deg * (1 - var(--r))));

  clip-path: shape(
    from calc(50% + var(--_r) * cos(var(--a) - var(--_a)))
      calc(50% + var(--_r) * sin(var(--a) - var(--_a))),
    curve to calc(50% + var(--_r) * cos(var(--a) + var(--_a)))
      calc(50% + var(--_r) * sin(var(--a) + var(--_a))) with
      calc(50% + 50% * cos(var(--a))) calc(50% + 50% * sin(var(--a))),
    line to calc(50% + var(--_r) * cos(60deg + var(--a) - var(--_a)))
      calc(50% + var(--_r) * sin(60deg + var(--a) - var(--_a))),
    curve to calc(50% + var(--_r) * cos(60deg + var(--a) + var(--_a)))
      calc(50% + var(--_r) * sin(60deg + var(--a) + var(--_a))) with
      calc(50% + 50% * cos(60deg + var(--a)))
      calc(50% + 50% * sin(60deg + var(--a))),
    line to calc(50% + var(--_r) * cos(120deg + var(--a) - var(--_a)))
      calc(50% + var(--_r) * sin(120deg + var(--a) - var(--_a))),
    curve to calc(50% + var(--_r) * cos(120deg + var(--a) + var(--_a)))
      calc(50% + var(--_r) * sin(120deg + var(--a) + var(--_a))) with
      calc(50% + 50% * cos(120deg + var(--a)))
      calc(50% + 50% * sin(120deg + var(--a))),
    line to calc(50% + var(--_r) * cos(180deg + var(--a) - var(--_a)))
      calc(50% + var(--_r) * sin(180deg + var(--a) - var(--_a))),
    curve to calc(50% + var(--_r) * cos(180deg + var(--a) + var(--_a)))
      calc(50% + var(--_r) * sin(180deg + var(--a) + var(--_a))) with
      calc(50% + 50% * cos(180deg + var(--a)))
      calc(50% + 50% * sin(180deg + var(--a))),
    line to calc(50% + var(--_r) * cos(240deg + var(--a) - var(--_a)))
      calc(50% + var(--_r) * sin(240deg + var(--a) - var(--_a))),
    curve to calc(50% + var(--_r) * cos(240deg + var(--a) + var(--_a)))
      calc(50% + var(--_r) * sin(240deg + var(--a) + var(--_a))) with
      calc(50% + 50% * cos(240deg + var(--a)))
      calc(50% + 50% * sin(240deg + var(--a))),
    line to calc(50% + var(--_r) * cos(300deg + var(--a) - var(--_a)))
      calc(50% + var(--_r) * sin(300deg + var(--a) - var(--_a))),
    curve to calc(50% + var(--_r) * cos(300deg + var(--a) + var(--_a)))
      calc(50% + var(--_r) * sin(300deg + var(--a) + var(--_a))) with
      calc(50% + 50% * cos(300deg + var(--a)))
      calc(50% + 50% * sin(300deg + var(--a)))
  );

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    clip-path: inherit;
    object-position: center;
    border: inherit;
  }
`;

const HexContainer = ({
  children,
  radius = 0.15,
  angle = "30deg",
  size = 280,
  background,
}) => {
  return (
    <StyledHexContainer
      size={size}
      background={background}
      radius={radius}
      angle={angle}
    >
      {children}
    </StyledHexContainer>
  );
};

export default HexContainer;
