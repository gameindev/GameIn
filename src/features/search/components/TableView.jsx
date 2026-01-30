import { ActionIcon, Group, Table, Text } from "@mantine/core";
import { currentUser } from "../../auth/store/selector";
import { useAppSelector } from "../../../app/store/hooks";
import { useContext, useMemo } from "react";
import { SearchContext } from "../../../shared/context/searchContext";
import Badge from "../../../shared/components/svg-icons/Badge";
import BadgeLevels from "../../../shared/components/svg-icons/LevelBadge";
import Verifed from "../../../shared/components/svg-icons/Verifed";
import {
  IconHeartHandshake,
  IconMessage,
  IconPlus,
  IconUserCheck,
} from "@tabler/icons-react";
import { Bold } from "lucide-react";
import IconButton from "../../../shared/components/IconButton";
import { getFollowerStats } from "../../../app/services/user/user-follower.service";
import { Link, useNavigate } from "react-router";
import CountryFlag from "../../../shared/components/CountryFlag";
import routeService from "../../../app/services/route/routeService";

export const Tableview = () => {
  const user = useAppSelector(currentUser);
  const navigate = useNavigate();
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

  const rows = filteredSearchData.map((userItem) => {
    const { id, username, is_verified } = userItem;
    const { totalFollowers } = getFollowerStats(userItem);
    const profile =
          userItem.creator_profile ||
          userItem.brand_profile ||
          userItem.community_profile;

    return (
      <Table.Tr key={id}>
        <Table.Td>
          <Link to={`/${username}/profile`} style={{ textDecoration: "none" }}>
            {username}
          </Link>
        </Table.Td>
        <Table.Td>
          <Group>
            {profile?.country && (
              <div className="nationality">
                {
                  <CountryFlag
                    countryCode={profile?.country.toUpperCase()}
                    size={16}
                  />
                }
              </div>
            )}
            {is_verified && <Verifed />}
            <Badge />
          </Group>
        </Table.Td>
        <Table.Td>{totalFollowers}</Table.Td>
        <Table.Td>
          <BadgeLevels number="4" />
        </Table.Td>
        <Table.Td>
          <Group>
            <IconButton
              size="22"
              Icon={IconMessage}
              hoverClass="hoverYellow"
              iconSize="12"
              onClick={() => routeService.messageRoute(id, navigate, user)}
            />
            <ActionIcon
              color="secondary"
              size="sm"
              variant="filled"
              radius="md"
            >
              <IconPlus size="12" color="#363a3e" />
            </ActionIcon>
            <ActionIcon color="primary" size="sm" variant="filled" radius="md">
              <Text size="10" style={{ color: "#363a3e", fontWeight: "bold" }}>
                S
              </Text>
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

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
};
