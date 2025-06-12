import { useRef } from "react";
import {
  FlexCard,
  HeroSection,
  MileStone,
  PresentationCard,
} from "../components/welcomePage";
import CreatorBrandUnite from "../assets/homepage/creators-brands-unite.png";
import SponsorshipOpp from "../assets/homepage/sponsorship-opportunities.png";
import JoinEcosystem from "../assets/homepage/join-ecosystem.png";
import GrowYourBusiness from "../assets/homepage/grow-your-business.png";
import BackgroundVideo from './../components/shared/ui/BackgroundVideo';

export default function WelcomePage() {
  const scrollToRef = useRef(null);

  const scrollToElement = () => {
    scrollToRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const presentationData = [
    {
      title: "Creators & Brands",
      subTitle: "unite!",
      className: "",
      readMoreColor: "primary",
      readMoreContent:
        "As part of our ecosystem, we provide sponsorships, merchandise shops, team-finding solutions, and certifications that help esports organizations gain recognition and credibility.",
      btnText: "Search",
      image: CreatorBrandUnite,
      altText: "Creators and Brands Unite",
    },
    {
      title: "Search and find your best",
      subTitle: "sponsorship opportunities",
      className: "odd",
      readMoreColor: "primary",
      readMoreContent:
        "We offer brands a targeted demographic to a highly engaged esports audience. Brands receive professional guidance and support to create effective sponsorship proposals.",
      btnText: "Search",
      image: SponsorshipOpp,
      altText: "Search and find your best sponsorship opportunities",
    },
    {
      title: "Join our",
      subTitle: "Ecosystem",
      className: "",
      readMoreColor: "primary",
      readMoreContent:
        "As part of our ecosystem, we provide sponsorships, merchandise shops, team-finding solutions, and certifications that help esports organizations gain recognition and credibility.",
      btnText: "Search",
      image: JoinEcosystem,
      altText: "Join Our Ecosystem",
    },
  ];

  const growBusinessData = {
    title: "Grow your business",
    subTitle: "with gamein",
    className: "odd",
    readMoreColor: "primary",
    readMoreContent:
      "We offer brands a targeted demographic to a highly engaged esports audience. Brands receive professional guidance and support to create effective sponsorship proposals.",
    btnText: "Search",
    image: GrowYourBusiness,
    altText: "Grow your Business",
  };

  return (
    <>
      <BackgroundVideo />
      <div className="container">
        <HeroSection scrollToElement={scrollToElement} />
        <FlexCard scrollToRef={scrollToRef} />
        {presentationData?.map((data) => (
          <PresentationCard key={data?.subTitle} data={data} />
        ))}
      </div>
      <MileStone />
      <div className="container">
        <PresentationCard data={growBusinessData} />
      </div>
    </>
  );
}
