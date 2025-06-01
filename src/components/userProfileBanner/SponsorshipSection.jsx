import { SponsorShip } from "./styles";
import { Text } from "@mantine/core";

const SponsorshipSection = ({ sponsors }) => (
  <SponsorShip>
    <Text
      className="sponsorship_text"
      component="span"
      size="sm"
      // color="dimmed"
    >
      Sponsored by
    </Text>
    <div className="sponsorship_tracker">
      {sponsors.map((sponsor, index) => (
        <img
          key={index}
          className="sponsor_logo"
          src={sponsor.logo}
          alt={sponsor.name}
          style={{ width: sponsor.size }}
        />
      ))}
    </div>
  </SponsorShip>
);

export default SponsorshipSection;
