import { useEffect, useState } from "react";
import { Text, Grid, List, Box, Center } from "@mantine/core";
import SponsorshipOpportunityCard from "../../../components/accounts/offerings/SponsorshipOpportunityCard";
import IconButton from "../../../components/shared/ui/IconButton";
import StatBox from "../../../components/shared/ui/StatBox";
import useApi from "../../../hooks/useApi";
import { API_PATHS } from "../../../services/endpoints";
import { theme } from "../../../styles/theme/customTheme";
import { IconCheck } from "@tabler/icons-react";
import { useOutletContext } from "react-router";

export default function Offerings() {
  const { get } = useApi();
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userProfile, isSelf } = useOutletContext();

  useEffect(() => {
    const fetchOfferings = async () => {
      if (!userProfile?.id) return;

      try {
        const data = await get({
          url: API_PATHS.OFFERINGS.LIST,
          params: {
            page: 1,
            limit: 20,
            user_id: userProfile.id,
            relations: ["user", "offering_offers", "offering_price"],
          },
        });
        setOfferings(data?.data?.data || []);
      } catch (error) {
        console.error("Error fetching offerings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferings();
  }, [userProfile?.id]);

  if (loading) return <Text>Loading...</Text>;

  if (!loading && offerings.length === 0) {
    return (
      <Center mih={200}>
        <Text c="dimmed" fw={500} size="md">
          No offerings found
        </Text>
      </Center>
    );
  }

  return (
    <Grid gutter={20}>
      {isSelf && (
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <StatBox
            title="Sponsorships"
            background={`repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1px,
              transparent 1px,
              transparent 10px), rgba(92, 229, 176, 0.4)`}
          >
            <SponsorshipOpportunityCard />
          </StatBox>
        </Grid.Col>
      )}

      {offerings.map((offering, idx) => {
        const price = offering.offering_price?.price || "0";
        const offers = offering.offering_offers || [];

        return (
          <Grid.Col key={offering.id || idx} span={{ base: 12, md: 6, lg: 4 }}>
            <StatBox
              title={`S${String(offering.id).padStart(2, "0")}`}
              action={
                isSelf ? (
                  <IconButton hoverClass="hoverYellow" onClick={() => {}} />
                ) : null
              }
              actionCTA={!isSelf}
              background={`repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1px,
              transparent 1px,
              transparent 10px), rgba(92, 229, 176, 0.15)`}
            >
              <Box p="xl">
                <Text c={theme.colors.white[0]} fw={700} size="lg" mb="xs">
                  $ {price}
                </Text>
                <Text fw={600} size="sm" mb={4} lineClamp={1}>
                  {offering.title}
                </Text>
                <Text size="xs" c="dimmed" mb="md" lineClamp={2}>
                  {offering.description}
                </Text>
                <Text c={theme.colors.primary[0]} fw={500} size="xs" mb={4}>
                  OFFERING:
                </Text>
                <List
                  size="xs"
                  spacing="xs"
                  icon={<IconCheck size={14} color={theme.colors.primary[0]} />}
                >
                  {offers.map((o) => (
                    <List.Item key={o.id}>
                      <Text span c={theme.colors.white[0]}>
                        {o.offer_type}
                      </Text>{" "}
                      – Logo placement on {o.platform} for {o.time_mode} with{" "}
                      {o.size}
                    </List.Item>
                  ))}
                </List>
              </Box>
            </StatBox>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
