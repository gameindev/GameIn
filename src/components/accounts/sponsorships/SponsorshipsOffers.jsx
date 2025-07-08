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
  Button,
  Divider,
  rem,
} from "@mantine/core";
import { ChevronDown, ChevronUp } from "lucide-react";
import { theme } from "../../../styles/theme/customTheme";
import HexContainer from "./../../shared/ui/HexContainer";
import { Check, Settings } from "lucide-react";
import { useSelector } from "react-redux";
import { currentUser } from "../../../stores/selectors";

const stepColors = ["#9D7FEF", "#69B3E7", "#5ce5b0"];
const statusStep = { Offered: 0, Pending: 1, Accepted: 2 };

const StepCalculator = ({ currentStep }) => {
  const totalSteps = 3;

  return (
    <Box
      ta="center"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5em",
        flex: 1,
      }}
    >
      {Array.from({ length: totalSteps }).map((_, stepIndex) => (
        <React.Fragment key={stepIndex}>
          <HexContainer
            size={30}
            background={
              stepIndex <= currentStep
                ? stepColors[stepIndex]
                : theme.colors.inputBgColor[0]
            }
          >
            <Text size="xs" fw={900} c={"#3C4044"}>
              {stepIndex + 1}
            </Text>
          </HexContainer>

          {stepIndex < totalSteps - 1 && (
            <Box
              style={{
                height: 2,
                flex: 1,
                backgroundColor:
                  stepIndex < currentStep
                    ? stepColors[stepIndex + 1]
                    : theme.colors.inputBgColor[0],
                borderRadius: 2,
                transition: "background-color 0.3s ease",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

const sponsorshipData = [
  {
    id: "1",
    sponsor: {
      name: "RED BULL",
      logo: "https://placehold.co/40x40/50565a/FFFFFF?text=RB",
    },
    type: "ULTIMATE SPONSORSHIP",
    status: "Accepted",
    edited: false,
    time: "00d 00h 05m",
    details: {
      description: "Premium branding, event presence, and exclusive benefits.",
      price: "$250.00",
      expectedStart: "2026-10-22",
      tasks: [
        { title: "LOGO PLACEMENT", desc: "Logo on stream overlay." },
        { title: "COMMERCIAL BREAK", desc: "Full-screen video slot." },
      ],
    },
  },
  {
    id: "2",
    sponsor: {
      name: "RED BULL",
      logo: "https://placehold.co/40x40/50565a/FFFFFF?text=RB",
    },
    type: "BASIC SPONSORSHIP",
    status: "Accepted",
    edited: false,
    time: "00d 00h 05m",
    details: {
      description: "Standard branding and event access.",
      price: "$100.00",
      expectedStart: "2026-09-05",
      tasks: [],
    },
  },
  {
    id: "3",
    sponsor: {
      name: "RED BULL",
      logo: "https://placehold.co/40x40/50565a/FFFFFF?text=RB",
    },
    type: "EASTER SPECIAL",
    status: "Pending",
    edited: true,
    time: "00d 00h 05m",
    details: {
      description:
        "This is the detailed information for the ultimate sponsorship package. It includes premium branding, event presence, and exclusive benefits.",
      price: "$150.00",
      expectedStart: "2025-07-10",
      tasks: [
        {
          title: "STREAMING: LOGO PLACEMENT",
          desc: "Logo in a 10-min Twitch shoutout (Dec)",
        },
        {
          title: "VIDEO: COMMERCIAL BREAK",
          desc: "1920x1080 fullscreen break in Twitch",
        },
        {
          title: "SOCIAL MEDIA: POSTING",
          desc: "1 daily portrait story on Instagram",
        },
      ],
    },
  },
  {
    id: "4",
    sponsor: {
      name: "RED BULL",
      logo: "https://placehold.co/40x40/50565a/FFFFFF?text=RB",
    },
    type: "XMAS TOURNAMENT",
    status: "Offered",
    time: "00d 00h 05m",
    edited: true,
    details: {
      description: "Christmas event sponsorship with promos.",
      price: "$180.00",
      expectedStart: "2025-07-01",
      tasks: [
        { title: "INSTAGRAM POST", desc: "Daily shoutout." },
        { title: "TWEET PROMOTION", desc: "Sponsored tweets." },
      ],
    },
  },
];

const getTimeRemaining = (futureDateString) => {
  const target = new Date(futureDateString);
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) return "00d 00h 00m";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return `${String(days).padStart(2, "0")}d ${String(hours).padStart(
    2,
    "0"
  )}h ${String(minutes).padStart(2, "0")}m`;
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function SponsorshipsOffers() {
  const [openedRow, setOpenedRow] = useState(null);
  const { user } = useSelector(currentUser);

  const toggleRow = (index) => {
    setOpenedRow((prev) => (prev === index ? null : index));
  };

  const EmptySeparator = () => <Box w={1} h={30} />;
  const Separator = () => (
    <Box w={1} h={30} style={{ borderLeft: "0.063rem dashed #50565a" }} />
  );

  return (
    <Box>
      {/* Header */}
      <Flex
        p="sm"
        tt={"uppercase"}
        fz={theme.fontSizes.xs}
        fw={500}
        align="center"
        gap="sm"
      >
        <Box flex={1}>Sponsor</Box>
        <EmptySeparator />
        <Box ta={"center"} flex={0.75}>
          Type
        </Box>
        <EmptySeparator />
        <Box flex={2.8}>
          <Flex justify={"space-between"} align="center">
            <Text>Offered</Text>
            <Text>Pending</Text>
            <Text>Accepted</Text>
          </Flex>
        </Box>
        <EmptySeparator />
        <Box flex={0.75} ta={"center"}>
          Starting
        </Box>
        <EmptySeparator />
        <Box ta={"center"} flex={1.5}>
          Interact
        </Box>
      </Flex>

      {/* Data Rows */}
      {sponsorshipData?.map((sponsorship, index) => (
        <Paper
          key={sponsorship.id}
          radius="md"
          mb="sm"
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

              <Box flex={0.75}>
                <Text fz={theme.fontSizes.xs}>{sponsorship.type}</Text>
              </Box>
              <Separator />

              <Flex flex={3} gap={"sm"} align="center">
                <StepCalculator currentStep={statusStep[sponsorship.status]} />
                {sponsorship.edited ? (
                  <Settings size={14} color={theme.colors.yellow[0]} />
                ) : (
                  <Check size={14} color={theme.colors.primary[0]} />
                )}
              </Flex>
              <Separator />

              <Box flex={0.75} ta={"center"}>
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
                <Flex justify="space-between" align="center">
                  <Group gap="0.3em">
                    <ActionIcon size="lg" color="inputBgColor" variant="filled">
                      <Text size="xs">View</Text>
                    </ActionIcon>
                    <ActionIcon size="lg" color="inputBgColor" variant="filled">
                      <Text size="xs">Interact</Text>
                    </ActionIcon>
                    {openedRow !== index && (
                      <>
                        {["Pending", "Offered"].includes(
                          sponsorship.status
                        ) && (
                          <ActionIcon
                            size="lg"
                            color="inputBgColor"
                            variant="filled"
                          >
                            <Text size="xs">Accept</Text>
                          </ActionIcon>
                        )}
                        <ActionIcon
                          size="lg"
                          color="inputBgColor"
                          variant="filled"
                        >
                          <Text size="xs">Inbox</Text>
                        </ActionIcon>

                        <ActionIcon
                          size="lg"
                          color="inputBgColor"
                          variant="filled"
                        >
                          <Text size="xs">Cancel</Text>
                        </ActionIcon>
                      </>
                    )}
                  </Group>
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
                </Flex>
              </Box>
            </Flex>

            <Collapse in={openedRow === index}>
              <Box py={rem(72)} px={rem(100)}>
                <Flex gap={"3rem"}>
                  <Box flex={2}>
                    <Text c={theme.colors.white[0]} size="lg" fw={500} mb="xs">
                      {user.username.toUpperCase()} {sponsorship.type} PACKAGE
                    </Text>
                    <Text c={theme.colors.white[0]} size="sm" mb="md">
                      {sponsorship.details.description}
                    </Text>

                    <Text size="2.5em" fw={700}>
                      {sponsorship.details.price}
                    </Text>
                    <Text size="sm" my={20}>
                      Expected Start:{" "}
                      <Text
                        span
                        fz={theme.fontSizes.xl}
                        c={theme.colors.primary[0]}
                        style={{ display: "block" }}
                      >
                        {formatDate(sponsorship.details.expectedStart)}
                      </Text>
                    </Text>
                    <Text size="sm" my={20}>
                      Time Remaining:{" "}
                      <Text
                        span
                        fz={theme.fontSizes.xl}
                        c={theme.colors.primary[0]}
                        style={{ display: "block" }}
                      >
                        {getTimeRemaining(sponsorship.details.expectedStart)}
                      </Text>
                    </Text>
                  </Box>
                  {/* Task list */}
                  <Box flex={2}>
                    {sponsorship?.details?.tasks?.map((task, i) => (
                      <>
                        <Flex gap={"md"}>
                          <Text c={theme.colors.primary[0]} span>
                            {String(i + 1).padStart(2, "0")}
                          </Text>
                          <Box key={i} mb="sm">
                            <Text mb={"xs"} c={theme.colors.white[0]} fw={500}>
                              {task.title}
                            </Text>
                            <Text size="sm">{task.desc}</Text>
                          </Box>
                        </Flex>
                        <Divider my="md" />
                      </>
                    ))}
                  </Box>
                  {["Pending", "Offered"].includes(sponsorship.status) && (
                    <Box flex={1} radius="md">
                      <Flex
                        w={rem(100)}
                        h={rem(100)}
                        bg={theme.colors.yellow[0]}
                        color={theme.colors.black[0]}
                        align="center"
                        direction={"column"}
                        mb="sm"
                        p={"md"}
                        style={{
                          borderRadius: theme.radius.md,
                        }}
                      >
                        <Settings
                          size={32}
                          stroke={theme.colors.secondaryGrey[0]}
                        />
                        <Text
                          ta={"center"}
                          fz={theme.fontSizes.sm}
                          lh={1}
                          c={theme.colors.secondaryGrey[0]}
                          fw={700}
                        >
                          Your offer had been edited
                        </Text>
                      </Flex>

                      <Text c={theme.colors.white[0]} size="sm" mt={4}>
                        Do you accept changes made by the sponsor to your
                        sponsorship agreement and activate the deal?
                      </Text>

                      <Flex direction={"column"} gap={theme.gap.sm} mt="sm">
                        <Group>
                          <Button
                            color={theme.colors.inputBgColor[0]}
                            size="xs"
                          >
                            Accept
                          </Button>
                        </Group>
                        <Group>
                          <Button
                            color={theme.colors.inputBgColor[0]}
                            size="xs"
                          >
                            Negotiate
                          </Button>
                        </Group>
                        <Group>
                          <Button
                            color={theme.colors.inputBgColor[0]}
                            size="xs"
                          >
                            Decline
                          </Button>
                        </Group>
                      </Flex>
                    </Box>
                  )}
                </Flex>
              </Box>
            </Collapse>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
