import creator from "../../assets/creators/creator_image.jpg";
import AvatarSection from "../shared/ui/AvatarSection";
import { theme } from "../../styles/theme/customTheme";
import styled from "styled-components";
import { Button, Group, RingProgress, Text } from "@mantine/core";
import Verifed from "../svg-icons/Verifed";
import Badge from "../svg-icons/Badge";
import { useMediaQuery } from "@mantine/hooks";
import { User } from "lucide-react";
import BadgeLevels from "../svg-icons/LevelBadge";


const GridStyles = styled.div`
  padding: 2em;
  background-color: ${theme.colors.secondaryGrey[0]};
  border-radius: ${theme.radius.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.gap.xs};

  .avatar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .title{
      display: flex;
      flex-direction: column;
      gap: ${theme.gap.xxs};
    }
  }

  .information{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 
    align-items: center;
    gap: ${theme.gap.xs};

    .social_info{
      display: flex;
      padding: 0 ${theme.gap.xs} 0 0;
      flex-direction: column;
      gap: ${theme.gap.xxs};

      .follwers_list{
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: ${theme.gap.xs};
      }
    }

    .progress{
      border-left: 1px dashed ${theme.colors.inputBgColor[0]};
      border-right: 1px dashed ${theme.colors.inputBgColor[0]};
      display: flex;
      justify-content: center;
    }
  }
`;

export default function Gridview({ SocialInfo }) {
  const bigscreen = useMediaQuery('(min-width: 1680px)');
  return (
    <GridStyles>
      <div className="avatar">
        <AvatarSection className="avatar" avatar={creator} size="7em" />
        <div className="title">
          <Text c="white" size="xl">Instant <br /> Shock</Text>
          <Group>
            <Text size="sm">24</Text>
            <Verifed />
            <Badge />
          </Group>
        </div>
      </div>
      <Text size="sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat...</Text>
      <div className="information">
        <div className="social_info">
          {SocialInfo.map(({ text, icon, followers, color }) => (
            <Text className="follwers_list" ta="center" key={text}>
              {icon}
              <Text size="xs" span c={color}>{text}</Text>
              <Text size="xs" span c="white">{followers}</Text>
            </Text>
          ))}
        </div>
        <div className="progress">
          <RingProgress
            size={bigscreen ? 120 : 90}
            thickness={5}
            roundCaps
            label={
              <>
                <Text size={bigscreen ? "md" : "sm"} ta="center" c="white"> 1.5M</Text>
                <Text size={bigscreen ? "sm" : "xs"} ta="center">FOLLOWERS</Text>
                <Text size={bigscreen ? "sm" : "xs"} ta="center"><User /></Text>
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
        <div className="levels">
          <Text size="sm" ta="center" mb="xs">LEVEL</Text>
          <BadgeLevels width="3.125em" height="4.375em" />
        </div>
      </div>
      <Group className="action_btns">
          <Button width="6.25em" variant="secondary">follow</Button>
          <Button width="6.25em" variant="primary">sponsor</Button>
      </Group>
    </GridStyles>
  )
}
