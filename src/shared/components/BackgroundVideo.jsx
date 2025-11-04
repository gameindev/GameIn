import styled from "styled-components";
import GameInVideo from "../../assets/homepage/gameIn-vid.mp4";





const StyledVideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
`;

export default function BackgroundVideo() {
    return (
        <StyledVideoBackground autoPlay muted loop>
            <source src={GameInVideo} type="video/mp4" />
            Your browser does not support the video tag.
        </StyledVideoBackground>
    )
}