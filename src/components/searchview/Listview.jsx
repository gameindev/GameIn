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
`;

export default function Listview() {
  return (
    <ListviewStyles>
        <AvatarSection avatar={creator} size="7em" />
        <div>
            <Text colors="white" size="xl">Instant Shock</Text>
            <Group>
                <Text>24</Text>
                <Verifed />
                <Badge />
            </Group>
            <Text size="sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</Text>
        </div>
        <div>
            <Text size="sm">LEVEL</Text>
            <BadgeLevels />
        </div>
        <div>
            <RingProgress
                size={120}
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
        <div>
            <Text>
                <Twitch size="0.7rem" />
                <Text span colors="primary">TWITCH</Text>
                <Text span colors="white">35K</Text>
            </Text>
            <Text>
                <Twitch size="0.7rem" />
                <Text span colors="primary">INSTAGRAM</Text>
                <Text span colors="white">35K</Text>
            </Text>
            <Text>
                <Twitch size="0.7rem" />
                <Text span colors="skyblue">X</Text>
                <Text span colors="white">35K</Text>
            </Text>
            <Text>
                <Twitch size="0.7rem" />
                <Text span colors="skyblue">YOUTUBE</Text>
                <Text span colors="white">35K</Text>
            </Text>
            <Text>
                <Twitch size="0.7rem" />
                <Text span colors="secondary">TIKTOK</Text>
                <Text span colors="white">35K</Text>
            </Text>
            <Text>
                <Twitch size="0.7rem" />
                <Text span colors="secondary">DISCORD</Text>
                <Text span colors="white">35K</Text>
            </Text>
        </div>
        <div>
            <Button variant="secondary">follow</Button>
            <Button variant="primary">sponsor</Button>
        </div>
    </ListviewStyles>
  )
}
