import styled from "styled-components";
import { theme } from "./../../../styles/theme/customTheme";

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => props.$size};
  background-color: #4a5568;
  overflow: hidden;

  .banner_image {
    width: 100%;
    height: 100%;
    background-image: url("/banner.jpg");
    background-size: cover;
    background-position: center;
    background-color: ${theme.colors.secondaryGrey[0]};
  }
`;

const CoverBanner = ({ coverImage, size = "9.5rem " }) => {
  return (
    <Banner $size={size}>
      <div className="banner_overlay" />
      <div className="banner_image">
        <img src={coverImage} alt="Cover" />
      </div>
    </Banner>
  );
};

export default CoverBanner;
