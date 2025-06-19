import styled from "styled-components";
import { theme } from "./../../../../styles/theme/customTheme";

export const ImageWrapper = styled.div`
  width: 100%;
  height: 11rem;
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
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

export const VideoWrapper = styled.div`
  iframe,
  video {
    border-radius: ${theme.radius.md};
    width: 100%;
    height: 11rem;
    object-fit: cover;
  }
`;
