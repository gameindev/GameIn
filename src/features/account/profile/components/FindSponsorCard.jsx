import { Button, Group, rgba, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import StatBox from "../../../../shared/components/StatBox";
import { theme } from "../../../../shared/styles/theme/customTheme";
import findSponsorIllustration from "../../../../assets/profile/find-sponsor.svg";
import { SponsorCardContent } from "../style/style";

const FindSponsorCard = () => {
    const navigate = useNavigate();

    return (
        <StatBox
            title="Welcome to Game-In"
            background={rgba(theme.colors.secondary[0], 0.6)}
        >
            <SponsorCardContent>
                <div className="content">
                    <Title order={2}>Find a sponsor</Title>
                    <span className="accent" aria-hidden="true" />
                    <Group w={"58%"}>
                        <Text className="tagline">Monetize your talent!</Text>
                        <Text className="description">
                            Discover sponsorship opportunities more efficiently. Our
                            sponsorship marketplace provides increased exposure to brands.
                        </Text>
                    </Group>
                    <Button
                        variant="grey"
                        className="search-button"
                        onClick={() => navigate("/search/brand")}
                    >
                        Search
                    </Button>
                </div>

                <img
                    className="illustration"
                    src={findSponsorIllustration}
                    alt=""
                    aria-hidden="true"
                />
            </SponsorCardContent>
        </StatBox>
    );
};

export default FindSponsorCard;
