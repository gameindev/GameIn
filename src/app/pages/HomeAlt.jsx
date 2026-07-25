import {
    Button,
    Card,
    Flex,
    Title,
    Text,
    Group,
    AspectRatio,
    Grid,
    Image,
} from "@mantine/core";
import { Link } from "react-router";
import GameInLogo from "../../assets/homepage/gamein-logo.svg";
import HexImage from "../../assets/homepage/creators-brands-unite.png";
import JoinEcoImage from "../../assets/homepage/join-ecosystem.png";
import SponsorshipOpp from "../../assets/homepage/sponsorship-opportunities.png";
import verifiedContact from "../../assets/homepage/verified-contact.svg";
import CreatorCertificate from "../../assets/homepage/creator-cert-system.svg";
import AutomatedPayout from "../../assets/homepage/automated-payouts.svg";
import SmartMatching from "../../assets/homepage/smart-matching.svg";
import CustomBuilder from "../../assets/homepage/custom-builder.svg";
import GameinEngine from "../../assets/homepage/gamein-engine.svg";
import SponsorOpportunity from "../../assets/homepage/sponsorship-opportunities.svg";
import bottomDecor from "../../assets/homepage/bottom-social-decors.svg";
import GameinEngineBanner from "../../assets/homepage/gamein-engine-banner.svg";
import VideoContainer from "../../assets/homepage/video-container.png";

import {
    HeroAltStyles,
    TwoColSection,
    HowItWorksStyles,
    GridCard,
    SponsorshipMarketplace,
    MileStoneStyles,
} from "../../shared/styles/homealt/homeAlt";
import { theme } from "../../shared/styles/theme/customTheme";
import { IconRefresh, IconSend } from "@tabler/icons-react";
import PlayerStats from "../components/PlayerStats";
import ReadMore from "../../shared/components/ReadMore";
import CounterOnView from "../../shared/components/CounterOnView";
import BackgroundVideo from "../../shared/components/BackgroundVideo";

