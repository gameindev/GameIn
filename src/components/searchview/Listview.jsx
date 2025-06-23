import styled from "styled-components"
import { theme } from "../../styles/theme/customTheme";
import AvatarSection from "../shared/ui/AvatarSection";
import creator from "../../assets/creators/creator_image.jpg";
import { Button, Group, RingProgress, Text } from "@mantine/core";
import Verifed from "../svg-icons/Verifed";
import Badge from "../svg-icons/Badge";
import BadgeLevels from "../svg-icons/LevelBadge";
import { User } from "lucide-react";
import { useMediaQuery } from '@mantine/hooks';

const ListviewStyles = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.sm};
  background-color: ${theme.colors.secondaryGrey[0]};
  gap: ${theme.gap.xs};

  .avatar, .levels, .progress, .social_info, .action_btns{
    flex: 1;
    text-align: center;
  }

  .list_content{
    flex: 1 0 25%;
  }

  .levels{
    border-left: 1px dashed ${theme.colors.inputBgColor[0]};
  }

  .progress{
    border-left: 1px dashed ${theme.colors.inputBgColor[0]};
    border-right: 1px dashed ${theme.colors.inputBgColor[0]};
    display: flex;
    justify-content: center;
  }

  .social_info{
    border-right: 1px dashed ${theme.colors.inputBgColor[0]};
    display: flex;
    padding: 0 ${theme.gap.xs} 0 0;
    flex-direction: column;
    gap: ${theme.gap.xxs};

    .follwers_list{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${theme.gap.xs};
    }
  }

  .action_btns{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    gap: 1em
  }
`;

export default function Listview({SocialInfo}) {
    const bigscreen = useMediaQuery('(min-width: 1680px)');
  return (
    <ListviewStyles>
        <AvatarSection className="avatar" avatar={creator} size="7em" />
        <div className="list_content">
            <Text c="white" size="xl">Instant Shock</Text>
            <Group>
                <Text size="sm">24</Text>
                <Verifed />
                <Badge />
            </Group>
            <Text size="sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</Text>
        </div>
        <div className="levels">
            <Text size="sm" ta="center" mb="xs">LEVEL</Text>
            <BadgeLevels width="3.125em" height="4.375em" />
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
        <div className="social_info">
            {SocialInfo.map(({text, icon, followers, color}) => (
                <Text className="follwers_list" ta="center" key={text}>
                    {icon}
                    <Text size="xs" span c={color}>{text}</Text>
                    <Text size="xs" span c="white">{followers}</Text>
                </Text>
            ))}
        </div>
        <div className="action_btns">
            <Button width="6.25em" variant="secondary">follow</Button>
            <Button width="6.25em" variant="primary">sponsor</Button>
        </div>
    </ListviewStyles>
  )
}
