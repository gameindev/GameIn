import { Banner } from "./styles";

const CoverBanner = ({ coverImage }) => (
  <Banner>
    <div className="banner_overlay" />
    <div className="banner_image">
      <img src={coverImage} alt="Cover" />
    </div>
  </Banner>
);

export default CoverBanner;
