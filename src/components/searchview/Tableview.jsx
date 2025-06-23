import { ActionIcon, Group, Table, Text } from '@mantine/core';
import { Gamepad2, Handshake, Instagram, Music, Twitch, Twitter, UserCheck, Youtube } from 'lucide-react';
import Verifed from '../svg-icons/Verifed';
import Badge from '../svg-icons/Badge';
import BadgeLevels from '../svg-icons/LevelBadge';

const elements = [
  {
    name: 'NVIDIA',
    info: {
      country: 'USA',
      verified: true,
      badge: true,
    },
    socialLinks: [
      {
        name: 'twitch',
        follwers: '120k',
        icon: <Twitch size="0.7em" />,
        url: 'twitch.com/'
      },
      {
        name: 'instagram',
        follwers: '120k',
        icon: <Instagram size="0.7em" />,
        url: 'instagram.com/'
      },
      {
        name: 'twitter',
        follwers: '120k',
        icon: <Twitter size="0.7em" />,
        url: 'twitter.com/'
      },
      {
        name: 'youtube',
        follwers: '120k',
        icon: <Youtube size="0.7em" />,
        url: 'youtube.com/'
      },
      {
        name: 'tiktok',
        follwers: '120k',
        icon: <Music size="0.7em" />,
        url: 'youtube.com/'
      },
      {
        name: 'discord',
        follwers: '120k',
        icon: <Gamepad2 size="0.7em" />,
        url: 'dicord.com/'
      },
    ],
    score: 5,
  },
  {
    name: 'NVIDIA',
    info: {
      country: 'USA',
      verified: true,
      badge: true,
    },
    socialLinks: [
      {
        name: 'twitch',
        follwers: '120k',
        icon: <Twitch size="0.7em" />,
        url: 'twitch.com/'
      },
      {
        name: 'instagram',
        follwers: '120k',
        icon: <Instagram size="0.7em" />,
        url: 'instagram.com/'
      },
      {
        name: 'twitter',
        follwers: '120k',
        icon: <Twitter size="0.7em" />,
        url: 'twitter.com/'
      },
      {
        name: 'youtube',
        follwers: '120k',
        icon: <Youtube size="0.7em" />,
        url: 'youtube.com/'
      },
      {
        name: 'tiktok',
        follwers: '120k',
        icon: <Music size="0.7em" />,
        url: 'youtube.com/'
      },
      {
        name: 'discord',
        follwers: '120k',
        icon: <Gamepad2 size="0.7em" />,
        url: 'dicord.com/'
      },
    ],
    score: 4,
  },
  {
    name: 'NVIDIA',
    info: {
      country: 'USA',
      verified: true,
      badge: true,
    },
    socialLinks: [
      {
        name: 'twitch',
        follwers: '120k',
        icon: <Twitch size="0.7em" />,
        url: 'twitch.com/'
      },
      {
        name: 'instagram',
        follwers: '120k',
        icon: <Instagram size="0.7em" />,
        url: 'instagram.com/'
      },
      {
        name: 'twitter',
        follwers: '120k',
        icon: <Twitter size="0.7em" />,
        url: 'twitter.com/'
      },
      {
        name: 'youtube',
        follwers: '120k',
        icon: <Youtube size="0.7em" />,
        url: 'youtube.com/'
      },
      {
        name: 'tiktok',
        follwers: '120k',
        icon: <Music size="0.7em" />,
        url: 'youtube.com/'
      },
      {
        name: 'discord',
        follwers: '120k',
        icon: <Gamepad2 size="0.7em" />,
        url: 'dicord.com/'
      },
    ],
    score: 6,
  },
];

export default function Tableview() {

  const socialList = (socialLinks) => {
    let totalCount = socialLinks?.reduce((acc, curr) => acc + parseInt(curr.follwers), 0);
    return (
      <Group>
        <Text>{totalCount}K</Text>
        <Group gap={"sm"}>
          {socialLinks?.map(({ name, icon }) => (
            icon && <div key={name}>{icon}</div>
          ))}
        </Group>
      </Group>
    )
  }

  const rows = elements.map(({name, info, socialLinks, score}) => (
    <Table.Tr key={name}>
      <Table.Td>{name}</Table.Td>
      <Table.Td>
        <Group>
          <Text>{info.country}</Text>
          {info.verified && <Verifed />}
          {info.badge && <Badge />}
        </Group>
      </Table.Td>
      <Table.Td>{socialList(socialLinks)}</Table.Td>
      <Table.Td><BadgeLevels number={score} /></Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon color="secondary" size="sm" variant="filled" radius="md">
            <Handshake/>
          </ActionIcon>
          <ActionIcon color="primary" size="sm" variant="filled" radius="md">
            <UserCheck/>
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer>
      <Table withColumnBorders horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>NAME</Table.Th>
            <Table.Th>INFO</Table.Th>
            <Table.Th>GAMEIN FOLLOWERS</Table.Th>
            <Table.Th>G-SCORE</Table.Th>
            <Table.Th>INTERACT</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}
