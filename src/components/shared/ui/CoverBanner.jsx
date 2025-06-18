import styled from "styled-components";
import { theme } from "./../../../styles/theme/customTheme";
import ReusableModal from "./../modals/modal";

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: ${({size}) => size};
  background-color: #4a5568;
  overflow: ${({size}) => size === "auto" ? "unset" : "hidden"};;

  .banner_image {
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.secondaryGrey[0]};
  }

  .action {
    position: absolute;
    top: 1rem;
    right: 1.25rem;
  }
`;

const CoverBanner = ({ coverImage, controls, size = "9.5rem" }) => {
  return (
    <Banner size={size}>
      <div className="banner_overlay" />
      <div className="banner_image">
        <img src={coverImage} alt="Cover" />
      </div>
      {controls && (
        <div className="action">
          <ReusableModal title={"Update Cover Screen"} />
        </div>
      )}
    </Banner>
  );
};

export default CoverBanner;
