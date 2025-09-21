import { ActionIcon, Group, Table, Text } from "@mantine/core";
import Verifed from "../svg-icons/Verifed";
import Badge from "../svg-icons/Badge";
import BadgeLevels from "../svg-icons/LevelBadge";
import { useContext, useMemo } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useSelector } from "react-redux";
import { currentUser } from "../../stores/selectors";
import {
  IconBrandInstagram,
  IconBrandTwitch,
  IconBrandTwitter,
  IconBrandYoutube,
  IconDeviceGamepad,
  IconHeartHandshake,
  IconMusic,
  IconUserCheck,
} from "@tabler/icons-react";

const elements = [
  {
    name: "NVIDIA",
    info: {
      country: "USA",
      verified: true,
      badge: true,
    },
    socialLinks: [
      {
        name: "twitch",
        follwers: "120k",
        icon: <IconBrandTwitch size="0.7em" />,
        url: "twitch.com/",
      },
      {
        name: "instagram",
        follwers: "120k",
        icon: <IconBrandInstagram size="0.7em" />,
        url: "instagram.com/",
      },
      {
        name: "twitter",
        follwers: "120k",
        icon: <IconBrandTwitter size="0.7em" />,
        url: "twitter.com/",
      },
      {
        name: "youtube",
        follwers: "120k",
        icon: <IconBrandYoutube size="0.7em" />,
        url: "youtube.com/",
      },
      {
        name: "tiktok",
        follwers: "120k",
        icon: <IconMusic size="0.7em" />,
        url: "youtube.com/",
      },
      {
        name: "discord",
        follwers: "120k",
        icon: <IconDeviceGamepad size="0.7em" />,
        url: "dicord.com/",
      },
    ],
    score: 5,
  },
  {
    name: "NVIDIA",
    info: {
      country: "USA",
      verified: true,
      badge: true,
    },
    socialLinks: [
      {
        name: "twitch",
        follwers: "120k",
        icon: <IconBrandTwitch size="0.7em" />,
        url: "twitch.com/",
      },
      {
        name: "instagram",
        follwers: "120k",
        icon: <IconBrandInstagram size="0.7em" />,
        url: "instagram.com/",
      },
      {
        name: "twitter",
        follwers: "120k",
        icon: <IconBrandTwitter size="0.7em" />,
        url: "twitter.com/",
      },
      {
        name: "youtube",
        follwers: "120k",
        icon: <IconBrandYoutube size="0.7em" />,
        url: "youtube.com/",
      },
      {
        name: "tiktok",
        follwers: "120k",
        icon: <IconMusic size="0.7em" />,
        url: "youtube.com/",
      },
      {
        name: "discord",
        follwers: "120k",
        icon: <IconDeviceGamepad size="0.7em" />,
        url: "dicord.com/",
      },
    ],
    score: 4,
  },
  {
    name: "NVIDIA",
    info: {
      country: "USA",
      verified: true,
      badge: true,
    },
    socialLinks: [
      {
        name: "twitch",
        follwers: "120k",
        icon: <IconBrandTwitch size="0.7em" />,
        url: "twitch.com/",
      },
      {
        name: "instagram",
        follwers: "120k",
        icon: <IconBrandInstagram size="0.7em" />,
        url: "instagram.com/",
      },
      {
        name: "twitter",
        follwers: "120k",
        icon: <IconBrandTwitter size="0.7em" />,
        url: "twitter.com/",
      },
      {
        name: "youtube",
        follwers: "120k",
        icon: <IconBrandYoutube size="0.7em" />,
        url: "youtube.com/",
      },
      {
        name: "tiktok",
        follwers: "120k",
        icon: <IconMusic size="0.7em" />,
        url: "youtube.com/",
      },
      {
        name: "discord",
        follwers: "120k",
        icon: <IconDeviceGamepad size="0.7em" />,
        url: "dicord.com/",
      },
    ],
    score: 6,
  },
];

export default function Tableview() {
  const { user } = useSelector(currentUser);
  const { searchData } = useContext(SearchContext);

  const filteredSearchData = useMemo(() => {
    return searchData?.filter(({ id }) => id !== user.id);
  }, [searchData, user.id]);

  const socialList = (socialLinks) => {
    let totalCount = socialLinks?.reduce(
      (acc, curr) => acc + parseInt(curr.follwers),
      0
    );
    return (
      <Group>
        <Text>{totalCount}K</Text>
        <Group gap={"sm"}>
          {socialLinks?.map(
            ({ name, icon }) => icon && <div key={name}>{icon}</div>
          )}
        </Group>
      </Group>
    );
  };

  const rows = filteredSearchData.map(({ id, username, isVerified }) => (
    <Table.Tr key={id}>
      <Table.Td>{username}</Table.Td>
      <Table.Td>
        <Group>
          <Text>USA</Text>
          {isVerified && <Verifed />}
          <Badge />
        </Group>
      </Table.Td>
      <Table.Td>{socialList(elements[0].socialLinks)}</Table.Td>
      <Table.Td>
        <BadgeLevels number="4" />
      </Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon color="secondary" size="sm" variant="filled" radius="md">
            <IconHeartHandshake />
          </ActionIcon>
          <ActionIcon color="primary" size="sm" variant="filled" radius="md">
            <IconUserCheck />
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
  );
}