export default function HomeAlt() {
    return (
        <>
            <BackgroundVideo />
            <div style={{}}>
                <HeroAltStyles>
                    <div className="container">
                        <div className="banner">
                            <img src={GameInLogo} alt="GameIn Logo" className="logo" />
                            <Title order={1} className="headline" fw={600} c="textWhite">
                                Smart Sponsorships. <br /> Real Results. Zero Hassle.
                            </Title>
                            <Text c="textWhite" className="subhead">
                                GameIn makes it easy for creators and brands to connect,
                                collaborate, and get paid—fast.
                            </Text>
                            <Flex mt="lg" gap="md" justify="center" className="hero-cta">
                                <Link to="/register">
                                    <Button variant="secondary" className="cta-btn">
                                        Register
                                    </Button>
                                </Link>
                            </Flex>

                            <Flex direction="column">
                                <img
                                    className="gamein-engine-banner"
                                    src={GameinEngineBanner}
                                    alt="Gamein Engine"
                                />
                                <Card className="search-demo" radius="xxl" withBorder>
                                    <div className="search-row">
                                        <Text
                                            className="search-text"
                                            fz={"1rem"}
                                            c={theme.colors.primary[0]}
                                            align="left"
                                            lh={1.4}
                                        >
                                            Looking for a U.S.-based gaming streamer, family‑friendly,
                                            appeals to viewers ages 20–30
                                        </Text>
                                        <Group>
                                            <Button size="sm" variant="inputBgColor">
                                                <IconRefresh size={24} />
                                            </Button>
                                            <Button size="sm" variant="inputBgColor">
                                                <IconSend size={24} />
                                            </Button>
                                        </Group>
                                    </div>
                                    {/* <div className="stats-row">
              <div className="stat">
                <span className="k">25K</span>
                <span>avg views</span>
              </div>
              <div className="stat">
                <span className="k">1.2K</span>
                <span>avg likes</span>
              </div>
              <div className="stat">
                <span className="k">8%</span>
                <span>engagement</span>
              </div>
              <div className="stat">
                <span className="k">$</span>
                <span>clear rates</span>
              </div>
            </div> */}
                                </Card>
                            </Flex>
                            <PlayerStats />
                        </div>
                    </div>
                </HeroAltStyles>

                <TwoColSection>
                    <div className="container two-col">
                        <div className="text">
                            <Title
                                order={2}
                                fw={600}
                                c="textWhite"
                                className="section-title dashedTitle"
                            >
                                No spreadsheets. <br /> No ghosting. No DMs.
                            </Title>
                            <ReadMore
                                color="white"
                                content={`GameIn is your streamlined sponsorship HQ. Built for creators who want to earn, and brands who want results.`}
                                className="readmore-align"
                            />
                            <Flex justify="flex-start" align="flex-end" mt="xl" className="col-cta">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="cta-btn"
                                >
                                    Search
                                </Button>
                            </Flex>
                        </div>
                        <Card className="art" radius="xxl">
                            <img src={HexImage} alt="Hex network" />
                        </Card>
                    </div>
                </TwoColSection>

                <TwoColSection reversed>
                    <div className="container two-col">
                        <Card className="art" radius="xxl">
                            <img src={SponsorshipOpp} alt="Dashboard preview" />
                        </Card>
                        <div className="text">
                            <Title
                                order={2}
                                fw={600}
                                c="textWhite"
                                className="section-title dashedTitle"
                            >
                                Creators & Brands
                            </Title>
                            <ReadMore
                                color="white"
                                content={`Creators, showcase your value, set your terms, and get paid on time. Brands, discover verified talent, launch faster, and track every campaign in real time.`}
                            />
                            <Flex justify="flex-start" align="flex-end" mt="xl" className="col-cta right-cta">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="cta-btn"
                                >
                                    Search
                                </Button>
                            </Flex>
                        </div>
                    </div>
                </TwoColSection>

                <HowItWorksStyles>
                    <div className="container">
                        <Title
                            order={2}
                            fw={600}
                            c="textWhite"
                            className="how-title dashedTitle"
                        >
                            How it works
                        </Title>
                        <AspectRatio ratio={16 / 7} className="video-container">
                            {/* <iframe
              src="https://www.youtube.com/embed/mzJ4vCjSt28"
              title="YouTube video player"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            /> */}
                            <Image src={VideoContainer} />
                        </AspectRatio>
                    </div>
                </HowItWorksStyles>

                <GridCard>
                    <div className="container">
                        <Flex
                            wrap={"wrap"}
                            gap={{ base: "1rem", md: "1.5rem" }}
                            justify={"space-between"}
                            className="card_body"
                        >
                            <div className="card">
                                <div className="logo">
                                    <img src={verifiedContact} alt="Verified Contact" />
                                </div>
                                <Title order={4} className="title">
                                    Verified Contracts
                                </Title>
                                <Text className="para">
                                    Built-in agreements you can trust, signed and stored in one
                                    place.
                                </Text>
                            </div>
                            <div className="card">
                                <div className="logo">
                                    <img src={CreatorCertificate} alt="Verified Contact" />
                                </div>
                                <Title order={4} className="title">
                                    Creator Certification System
                                </Title>
                                <Text className="para">
                                    Levels 1–6 prove your track record to brands.
                                </Text>
                            </div>
                            <div className="card">
                                <div className="logo">
                                    <img src={verifiedContact} alt="Verified Contact" />
                                </div>
                                <Title order={4} className="title">
                                    Live Campaign Analytics
                                </Title>
                                <Text className="para">
                                    See real-time impressions, clicks, and engagement.
                                </Text>
                            </div>
                            <div className="card">
                                <div className="logo">
                                    <img src={AutomatedPayout} alt="Verified Contact" />
                                </div>
                                <Title order={4} className="title">
                                    Automated Payouts
                                </Title>
                                <Text className="para">
                                    No chasing payments—money flows when milestones are hit.
                                </Text>
                            </div>
                            <div className="card">
                                <div className="logo">
                                    <img src={SmartMatching} alt="Verified Contact" />
                                </div>
                                <Title order={4} className="title">
                                    Smart Matching
                                </Title>
                                <Text className="para">
                                    AI helps pair the right brands with the right creators.
                                </Text>
                            </div>
                            <div className="card">
                                <div className="logo">
                                    <img src={CustomBuilder} alt="Verified Contact" />
                                </div>
                                <Title order={4} className="title">
                                    Custom Deal Builder
                                </Title>
                                <Text className="para">
                                    Choose perks, set rates, and manage terms on your own terms.
                                </Text>
                            </div>
                        </Flex>
                    </div>
                </GridCard>

                <TwoColSection className="two-col-spaced">
                    <div className="container two-col">
                        <div className="text">
                            <Title
                                order={2}
                                fw={600}
                                c="textWhite"
                                className="section-title dashedTitle"
                            >
                                Trusted partner <br aria-hidden="true" />
                                simple tools & fair deals
                            </Title>
                            <ReadMore
                                color="white"
                                content={`Just trusted deals, simple tools, and clean execution.`}
                            />
                            <Flex justify="space-between" align="flex-end" mt="xl">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="cta-btn"
                                >
                                    Search
                                </Button>
                            </Flex>
                        </div>
                        <Card className="art" radius="xxl">
                            <img src={JoinEcoImage} alt="Hex network" />
                        </Card>
                    </div>
                </TwoColSection>

                <HowItWorksStyles>
                    <div className="container">
                        <Title
                            order={2}
                            fw={600}
                            c="textWhite"
                            className="how-title dashedTitle"
                        >
                            Start your sponsorship
                            <br aria-hidden="true" /> journey the right way.
                        </Title>
                        <Text c="textWhite" className="helperText">
                            Join GameIn
                        </Text>
                        <Flex mt="lg" gap="md" justify="center" className="how-cta">
                            <Link to="/register">
                                <Button variant="secondary" className="cta-btn">
                                    Register
                                </Button>
                            </Link>
                        </Flex>
                    </div>
                </HowItWorksStyles>

                <SponsorshipMarketplace>
                    <div className="container">
                        <div className="content_block">
                            <Flex gap={12} justify={"center"} className="eyebrow">
                                <Text fw={600} c={theme.colors.textSecondary[0]}>
                                    Upcoming:{" "}
                                </Text>
                                <img src={GameinEngine} alt="Gamein engine" />
                            </Flex>
                            <Title order={2} fw={600} className="section-title dashedTitle">
                                Next-gen
                                <br aria-hidden="true" />
                                sponsorship marketplace
                            </Title>
                            <Text className="para">
                                Gamein AI engine will be your virtual assistant to find the best
                                partner for your business
                            </Text>
                        </div>
                        <div className="image_block">
                            <img src={SponsorOpportunity} alt="Sponsorship opportunities" />
                        </div>
                    </div>
                </SponsorshipMarketplace>

                <MileStoneStyles>
                    <div className="milestone_banner">
                        <div className="container">
                            <div className="milestone_container">
                                <div className="count_block">
                                    <div className="categories counter">
                                        <CounterOnView value={99} />
                                        <span>Games</span>
                                    </div>
                                    <div className="brands counter">
                                        <CounterOnView value={5.52} />
                                        {/* <div className="count">2.520</div> */}
                                        <span>Sponsors</span>
                                    </div>
                                    <div className="influencers counter">
                                        <CounterOnView value={15.31} />
                                        {/* <div className="count">15.310</div> */}
                                        <span>Gamers</span>
                                    </div>
                                    <div className="sponsorships counter">
                                        <CounterOnView value={37.3} />
                                        {/* <div className="count">37.300</div> */}
                                        <span>Deals Made</span>
                                    </div>
                                </div>
                                <Title
                                    order={2}
                                    fw={600}
                                    c="textWhite"
                                    align="center"
                                    className="milestone_title"
                                >
                                    Thousands of influencers and companies choose&nbsp;Gamein
                                </Title>
                                <Flex mt="lg" gap="md" justify="center" className="milestone-cta">
                                    <Link to="/register">
                                        <Button variant="secondary" className="cta-btn">
                                            Register
                                        </Button>
                                    </Link>
                                </Flex>
                            </div>
                            <img src={bottomDecor} alt="bottom social media decors" />
                        </div>
                    </div>
                </MileStoneStyles>
            </div>
        </>
    );
}
