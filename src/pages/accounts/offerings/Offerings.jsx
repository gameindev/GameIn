import { useEffect, useState } from "react";
import { Text, Grid, Group, List, Button, Box } from "@mantine/core";
import SponsorshipOpportunityCard from "../../../components/accounts/offerings/SponsorshipOpportunityCard";
import IconButton from "../../../components/shared/ui/IconButton";
import StatBox from "../../../components/shared/ui/StatBox";
import useApi from "../../../hooks/useApi";
import { API_PATHS } from "../../../services/endpoints";
import { CheckCheckIcon } from "lucide-react";
import { theme } from "../../../styles/theme/customTheme";
import { useSelector } from "react-redux";
import { currentUser } from "../../../stores/selectors";

export default function Offerings() {
  const { get } = useApi();
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(currentUser);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const data = await get(
          `${API_PATHS.OFFERINGS.LIST}?page=1&limit=20&user_id=${user.id}&relations=user&relations=offering_offers&relations=offering_price`
        );

        const myOfferings = data?.data?.data || [];
        // const myOfferings = allOfferings.filter(
        //   (offering) => offering.user?.id === user?.id
        // );
        console.log("Offerings Data:", data?.data?.data);
        setOfferings(myOfferings || []);
      } catch (error) {
        console.error("Error fetching offerings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferings();
  }, [user?.id]);

  if (loading) return <Text>Loading...</Text>;

  return (
    <Grid gutter={20}>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <StatBox
          title="Sponsorships"
          background={`repeating-linear-gradient( 45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1px,
              transparent 1px,
              transparent 10px), rgba(92, 229, 176, 0.4)`}
        >
          <SponsorshipOpportunityCard />
        </StatBox>
      </Grid.Col>

      {offerings.map((offering, idx) => {
        const price = offering.offering_price?.price || "0";
        const offers = offering.offering_offers || [];

        return (
          <Grid.Col key={offering.id || idx} span={{ base: 12, md: 6, lg: 4 }}>
            <StatBox
              title={`S${String(offering.id).padStart(2, "0")}`}
              action={<IconButton onClick={() => {}} />}
              actionCTA={true}
              background={`repeating-linear-gradient( 45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1px,
              transparent 1px,
              transparent 10px), rgba(92, 229, 176, 0.15)`}
            >
              <Box p={"xl"}>
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
                  icon={<CheckCheckIcon size={14} color="green" />}
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
