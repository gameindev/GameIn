import GameInLogo from "../assets/homepage/gamein-logo.svg";
import HeroSvg from "../assets/homepage/hero-section-image.svg";
import TextWithReadMore from "../components/ui/CardWithReadMore";
import FindCreator from "../assets/homepage/find-creator.svg";
import FindBrand from "../assets/homepage/find-brand.svg";
import CreatorBrandUnite from "../assets/homepage/creators-brands-unite.png";
import GrowYourBusiness from "../assets/homepage/grow-your-business.png";
import JoinEcosystem from "../assets/homepage/join-ecosystem.png";
import SponsorshipOpp from "../assets/homepage/sponsorship-opportunities.png";
import StartYourJourney from "../assets/homepage/start-your-journey.svg";
import { Button } from "../components/ui";
import {
    HeroSection,
    FlexCard,
    CardTitle,
    CardSubtitle,
    TwocolumnLayout,
    PresentationCard,
    MileStone,
} from "../components/styles/pages/HomePage";

const Homepage = () => {
    return (
        <>
            <div className="container">
                <HeroSection>
                    <div className="left_section">
                        <div className="heroContent">
                            <img src={GameInLogo} alt="GameIn Logo" />
                            <div className="banner_title">
                                Connecting creators &{" "}
                                <br className="hidden xl:block" aria-hidden="true" />
                                brands worldwide
                            </div>
                            <div className="banner_subTitle">
                                Join the most powerful advertising marketplace and boost your
                                success
                            </div>
                            <div className="cta_container">
                                <Button $variant="secondary" $padding="0.875rem" $size="medium">
                                    Register
                                </Button>
                                <Button $variant="hoverGray" $padding="0.875rem" $size="medium">
                                    Sign in
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="right_section">
                        <img src={HeroSvg} alt="Hero Banner Presentation" />
                    </div>
                </HeroSection>
                <FlexCard>
                    <div className="creator_card">
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
                    </div>
                    <div className="sponsor_card">
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
                    </div>
                </FlexCard>
                <PresentationCard>
                    <div className="presentation_cardContent">
                        <div className="text_block">
                            <div className="presentation_cardTitle">
                                Creators & Brands <span>unite!</span>
                            </div>
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
                    </div>
                    <div>
                        <img src={CreatorBrandUnite} alt="Creators and Brands Unite" />
                    </div>
                </PresentationCard>
                <PresentationCard className="odd">
                    <div className="presentation_cardContent">
                        <div className="text_block">
                            <div className="presentation_cardTitle">
                                Search and find your best <span>sponsorship opportunities</span>
                            </div>
                            <TextWithReadMore
                                content={`We offer brands a targeted demographic to a highly engaged esports audience. Brands receive professional 
                guidance and support to create effective sponsorship proposals.`}
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
                    </div>
                    <div>
                        <img
                            src={SponsorshipOpp}
                            alt="Search and find your best sponsorship opportunities"
                        />
                    </div>
                </PresentationCard>
                <PresentationCard>
                    <div className="presentation_cardContent">
                        <div className="text_block">
                            <div className="presentation_cardTitle">
                                Join our <span>Ecosystem</span>
                            </div>
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
                    </div>
                    <div>
                        <img src={JoinEcosystem} alt="Join Our Ecosystem" />
                    </div>
                </PresentationCard>
            </div>
            <MileStone>
                <div className="milestone_banner">
                    <div className="milestone_container">
                        <div className="startJourney">
                            <img src={StartYourJourney} alt="" />
                            <h3>Startyour journey now!</h3>
                            <p>
                                evaluatingthe performances ofamateur, semi-professional, and pro
                            </p>
                        </div>
                        <div className="counts_block">
                            <div className="games counter">
                                <div className="count">200</div>
                                <span>Games</span>
                            </div>
                            <div className="sponsors counter">
                                <div className="count">2.520</div>
                                <span>Sponsors</span>
                            </div>
                            <div className="gamers counter">
                                <div className="count">15.310</div>
                                <span>Gamers</span>
                            </div>
                            <div className="deals counter">
                                <div className="count">37.300</div>
                                <span>Deals Made</span>
                            </div>
                        </div>
                        <Button
                            $variant="secondary"
                            $size="large"
                            $padding="1rem"
                            $width="11.625rem"
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </MileStone>
            <div className="container">
                <PresentationCard className="odd">
                    <div className="presentation_cardContent">
                        <div className="text_block">
                            <div className="presentation_cardTitle">
                                Grow your business <span>with gamein</span>
                            </div>
                            <TextWithReadMore
                                content={`We offer brands a targeted demographic to a highly engaged esports audience. Brands receive professional 
                  guidance and support to create effective sponsorship proposals.`}
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
                    </div>
                    <div>
                        <img src={GrowYourBusiness} alt="Join Our Ecosystem" />
                    </div>
                </PresentationCard>
            </div>
        </>
    );
};

export default Homepage;
