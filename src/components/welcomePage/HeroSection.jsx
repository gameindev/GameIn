import { Button, Flex, Title } from "@mantine/core";
import GameInLogo from "../../assets/homepage/gamein-logo.svg";
import { HeroSectionStyles } from "../../styles/pages/welcomPage";

export default function HeroSection({ scrollToElement }) {
  return (
    <HeroSectionStyles>
        <div className="heroContent">
            <img src={GameInLogo} alt="GameIn Logo" />
            <Title order={2} c="textWhite" className="heroTitle" fw="600" my="lg">Connecting creators & brands worldwide</Title>
            <Title order={3} c="textWhite" className="heroSubTitle" fw="300" mb="xl">Join the most powerful advertising marketplace and boost your success</Title>
            <Flex gap="md" direction="column">
                <Button variant="secondary" padding="0.875rem" size="lg" width="13rem">
                    Register
                </Button>
                <Button variant="grey" padding="0.875rem" size="lg" width="13rem">
                    Sign in
                </Button>
            </Flex>
        </div>
        <button onClick={scrollToElement} className="scroll_down">
            Read more
        </button>
    </HeroSectionStyles>
  );
}
