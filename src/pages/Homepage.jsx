import styled from "styled-components";
import GameInLogo from "../assets/homepage/gamein-logo.svg";
import HeroSvg from "../assets/homepage/hero-section-image.svg";
import { Button } from "../components/ui";

const HeroSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 13rem 0;
`;

const LeftSection = styled.div`
  width: 100%;
  height: 100%;
`;

const RightSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
`;

const HeroContent = styled.div`
  width: 100%;
  height: 100%;
`;

const BannerTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.exo2.semiBold};
  font-size: 3.125rem;
  font-weight: 600;
  line-height: 1.1;
  margin: 1.25rem 0;
`;

const BannerSubTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.exo2.light};
  font-size: 2.128rem;
  font-weight: 300;
  line-height: 1;
  margin-bottom: 1.875rem;
  width: 65%;
`;

const CtaContainer = styled.div`
  font-family: ${({ theme }) => theme.typography.exo2.medium};
  font-weight: 400;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  width: 13rem;
`;

const FlexCard = styled.div`
  display: flex;
  gap: 6.25rem;
`;

const CreatorCard = styled.div`
  padding: 3.75rem;
  background: ${({ theme }) => theme.baseColors.brandPrimary};
  border-radius: 0.125rem;
`;

const CardTitle = styled.h2`
  font-size: 2.188rem;
  font-family: ${({ theme }) => theme.typography.exo2.extraBold};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
`;

const CardSubtitle = styled.p`
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.typography.exo2.bold};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const CardContent = styled.p`
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.typography.exo2.extraBold};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
`;

const Homepage = () => {
  return (
    <div className="container">
      <HeroSection>
        <LeftSection>
          <HeroContent>
            <img src={GameInLogo} alt="GameIn Logo" />
            <BannerTitle>
              Connecting creators &{" "}
              <br className="hidden xl:block" aria-hidden="true" />
              brands worldwide
            </BannerTitle>
            <BannerSubTitle>
              Join the most powerful advertising marketplace and boost your
              success
            </BannerSubTitle>
            <CtaContainer>
              <Button $variant="secondary" $padding="0.875rem" $size="medium">
                Register
              </Button>
              <Button $variant="hoverGray" $padding="0.875rem" $size="medium">
                Sign in
              </Button>
            </CtaContainer>
          </HeroContent>
        </LeftSection>
        <RightSection>
          <img src={HeroSvg} alt="Hero Banner Presentation" />
        </RightSection>
      </HeroSection>
      <FlexCard>
        <CreatorCard>
          <CardTitle className="card_title">FIND A CREATOR</CardTitle>
          <CardSubtitle className="card_subTitle">
            Monetize your talent
          </CardSubtitle>
          <CardContent className="card_para"></CardContent>
        </CreatorCard>
        <div className="brand-card"></div>
      </FlexCard>
    </div>
  );
};

export default Homepage;
