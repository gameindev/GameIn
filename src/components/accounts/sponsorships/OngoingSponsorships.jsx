import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Paper,
  Image,
  Collapse,
  ActionIcon,
  Group,
} from "@mantine/core";
import {
  ChevronDown,
  ChevronUp,
  FilePen,
  Save,
  MessageSquare,
  X,
} from "lucide-react";
import { theme } from "../../../styles/theme/customTheme";
import HexContainer from "./../../shared/ui/HexContainer";

export default function SponsorshipCards() {
  const [openedRow, setOpenedRow] = useState(null);

  const toggleRow = (index) => {
    setOpenedRow((prev) => (prev === index ? null : index));
  };

  const sponsorshipData = [
    {
      id: "1",
      sponsor: {
        name: "RED BULL",
        logo: "https://placehold.co/40x40/FF0000/FFFFFF?text=RB",
      },
      type: "ULTIMATE SPONSORSHIP",
      info: "Sponsorship contract description, etc",
      price: 50.0,
      time: "00d 00h 05m",
      details:
        "This is the detailed information for the ultimate sponsorship package. It includes premium branding, event presence, and exclusive benefits.",
    },
    {
      id: "2",
      sponsor: {
        name: "RED BULL",
        logo: "https://placehold.co/40x40/FF0000/FFFFFF?text=RB",
      },
      type: "BASIC SPONSORSHIP",
      info: "Sponsorship contract description, etc",
      price: 274.5,
      time: "00d 00h 05m",
      details:
        "Details about the basic sponsorship package. This provides standard branding and general event access.",
    },
    {
      id: "3",
      sponsor: {
        name: "RED BULL",
        logo: "https://placehold.co/40x40/FF0000/FFFFFF?text=RB",
      },
      type: "EASTER SPECIAL",
      info: 'Price Pool Sponsorship for event, "C&C Tournament 2025"',
      price: 1300.0,
      time: "00d 00h 05m",
      details:
        "Special Easter event sponsorship details. This package is specifically designed for the C&C Tournament 2025, contributing to the prize pool.",
    },
    {
      id: "4",
      sponsor: {
        name: "RED BULL",
        logo: "https://placehold.co/40x40/FF0000/FFFFFF?text=RB",
      },
      type: "XMAS TOURNAMENT",
      info: "Sponsorship contract description, etc",
      price: 150.0,
      time: "00d 00h 05m",
      details:
        "Christmas tournament sponsorship information. This package supports the annual Christmas event with promotional opportunities.",
    },
  ];

  const EmptySeparator = () => <Box w={1} h={30} />;
  const Separator = () => (
    <Box w={1} h={30} style={{ borderLeft: "0.063rem dashed #50565a" }} />
  );

  const formatStyledPrice = (price) => {
    const [whole, decimal] = price.toFixed(2).split(".");

    return (
      <Text
        component="span"
        fz={theme.fontSizes.lg}
        fw={700}
        c={theme.colors.primary[0]}
      >
        ${whole}.
        <Text
          component="span"
          fz={theme.fontSizes.sm}
          fw={400}
          c="teal"
          style={{ opacity: 0.8 }}
        >
          {decimal}
        </Text>
      </Text>
    );
  };

  return (
    <Box>
      {/* Header */}
      <Flex p="sm" fw={500} align="center" gap="sm">
        <Box flex={1}>Sponsor</Box>
        <EmptySeparator />
        <Box flex={1}>Type</Box>
        <EmptySeparator />
        <Box flex={2}>Info</Box>
        <EmptySeparator />
        <Box flex={0.75} ta={"right"}>
          Price (USD)
        </Box>
        <EmptySeparator />
        <Box flex={1} ta={"center"}>
          Time
        </Box>
        <EmptySeparator />
        <Box flex={1.5}>Interact</Box>
      </Flex>

      {/* Data Rows */}
      {sponsorshipData.map((sponsorship, index) => (
        <Paper
          key={sponsorship.id}
          radius="md"
          mb="8px"
          bg={theme.colors.accordionBg[0]}
        >
          <Box>
            <Flex
              p="0.5em"
              pl={"1.25em"}
              align="center"
              gap="sm"
              wrap="nowrap"
              style={{ cursor: "pointer" }}
            >
              <Box flex={1}>
                <Group>
                  <HexContainer size={40}>
                    <Image
                      src={sponsorship.sponsor.logo}
                      alt={sponsorship.sponsor.name}
                      width={40}
                      height={40}
                    />
                  </HexContainer>
                  <Text fz={theme.fontSizes.xs}>
                    {sponsorship.sponsor.name}
                  </Text>
                </Group>
              </Box>
              <Separator />

              <Box flex={1}>
                <Text fz={theme.fontSizes.xs}>{sponsorship.type}</Text>
              </Box>
              <Separator />

              <Box flex={2}>
                <Text fz={theme.fontSizes.md}>{sponsorship.info}</Text>
              </Box>
              <Separator />

              <Box flex={0.75} ta={"right"}>
                <Text
                  fz={theme.fontSizes.sm}
                  fw={700}
                  c={theme.colors.primary[0]}
                >
                  {formatStyledPrice(sponsorship.price)}
                </Text>
              </Box>
              <Separator />

              <Box flex={1} ta={"center"}>
                <Text
                  fz={theme.fontSizes.sm}
                  fw={700}
                  c={theme.colors.primary[0]}
                >
                  {sponsorship.time}
                </Text>
              </Box>
              <Separator />

              <Box flex={1.5}>
                <Group gap="0.3em">
                  <ActionIcon size="lg" color="inputBgColor" variant="filled">
                    <Text size="xs">View</Text>
                  </ActionIcon>
                  <ActionIcon size="lg" color="inputBgColor" variant="filled">
                    <Text size="xs">Interact</Text>
                  </ActionIcon>
                  <ActionIcon size="lg" color="inputBgColor" variant="filled">
                    <Text size="xs">Inbox</Text>
                  </ActionIcon>
                  <ActionIcon size="lg" color="inputBgColor" variant="filled">
                    <Text size="xs">Cancel</Text>
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    onClick={() => toggleRow(index)}
                    aria-label="Toggle row"
                  >
                    {openedRow === index ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </ActionIcon>
                </Group>
              </Box>
            </Flex>

            <Collapse in={openedRow === index}>
              <Box p="sm">
                <Text size="sm" c="dimmed">
                  {sponsorship.details}
                </Text>
              </Box>
            </Collapse>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
