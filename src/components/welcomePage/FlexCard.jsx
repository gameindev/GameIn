import FindCreator from "../../assets/homepage/find-creator.svg";
import FindBrand from "../../assets/homepage/find-brand.svg";
import { FlexCardStyles } from "../../styles/pages/welcomPage";
import { Button, Flex, Text, Title } from "@mantine/core";
import ReadMore from './../shared/ui/ReadMore';

export default function FlexCard({ scrollToRef }) {
  return (
    <FlexCardStyles ref={scrollToRef}>
      <div className="creator_card">
        <Title order={2} c="textWhite" className="flexTitle" fw="900" mb="xl">FIND A CREATOR</Title>
        <Text mb="xl" size="md" c="white" fw="800">Monetize your talent</Text>
        <ReadMore
            color="black"
            content={`GameIn helps sponsors break into dynamic gaming spaces with engaged viewership by finding the right gamers and teams to increase their exposure to desired demographics.`}
        />
        <Flex justify="space-between" align="flex-end" mt="xl">
          <Button variant="darkGrey" padding="0.5em" size="sm" width="8.125em">
            Search
          </Button>
          <img className="banner_img" src={FindCreator} alt="" />
        </Flex>
      </div>
      <div className="sponsor_card">
        <Title order={2} c="textWhite" className="flexTitle" fw="900" mb="xl">FIND A SPONSOR</Title>
        <Text mb="xl" size="md" c="white" fw="800">Don’t just throw your money at eSports.</Text>
        <ReadMore
            color="black"
            content={`Text way to long. Discover sponsorship opportunities more efficient Our sponsorship marketplace provides increased exposure to potential sponsors, streamlines the sponsorship`}
        />
        <Flex justify="space-between" align="flex-end" mt="xl">
          <Button variant="darkGrey" padding="0.5em" size="sm" width="8.125em">
            Search
          </Button>
          <img className="banner_img" src={FindBrand} alt="" />
        </Flex>
      </div>
    </FlexCardStyles>
  );
}
