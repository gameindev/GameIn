import {
  Box,
  Flex,
  Text,
  Table,
  Radio,
  Group,
  Button,
  Tooltip,
} from "@mantine/core";
import { RadarChart } from "@mantine/charts";
import { useMemo, useState } from "react";
import { theme } from "../../../shared/styles/theme/customTheme";
import { IconInfoCircle } from "@tabler/icons-react";

const CRITERIA = [
  "Communication",
  "Sponsorship Fulfillment",
  "Creativity",
  "Audience Impact",
  "Collaboration Quality",
  "Professionalism / Attitude",
];

const SCALE = [
  { value: 1, label: "strongly disagree" },
  { value: 2, label: "disagree" },
  { value: 3, label: "neutral" },
  { value: 4, label: "agree" },
  { value: 5, label: "strongly agree" },
];

export default function FeedbackForm() {
  const [values, setValues] = useState(() =>
    Object.fromEntries(CRITERIA.map((c) => [c, 3]))
  );

  const handleChange = (criterion, val) =>
    setValues((prev) => ({ ...prev, [criterion]: Number(val) }));

  const chartData = useMemo(
    () => CRITERIA.map((c) => ({ criterion: c, Score: values[c] ?? 0 })),
    [values]
  );

  const averageScore = useMemo(() => {
    const scores = Object.values(values);
    const total = scores.reduce((sum, n) => sum + n, 0);
    return (total / scores.length).toFixed(2);
  }, [values]);

  const tableHeader = (
    <Table.Thead>
      <Table.Tr>
        <Table.Th style={{ width: 220 }}>Criteria</Table.Th>
        {SCALE.map((s) => (
          <Table.Th key={s.value} ta="center">
            <Text
              fz="xs"
              c={theme.colors.text[0]}
              tt="lowercase"
              style={{ textTransform: "none" }}
            >
              {s.label}
            </Text>
          </Table.Th>
        ))}
      </Table.Tr>
    </Table.Thead>
  );

  return (
    <Box p="md">
      {/* Header */}

      <Flex gap="lg" align="flex-start" wrap={{ base: "wrap", md: "nowrap" }}>
        {/* Form table */}
        <Box
          flex={2}
          bg={theme.colors.accordionBg[0]}
          p="md"
          style={{ borderRadius: theme.radius.md }}
        >
          <Table
            withRowBorders={false}
            w="30rem"
            mx="auto"
            verticalSpacing="md"
          >
            {tableHeader}

            <Table.Tbody>
              {CRITERIA.map((c) => (
                <Table.Tr key={c}>
                  <Table.Td>
                    <Flex align="center" gap="xs">
                      <Text fw={600} c={theme.colors.white[0]}>
                        {c}
                      </Text>
                      <Tooltip label={c} withArrow>
                        <Box c="dimmed">
                          <IconInfoCircle size={14} />
                        </Box>
                      </Tooltip>
                    </Flex>
                  </Table.Td>

                  {SCALE.map((s) => (
                    <Table.Td
                      w={50}
                      key={s.value}
                      ta="center"
                      style={{ justifyItems: "center" }}
                    >
                      <Radio
                        name={c}
                        value={String(s.value)}
                        checked={(values[c] ?? 0) === s.value}
                        onChange={(e) => handleChange(c, e.currentTarget.value)}
                        color="primary"
                      />
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>
      </Flex>
      <Box
        flex={1}
        bg={theme.colors.accordionBg[0]}
        p="md"
        ta={"center"}
        style={{ borderRadius: theme.radius.md }}
      >
        <Text tt="lowercase" fw={700} style={{ textTransform: "none" }}>
          rating
        </Text>
        <Text fw={700} fz="xl" mt="xs" c={theme.colors.white[0]}>
          Average Score: {averageScore}
        </Text>
        <Box mt="sm" style={{ height: 300 }}>
          <RadarChart
            h={300}
            data={chartData}
            dataKey="criterion"
            series={[{ name: "Score", color: "white.0", opacity: 0.3 }]}
            withPolarRadiusAxis
            max={5}
            withPolarGrid
            polarRadiusAxisProps={{
              domain: [0, 5],
              stroke: "transparent",
              tick: false,
              tickCount: 5,
              ticks: [1, 2, 3, 4, 5],
            }}
            levels={5}
            withDots
            withTooltip
            // gridColor="primary.0"
          />
        </Box>

        <Group justify="center" mt="md">
          <Button variant="primary" fullWidth>
            submit
          </Button>
        </Group>
      </Box>
    </Box>
  );
}
