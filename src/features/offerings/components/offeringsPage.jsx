import React, { useState } from "react";
import { Grid, Box, Center, Text, List, Switch } from "@mantine/core";
import SponsorshipOpportunityCard from "../../../components/accounts/offerings/SponsorshipOpportunityCard";
import StatBox from "../../../components/shared/ui/StatBox";
import IconButton from "../../../components/shared/ui/IconButton";
import Preloader from "../../../components/shared/ui/Preloader";
import { useOfferings } from "../hooks/useOfferings";
import { theme } from "../../../styles/theme/customTheme";
import { IconCheck } from "@tabler/icons-react";
import { useNavigate, useOutletContext } from "react-router";
import routePaths from "../../../routes/endpoints";
import { offeringService } from "../services/offeringService";

const OfferingsPage = () => {
  const { userProfile, isSelf } = useOutletContext();
  const { offerings, loading, error } = useOfferings({
    userId: userProfile?.id,
  });
  const navigate = useNavigate();

  const [showAllVersions, setShowAllVersions] = useState(false);

  if (loading) return <Preloader />;
  if (error) {
    return (
      <Center mih={200}>
        <Text c="dimmed" fw={500} size="md">
          Something went wrong while fetching offerings. Please try again later.
        </Text>
      </Center>
    );
  }

  if (!loading && offerings.length === 0 && !isSelf) {
    return (
      <Center mih={200}>
        <Text c="dimmed" fw={500} size="md">
          No offerings found
        </Text>
      </Center>
    );
  }

  return (
    <>
      <Box mb="md" px="xl">
        <Switch
          checked={showAllVersions}
          onChange={(event) => setShowAllVersions(event.currentTarget.checked)}
          label="Show all offer versions"
        />
      </Box>

      <Grid gutter={20}>
        {isSelf && (
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <StatBox
              title="Sponsorships"
              background={`repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 10px), rgba(92, 229, 176, 0.4)`}
            >
              <SponsorshipOpportunityCard />
            </StatBox>
          </Grid.Col>
        )}

        {offerings.map((offering) => {
          const price = offering.offering_price?.price || "0";

          const offers = showAllVersions
            ? offeringService.getAllOffers(offering.offering_offers)
            : offeringService.getLatestOffers(offering.offering_offers);

          return (
            <Grid.Col key={offering.id} span={{ base: 12, md: 6, lg: 4 }}>
              <StatBox
                title={`S${String(offering.id).padStart(2, "0")}`}
                action={
                  isSelf ? (
                    <IconButton hoverClass="hoverYellow" onClick={() => {}} />
                  ) : null
                }
                actionCTA={!isSelf}
                onSponsorClick={() =>
                  navigate(
                    routePaths.ACCOUNTS.OFFERINGS.EDIT_OFFERING.replace(
                      ":username",
                      userProfile?.username
                    ).replace(":offeringId", offering.id)
                  )
                }
                background={`repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 10px), rgba(92, 229, 176, 0.15)`}
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
                    icon={
                      <IconCheck size={14} color={theme.colors.primary[0]} />
                    }
                  >
                    {offers.map((o) => (
                      <List.Item key={o.id}>
                        <Text span c={theme.colors.white[0]}>
                          {o.offer_type}
                        </Text>{" "}
                        – Logo placement on {o.platform} for {o.time_mode} with{" "}
                        {o.size} {showAllVersions && `(v${o.version})`}
                      </List.Item>
                    ))}
                  </List>
                </Box>
              </StatBox>
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};

export default OfferingsPage;
