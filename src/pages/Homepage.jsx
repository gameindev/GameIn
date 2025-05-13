import styled from "styled-components";
import GameInLogo from "../assets/homepage/gamein-logo.svg";
import HeroSvg from "../assets/homepage/hero-section-image.svg";
import Button from "../components/ui/Button";
import TextWithReadMore from "../components/ui/CardWithReadMore";
import FindCreator from "../assets/homepage/find-creator.svg";
import FindBrand from "../assets/homepage/find-brand.svg";
import CreatorBrandUnite from "../assets/homepage/creators-brands-unite.png";

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
  padding-bottom: 2.5rem;
  margin-bottom: 3rem;
`;

const CreatorCard = styled.div`
  padding: 3.75rem;
  background: ${({ theme }) => theme.baseColors.brandPrimary};
  border-radius: 0.125rem;
  flex: 0 0 calc(50% - 6.25rem / 2);
  min-height: 36rem;
`;

const SponsorCard = styled.div`
  padding: 3.75rem;
  background: ${({ theme }) => theme.baseColors.brandSecondary};
  border-radius: 0.125rem;
  flex: 0 0 calc(50% - 6.25rem / 2);
  min-height: 36rem;
`;

const CardTitle = styled.h2`
  font-size: 2.188rem;
  font-family: ${({ theme }) => theme.typography.exo2.extraBold};
  font-weight: 900;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2.5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -1rem;
    width: 3.5rem;
    height: 0.125rem;
    background: #ffffff;
    left: 0;
  }
`;

const CardSubtitle = styled.p`
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.typography.exo2.bold};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.875rem;
`;

const TwocolumnLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 1rem;
`;

const PresentationCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  border-radius: 0.125rem;
  background: ${({ theme }) => theme.colors.bgGray};
`;

const PresentationCardContent = styled.div`
  flex: 0 0 35%;
  padding: 3.25rem 4.5rem;
  padding-right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const PresentationCardTitle = styled.div`
  font-size: 2.188rem;
  font-family: ${({ theme }) => theme.typography.exo2.medium};
  font-weight: 400;
  line-height: 1;
  margin-bottom: 2.75rem;
  color: ${({ theme }) => theme.colors.text};
  position: relative;

  span {
    font-family: ${({ theme }) => theme.typography.exo2.extraBold};
    font-weight: 900;
    color: ${({ theme }) => theme.baseColors.brandPrimary};
    display: block;
  }
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
          <TextWithReadMore
            content={`GameIn helps sponsors break into dynamic gaming spaces with
                engaged viewership by finding the right gamers and teams to
                increase their exposure to desired demographics.`}
          />
          <TwocolumnLayout>
            <Button
              $variant="darkGray"
              $padding="0.5rem"
              $size="small"
              $width="8.125rem"
            >
              Search
            </Button>
            <img src={FindCreator} alt="" />
          </TwocolumnLayout>
        </CreatorCard>
        <SponsorCard>
          <CardTitle className="card_title">FIND A SPONSOR</CardTitle>
          <CardSubtitle className="card_subTitle">
            Don’t just throw your money at eSports.
          </CardSubtitle>
          <TextWithReadMore
            content={`Text way to long. Discover sponsorship opportunities more efficient Our sponsorship marketplace provides increased exposure to potential sponsors, streamlines the sponsorship`}
          />
          <TwocolumnLayout>
            <Button
              $variant="darkGray"
              $padding="0.5rem"
              $size="small"
              $width="8.125rem"
            >
              Search
            </Button>
            <img src={FindBrand} alt="" />
          </TwocolumnLayout>
        </SponsorCard>
      </FlexCard>
      <PresentationCard>
        <PresentationCardContent>
          <div className="text">
            <PresentationCardTitle>
              Creators & Brands <span>unite!</span>
            </PresentationCardTitle>
            <TextWithReadMore
              content={`As part of our ecosystem, we provide sponsorships, merchandise shops, team-finding solutions, and
              certifications that help esports organizations gain recognition and credibility.`}
            />
          </div>
          <Button
            $variant="primary"
            $size="small"
            $padding="0.5rem"
            $width="8.5rem"
          >
            Search
          </Button>
        </PresentationCardContent>
        <div>
          <img src={CreatorBrandUnite} alt="Creators and Brands Unite" />
        </div>
      </PresentationCard>
      <PresentationCard>
        <PresentationCardContent>
          <div className="text">
            <PresentationCardTitle>
              Creators & Brands <span>unite!</span>
            </PresentationCardTitle>
            <TextWithReadMore
              content={`As part of our ecosystem, we provide sponsorships, merchandise shops, team-finding solutions, and
              certifications that help esports organizations gain recognition and credibility.`}
            />
          </div>
          <Button
            $variant="primary"
            $size="small"
            $padding="0.5rem"
            $width="8.5rem"
          >
            Search
          </Button>
        </PresentationCardContent>
        <div>
          <img src={CreatorBrandUnite} alt="Creators and Brands Unite" />
        </div>
      </PresentationCard>
    </div>
  );
};

export default Homepage;
