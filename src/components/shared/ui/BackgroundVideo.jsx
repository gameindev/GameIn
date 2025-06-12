import styled from "styled-components";
import BGvideo from "../../../assets/homepage/gameIn-vid.mp4";

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
`;

const BackgroundVideo = () => (
  <VideoBackground autoPlay muted loop>
    <source src={BGvideo} type="video/mp4" />
    Your browser does not support the video tag.
  </VideoBackground>
);

export default BackgroundVideo;
