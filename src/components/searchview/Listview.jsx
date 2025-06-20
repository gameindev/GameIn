import styled from "styled-components"
import { theme } from "../../styles/theme/customTheme";
import AvatarSection from "../shared/ui/AvatarSection";
import creator from "../../assets/creators/creator_image.jpg";
import { Button, Group, RingProgress, Text } from "@mantine/core";
import Verifed from "../svg-icons/Verifed";
import Badge from "../svg-icons/Badge";
import BadgeLevels from "../svg-icons/LevelBadge";
import { Twitch, User } from "lucide-react";

const ListviewStyles = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.sm};
  background-color: ${theme.colors.secondaryGrey[0]};

  .flex_10{
    flex-basis: 10%;
  }

  .flex_20{
    flex-basis: 20%;
  }

  .flex_40{
    flex-basis: 40%;
  }
`;



export default function Listview() {
    // const size = remToPx(7.5)
  return (
    <ListviewStyles>
        <div className="flex_10"><AvatarSection avatar={creator} size="7em" /></div>
        <div className="flex_40">
            <Text colors="white" size="xl">Instant Shock</Text>
            <Group>
                <Text>24</Text>
                <Verifed />
                <Badge />
            </Group>
            <Text size="sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</Text>
        </div>
        <div className="flex_10">
            <Text size="sm">LEVEL</Text>
            <BadgeLevels />
        </div>
        <div className="flex_10">
            <RingProgress
                // size={remToPx('7.5rem')}
                thickness={7}
                roundCaps
                label={
                    <>
                        <Text size="sm" ta="center" colors="white"> 1.5M</Text>
                        <Text size="xs" ta="center">FOLLOWERS</Text>
                        <Text size="xs" ta="center"><User /></Text>                    
                    </>
                }
                sections={[
                    { value: 25, color: 'primary' },
                    { value: 15, color: 'secondary' },
                    { value: 15, color: 'skyblue' },
                    { value: 25, color: 'primary' },
                ]}
            />
        </div>
        <div className="flex_20">
            <Text ta="center">
                <Twitch size="0.7rem" />
                <Text span colors="primary">TWITCH</Text>
                <Text span colors="white">35K</Text>
            </Text>
            <Text ta="center">
                <Twitch size="0.7rem" />
                <Text span colors="primary">INSTAGRAM</Text>
                <Text span colors="white">35K</Text>
            </Text>
            <Text ta="center">
                <Twitch size="0.7rem" />
                <Text span colors="skyblue">X</Text>
                <Text span colors="white">35K</Text>
            </Text>
            <Text ta="center">
                <Twitch size="0.7rem" />
                <Text span colors="skyblue">YOUTUBE</Text>
                <Text span colors="white">35K</Text>
            </Text>
            <Text ta="center">
                <Twitch size="0.7rem" />
                <Text span colors="secondary">TIKTOK</Text>
                <Text span colors="white">35K</Text>
            </Text>
            <Text ta="center">
                <Twitch size="0.7rem" />
                <Text span colors="secondary">DISCORD</Text>
                <Text span colors="white">35K</Text>
            </Text>
        </div>
        <div className="flex_10">
            <Button variant="secondary">follow</Button>
            <Button variant="primary">sponsor</Button>
        </div>
    </ListviewStyles>
  )
}
