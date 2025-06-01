import styled from "styled-components";

// Generates a rounded hexagon clip-path
const generateRoundedHexagon = ({
  mainRadius = 30,
  roundingRadius = 10,
  rotated = false,
  precision = 20,
} = {}) => {
  const sides = 6;
  const angleStep = 360 / sides;
  const maxCurveAngle = 2 * (90 - ((sides - 2) * 180) / (2 * sides));
  const curveStep = maxCurveAngle / precision;
  const radiusOffset = mainRadius + roundingRadius;
  const degToRad = (deg) => (deg * Math.PI) / 180;

  const points = [];

  for (let i = 0; i < sides; i++) {
    const baseAngle = i * angleStep + (rotated ? -90 : 0);
    const cx = 50 + radiusOffset * Math.cos(degToRad(baseAngle));
    const cy = 50 + radiusOffset * Math.sin(degToRad(baseAngle));

    for (let j = 0; j <= precision; j++) {
      const curveAngle = baseAngle + (j - precision / 2) * curveStep;
      const x = cx + roundingRadius * Math.cos(degToRad(curveAngle));
      const y = cy + roundingRadius * Math.sin(degToRad(curveAngle));
      points.push(`${x}% ${y}%`);
    }
  }

  return `polygon(${points.join(", ")})`;
};

export const Hexagon = styled.div`
  display: inline-block;
  width: ${({ size = "20em" }) => size};
  height: ${({ size = "20em" }) => size};
  background: ${({ $backgroundColor = "teal", imageUrl }) =>
    imageUrl ? `url(${imageUrl}) center/cover no-repeat` : $backgroundColor};
  clip-path: ${({ $mainRadius, $roundingRadius, $rotated, $precision }) =>
    generateRoundedHexagon({
      mainRadius: $mainRadius,
      roundingRadius: $roundingRadius,
      rotated: $rotated,
      precision: $precision,
    })};
  border: ${({ $border = "0.063rem solid transparent" }) => $border};
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    clip-path: inherit;
    object-position: center;
    border: inherit;
  }
`;
