import { Instagram, MessageCircle, Music, Plug2, Settings, Twitch, Twitter, Youtube } from "lucide-react"
import SectionHeader from "../../../../shared/components/SectionHeader"
import { IntegrationsCard, SettingsCard, SettingsWrap } from "../../styles/settingStyles";
import { Button, Grid, Pill, Space, Title, Text, Group, Loader } from "@mantine/core";
import { useSocialIntegrations } from "../hooks/useSocialIntegrations";
import { useEffect } from "react";
import { PLATFORMS } from "../types/platform.mapper";
import { showNotificationHelper } from "../../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../../shared/enums/notificationTypesEnum";



/** API returns `summary` as `{ id?, name?, username? }`; React children must be strings. */
function summaryToDisplayString(summary) {
    if (summary == null) return "";
    if (typeof summary === "string") return summary;
    if (typeof summary !== "object") return String(summary);
    const handle = summary.username || summary.name;
    if (handle) return handle.startsWith("@") ? handle : `@${handle}`;
    if (summary.id) return `Connected (id: ${summary.id})`;
    return "";
}

const Integrations = () => {
    const { 
        integrations, 
        loading, 
        error, 
        connecting, 
        syncing,
        refreshingStatus,
        disconnecting,
        stats,
        handleConnect,
        handleFetchStats,
        handleSync,
        handleDisconnect,
        getStatus,
    } = useSocialIntegrations();

    useEffect(() => {
        Object.entries(integrations).forEach(([platform, data]) => {
            if (data?.state === "CONNECTED" && data?.integration_id != null && stats[platform] == null) {
                handleFetchStats(platform, data.integration_id);
            }
        });
    }, [integrations, stats, handleFetchStats]);

    const handleButtonClick = async (platform) => {
        const status = getStatus(platform);

        if (status.state === "ADD" || status.state === "CONNECT") {
            await handleConnect(platform);
            return;
        }

        if (status.state === "CONNECTED") {
            try {
                const result = await handleSync(platform);
                const data = result?.data ?? result;
                const cached = data?.syncStatus === "CACHED_FALLBACK";
                showNotificationHelper(
                    cached ? "Sync used cached stats" : "Sync complete",
                    cached
                        ? "Live API fetch failed; showing your last saved stats."
                        : "Your social stats have been refreshed.",
                    cached ? NOTIFICATION_TYPES.WARNING : NOTIFICATION_TYPES.SUCCESS
                );
            } catch (err) {
                const message = err?.message ?? (typeof err === "string" ? err : "Sync failed");
                showNotificationHelper("Sync failed", message, NOTIFICATION_TYPES.ERROR);
            }
        }
    };

    const getButtonText = (status) => {
        switch (status.state) {
            case "ADD":
                return "ADD";
            case "CONNECT":
                return "CONNECT";
            case "CONNECTED":
                return "SYNC";
            default:
                return status.integration_id ? "SYNC" : "ADD";
        }
    };

    const getPillContent = (status, statsData) => {
        if (status.state === "CONNECTED") {
            return summaryToDisplayString(status.summary) || "Connected";
        }
        return status.label || "Not Set";
    };

    const formatNumber = (num) => {
        if (!num) return '0';
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const getPillColor = (status) => {
        switch (status.state) {
            case 'CONNECTED':
                return 'green';
            case 'CONNECT':
                return 'yellow';
            default:
                return 'gray';
        }
    };

    return (
        <div>
            <SectionHeader text="Integrations" icon={<Plug2 />} />

            <SettingsWrap>
                <SettingsCard>
                    <div className="title">
                        <div className="icon">
                            <Settings />
                        </div>
                        <Title tt={'uppercase'} order={4} c="textWhite">Social Networks Integrations</Title>
                    </div>

                    {loading && integrations && Object.keys(integrations).length === 0 && (
                        <Group justify="center" p="xl">
                            <Loader size="md" />
                            <Text>Loading integrations...</Text>
                        </Group>
                    )}

                    {error && (
                        <Group justify="center" p="md">
                            <Text c="red" size="sm">
                                Error: {String(error)}
                            </Text>
                        </Group>
                    )}

                    <Grid>
                        {PLATFORMS.map((platform) => {
                            const Icon = platform.icon;
                            const status = getStatus(platform.key);
                            const isConnecting = connecting === platform.key;
                            const isSyncing = syncing === platform.key;
                            const isRefreshing = refreshingStatus === platform.key;
                            const statsData = stats[platform.key];
                            const lastSyncedLabel =
                                statsData?.syncStatus === "CACHED_FALLBACK"
                                    ? "Cached stats"
                                    : statsData?.syncStatus === "SUCCESS"
                                      ? "Recently synced"
                                      : null;

                            return (
                                <Grid.Col span={6} key={platform.key}>
                                    <IntegrationsCard>
                                        <Icon size={32} />
                                        <div>
                                            <Title order={4}>{platform.displayName}</Title>
                                            <Space h="5" />
                                            <Pill color={getPillColor(status)} style={{ fontSize: "0.75rem" }}>
                                                {getPillContent(status, statsData)}
                                            </Pill>
                                            {platform.key === "INSTAGRAM" && status.state !== "CONNECTED" && (
                                                <Text size="xs" c="yellow" mt={4}>
                                                    Instagram requires a Professional account.
                                                </Text>
                                            )}
                                            {lastSyncedLabel ? (
                                                <Text size="xs" c="dimmed" mt={4}>
                                                    {lastSyncedLabel}
                                                </Text>
                                            ) : null}
                                        </div>
                                        <Button
                                            className="connect_btn"
                                            variant="primary"
                                            onClick={() => handleButtonClick(platform.key)}
                                            loading={isConnecting || isSyncing || isRefreshing}
                                            disabled={
                                                isConnecting ||
                                                isSyncing ||
                                                isRefreshing ||
                                                (loading && !status.state)
                                            }
                                        >
                                            {isConnecting
                                                ? "Connecting..."
                                                : isSyncing || isRefreshing
                                                  ? "Syncing..."
                                                  : getButtonText(status)}
                                        </Button>
                                        {status.state === "CONNECTED" && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDisconnect(platform.key)}
                                                loading={disconnecting === platform.key}
                                            >
                                                DISCONNECT
                                            </Button>
                                        )}
                                    </IntegrationsCard>
                                </Grid.Col>
                            );
                        })}
                    </Grid>
                </SettingsCard>
            </SettingsWrap>
        </div>
    )
}

export default Integrations;