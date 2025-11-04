import { Text } from "@mantine/core";
import { SponsorShip } from "../styles/style";


export default function SponsorshipSection({ sponsors }) {
    return (
        <SponsorShip>
            <Text
                className="sponsorship_text"
                component="span"
                size="sm"
            // color="dimmed"
            >
                {sponsors.userType === 'BRAND' ? 'Sponsoring' : 'Sponsored by'}
            </Text>
            <div className="sponsorship_tracker">
                {sponsors.sponsorship?.map((sponsor, index) => (
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
    )
}