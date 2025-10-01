import React, { useState } from "react";
import { Grid, Box, Center, Text, List, Switch, Flex } from "@mantine/core";
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
                    routePaths.ACCOUNTS.OFFERINGS.TPP_EDIT_OFFERING.replace(
                      ":username",
                      userProfile?.username
                    ).replace(":offeringId", offering.id)
                  )
                }
                style={{ height: "100%" }}
                background={`repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 10px), rgba(92, 229, 176, 0.15)`}
              >
                <Flex direction={"column"} h={"100%"}>
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
                      {offers.map((offer) => {
                        const previousVersions = offering.offering_offers
                          .filter(
                            (o) =>
                              o.offer_type === offer.offer_type &&
                              o.version < offer.version
                          )
                          .sort((a, b) => b.version - a.version);

                        const previousSize = previousVersions[0]?.size;
                        const sizeChanged =
                          previousSize && previousSize !== offer.size;

                        return (
                          <List.Item key={offer.id}>
                            <Text span c={theme.colors.white[0]}>
                              {offer.offer_type}
                            </Text>{" "}
                            – Logo placement on {offer.platform} for{" "}
                            {offer.time_mode} with{" "}
                            <Text
                              span
                              c={
                                sizeChanged
                                  ? theme.colors.yellow[0]
                                  : theme.colors.white[0]
                              }
                              fw={sizeChanged ? 700 : 400}
                            >
                              {offer.size}
                              {sizeChanged && " (updated)"}
                            </Text>{" "}
                            {showAllVersions && (
                              <Text span c="dimmed">
                                {" "}
                                (v{offer.version})
                              </Text>
                            )}
                          </List.Item>
                        );
                      })}
                    </List>
                  </Box>
                  <Box style={{ flexGrow: 1 }}></Box>
                  {offering.adjustment_count != 0 && (
                    <Box px="xl">
                      <Text size="xs">Changes made by brand</Text>
                    </Box>
                  )}
                </Flex>
              </StatBox>
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};

export default OfferingsPage;
