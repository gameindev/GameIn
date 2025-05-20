import { Button, Title } from "@mantine/core";
import CreatorBrandUnite from "../../assets/homepage/creators-brands-unite.png";
import SponsorshipOpp from "../../assets/homepage/sponsorship-opportunities.png";
import JoinEcosystem from "../../assets/homepage/join-ecosystem.png";
import { PresentationStyles } from "../../styles/pages/welcomPage";
import ReadMore from "../shared/ReadMore";

export default function PresentationCard() {
  return (
    <>
      <PresentationStyles>
        <div className="presentation_cardContent">
          <div className="text_block">
            <Title order={2} c="white" className="presentation_cardTitle">
              {" "}
              Creators & Brands <span>unite!</span>
            </Title>
            <ReadMore
              color="primary"
              content={`As part of our ecosystem, we provide sponsorships, merchandise shops, team-finding solutions, and
                        certifications that help esports organizations gain recognition and credibility.`}
            />
          </div>
          <Button
            variant="primary"
            size="sm"
            padding="0.5rem"
            width="8.5rem"
            mt="xl"
          >
            Search
          </Button>
        </div>
        <div>
          <img src={CreatorBrandUnite} alt="Creators and Brands Unite" />
        </div>
      </PresentationStyles>
      <PresentationStyles className="odd">
        <div className="presentation_cardContent">
          <div className="text_block">
            <Title order={2} c="white" className="presentation_cardTitle">
              Search and find your best <span>sponsorship opportunities</span>
            </Title>
            <ReadMore
              color="primary"
              content={`We offer brands a targeted demographic to a highly engaged esports audience. Brands receive professional 
                guidance and support to create effective sponsorship proposals.`}
            />
          </div>
          <Button
            variant="primary"
            size="sm"
            padding="0.5rem"
            width="8.5rem"
            mt="xl"
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
      </PresentationStyles>
      <PresentationStyles>
        <div className="presentation_cardContent">
          <div className="text_block">
            <Title order={2} c="white" className="presentation_cardTitle">
              Join our <span>Ecosystem</span>
            </Title>
            <ReadMore
              color="primary"
              content={`As part of our ecosystem, we provide sponsorships, merchandise shops, team-finding solutions, and 
                certifications that help esports organizations gain recognition and credibility.`}
            />
          </div>
          <Button
            variant="primary"
            size="sm"
            padding="0.5rem"
            width="8.5rem"
            mt="xl"
          >
            Search
          </Button>
        </div>
        <div>
          <img src={JoinEcosystem} alt="Join Our Ecosystem" />
        </div>
      </PresentationStyles>
    </>
  );
}
