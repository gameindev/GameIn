import {
    IconCurrencyDollar,
    IconHeartHandshake,
    IconInfoCircle,
    IconTrendingUp,
    IconUsers,
    IconWallet,
} from "@tabler/icons-react";
import { Box, Flex, Loader, SimpleGrid, Stack, Text, Tooltip } from "@mantine/core";
import { useMemo } from "react";
import { theme } from "../../../shared/styles/theme/customTheme";
import usePaymentAnalytics from "../../settings/payment/hooks/usePaymentAnalytics";
import { buildSponsorshipKpiCards } from "../../settings/payment/utils/paymentAnalytics.utils";

const ICON_WRAP = {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "rgba(92, 229, 176, 0.14)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
};

function KpiCard({ icon: Icon, label, value, trend, tooltip }) {
    return (
        <Box
            p="md"
            style={{
                background: theme.colors.secondaryGrey[0],
                borderRadius: theme.radius.md,
                border: "1px solid rgba(255,255,255,0.06)",
                height: "100%",
                minWidth: 0,
            }}
        >
            <Flex align="center" gap="md" wrap="nowrap">
                <Box style={ICON_WRAP}>
                    <Icon size={22} color={theme.colors.primary[0]} stroke={1.75} />
                </Box>
                <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Flex align="center" gap={6} wrap="nowrap">
                        <Text size="xs" c="dimmed" tt="capitalize" lineClamp={1}>
                            {label}
                        </Text>
                        {tooltip ? (
                            <Tooltip label={tooltip} multiline w={260}>
                                <Flex component="span" align="center" style={{ lineHeight: 0, cursor: "help" }}>
                                    <IconInfoCircle size={13} color={theme.colors.text[0]} style={{ opacity: 0.55 }} />
                                </Flex>
                            </Tooltip>
                        ) : null}
                    </Flex>
                    <Text fw={700} fz="xl" c="white" lh={1.2} style={{ fontFeatureSettings: '"tnum"' }}>
                        {value}
                    </Text>
                    {trend?.text ? (
                        <Text size="xs" c={trend.up ? "teal.4" : "red.4"} lh={1.3}>
                            {trend.text}
                        </Text>
                    ) : null}
                </Stack>
            </Flex>
        </Box>
    );
}

/**
 * Dashboard-style KPI strip (30-day values with prior-30-day comparison + live wallet).
 */
export default function SponsorshipAnalyticsKpis({
    forUserId,
    subjectIsBrand,
    engagement,
    loading: parentLoading,
}) {
    const {
        loading,
        tracking,
        trends,
        walletAnalytics,
        showWallet,
    } = usePaymentAnalytics({
        forUserId,
        includeWallet: true,
        trackingDays: 60,
        walletDays: 30,
    });

    const cards = useMemo(
        () =>
            buildSponsorshipKpiCards({
                subjectIsBrand,
                showWallet,
                walletAnalytics,
                tracking60: tracking,
                trends60: trends,
                engagement,
                icons: {
                    IconCurrencyDollar,
                    IconHeartHandshake,
                    IconTrendingUp,
                    IconUsers,
                    IconWallet,
                },
            }),
        [subjectIsBrand, showWallet, walletAnalytics, tracking, trends, engagement],
    );

    if (parentLoading || loading) {
        return (
            <Flex justify="center" py="xl">
                <Loader color="primary" size="sm" />
            </Flex>
        );
    }

    return (
        <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, lg: cards.length >= 5 ? 5 : 4 }} spacing="md">
            {cards.map(({ key, ...cardProps }) => (
                <KpiCard key={key} {...cardProps} />
            ))}
        </SimpleGrid>
    );
}
