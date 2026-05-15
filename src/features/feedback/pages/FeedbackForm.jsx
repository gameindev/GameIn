import {
    Box,
    Flex,
    Text,
    Table,
    Radio,
    Group,
    Button,
    Tooltip,
    Alert,
} from "@mantine/core";
import { RadarChart } from "@mantine/charts";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { theme } from "../../../shared/styles/theme/customTheme";
import { IconInfoCircle } from "@tabler/icons-react";
import routePaths from "../../../app/router/routes";
import {
    getSponsorshipFeedbackOrderContext,
    submitSponsorshipFeedback,
} from "../services/sponsorshipFeedback.service";

const CRITERIA = [
    "Communication",
    "Sponsorship Fulfillment",
    "Reliability",
    "Audience Impact",
    "Brand Fit / Content Quality",
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
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderIdParam = searchParams.get("orderId");
    const orderId = orderIdParam ? parseInt(orderIdParam, 10) : NaN;

    const [values, setValues] = useState(() =>
        Object.fromEntries(CRITERIA.map((c) => [c, 3]))
    );
    const [context, setContext] = useState(null);
    const [loadError, setLoadError] = useState(null);
    const [loadingContext, setLoadingContext] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitDone, setSubmitDone] = useState(false);
    /** Countdown seconds after a successful submit; null = no redirect (e.g. already submitted on load). */
    const [redirectSeconds, setRedirectSeconds] = useState(null);

    const loadContext = useCallback(async () => {
        if (!orderIdParam || Number.isNaN(orderId)) {
            setContext(null);
            setLoadError(null);
            return;
        }
        setLoadingContext(true);
        setLoadError(null);
        try {
            const data = await getSponsorshipFeedbackOrderContext(orderId);
            setContext(data);
            if (data?.already_submitted) {
                setSubmitDone(true);
            }
        } catch (e) {
            setLoadError(e?.response?.data?.message || e?.message || "Could not load this opportunity");
            setContext(null);
        } finally {
            setLoadingContext(false);
        }
    }, [orderId, orderIdParam]);

    useEffect(() => {
        setSubmitDone(false);
        setRedirectSeconds(null);
        setSubmitError(null);
    }, [orderIdParam]);

    useEffect(() => {
        loadContext();
    }, [loadContext]);

    useEffect(() => {
        if (redirectSeconds === null) return;
        if (redirectSeconds <= 0) {
            navigate(routePaths.ACCOUNTS.DASHBOARD.ROOT);
            return;
        }
        const t = setTimeout(() => setRedirectSeconds((s) => (s === null ? null : s - 1)), 1000);
        return () => clearTimeout(t);
    }, [redirectSeconds, navigate]);

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

    const handleSubmit = async () => {
        if (!orderIdParam || Number.isNaN(orderId)) return;
        setSubmitting(true);
        setSubmitError(null);
        try {
            await submitSponsorshipFeedback({
                offering_order_id: orderId,
                scores: { ...values },
            });
            setSubmitDone(true);
            setRedirectSeconds(5);
            await loadContext();
        } catch (e) {
            setSubmitError(
                e?.response?.data?.message ||
                    e?.message ||
                    "Could not submit feedback"
            );
        } finally {
            setSubmitting(false);
        }
    };

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

    const missingOrder = !orderIdParam || Number.isNaN(orderId);

    return (
        <Box p="md">
            {missingOrder && (
                <Alert color="yellow" mb="md" title="No opportunity selected">
                    Open this page from your delivered order notification or inbox message
                    (link includes an order id).
                </Alert>
            )}

            {!missingOrder && loadingContext && (
                <Text c="dimmed" mb="md">
                    Loading opportunity…
                </Text>
            )}

            {loadError && (
                <Alert color="red" mb="md" title="Unable to load">
                    {loadError}
                </Alert>
            )}

            {!missingOrder && context && !loadError && (
                <Alert color="blue" mb="md" variant="light">
                    <Text size="sm" fw={600}>
                        {context.order_title}
                    </Text>
                    {context.creator_username && (
                        <Text size="sm" mt={4}>
                            Creator: {context.creator_username}
                        </Text>
                    )}
                </Alert>
            )}

            {submitDone && (
                <Alert color="teal" mb="md" title="Thank you">
                    {redirectSeconds !== null ? (
                        <>
                            <Text size="sm">
                                Your feedback has been recorded for this sponsorship.
                            </Text>
                            {redirectSeconds > 0 ? (
                                <Text size="sm" mt="xs" fw={600}>
                                    Redirecting to the dashboard in {redirectSeconds} second
                                    {redirectSeconds === 1 ? "" : "s"}…
                                </Text>
                            ) : (
                                <Text size="sm" mt="xs" fw={600}>
                                    Taking you to the dashboard…
                                </Text>
                            )}
                        </>
                    ) : (
                        <Text size="sm">
                            You already submitted feedback for this opportunity.
                        </Text>
                    )}
                </Alert>
            )}

            {submitError && (
                <Alert color="red" mb="md" title="Submit failed">
                    {submitError}
                </Alert>
            )}

            <Flex gap="lg" align="flex-start" wrap={{ base: "wrap", md: "nowrap" }}>
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
                                                onChange={(e) =>
                                                    handleChange(c, e.currentTarget.value)
                                                }
                                                color="primary"
                                                disabled={submitDone || !!context?.already_submitted}
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
                    />
                </Box>

                <Group justify="center" mt="md">
                    <Button
                        variant="primary"
                        fullWidth
                        loading={submitting}
                        disabled={
                            submitDone ||
                            !!context?.already_submitted ||
                            missingOrder ||
                            !!loadError ||
                            loadingContext
                        }
                        onClick={handleSubmit}
                    >
                        submit
                    </Button>
                </Group>
            </Box>
        </Box>
    );
}
