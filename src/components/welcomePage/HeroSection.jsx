import { Button, Flex, Title } from "@mantine/core";
import GameInLogo from "../../assets/homepage/gamein-logo.svg";
import { HeroSectionStyles } from "../../styles/pages/welcomPage";
import { Link } from "react-router";

export default function HeroSection({ scrollToElement }) {
  return (
    <HeroSectionStyles>
      <div className="heroContent">
        <img src={GameInLogo} alt="GameIn Logo" />
        <Title order={2} c="textWhite" className="heroTitle" fw="600" my="lg">
          Connecting creators & brands worldwide
        </Title>
        <Title
          order={3}
          c="textWhite"
          className="heroSubTitle"
          fw="300"
          mb="xl"
        >
          Join the most powerful advertising marketplace and boost your success
        </Title>
        <Flex gap="md" direction="column">
          <Link to="/register" style={{ width: "fit-content"}}>
            <Button
              variant="secondary"
              padding="0.875em"
              size="lg"
              width="13em"
            >
              Register
            </Button>
          </Link>
          <Link to="/login" style={{ width: "fit-content"}}>
            <Button variant="grey" padding="0.875em" size="lg" width="13em">
              Sign in
            </Button>
          </Link>
        </Flex>
      </div>
      <button onClick={scrollToElement} className="scroll_down">
        Read more
      </button>
    </HeroSectionStyles>
  );
}
