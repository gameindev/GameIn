import { Instagram, MessageCircle, Music, Plug2, Settings, Twitch, Twitter, Youtube } from "lucide-react"
import SectionHeader from "../../../../shared/components/SectionHeader"
import { IntegrationsCard, SettingsCard, SettingsWrap } from "../../styles/settingStyles";
import { Button, Grid, Pill, Space, Title, Text, Tooltip, Group, Badge, Loader } from "@mantine/core";
import { useSocialIntegrations } from "../hooks/useSocialIntegrations";
import { useEffect } from "react";
import { PLATFORMS } from "../types/platform.mapper";



const Integrations = () => {
    const { 
        integrations, 
        loading, 
        error, 
        connecting, 
        stats,
        handleConnect, 
        handleRefreshStatus,
        handleFetchStats,
        getStatus 
    } = useSocialIntegrations();

    // Fetch stats for connected platforms on mount and when integrations change
    useEffect(() => {
        Object.entries(integrations).forEach(([platform, data]) => {
            // if (data?.state === 'CONNECTED' && data?.integration_id && !stats[platform]) {
            //     handleFetchStats(platform, data.integration_id);
            // }
        });
    }, [integrations, stats, handleFetchStats]);

    const handleButtonClick = async (platform) => {
        const status = getStatus(platform);
        
        if (status.state === 'ADD' || status.state === 'CONNECT') {
            await handleConnect(platform);
        } else if (status.state === 'CONNECTED') {
            // Refresh stats
            if (status.integration_id) {
                await handleFetchStats(platform, status.integration_id);
            }
            await handleRefreshStatus(platform);
        }
    };

    const getButtonText = (status) => {
        switch (status.state) {
            case 'ADD':
                return 'ADD';
            case 'CONNECT':
                return 'CONNECT';
            case 'CONNECTED':
                return 'REFRESH';
            default:
                return 'ADD';
        }
    };

    const getPillContent = (status, statsData) => {
        if (status.state === 'CONNECTED') {
            if (statsData?.followers) {
                return `${formatNumber(statsData.followers)} followers`;
            }
            return status.summary || 'Connected';
        }
        return status.label || 'Not Set';
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
                            <Text c="red" size="sm">Error: {error}</Text>
                        </Group>
                    )}

                    <Grid>
                        {PLATFORMS.map((platform) => {
                            const Icon = platform.icon;
                            const status = getStatus(platform.key);
                            const statsData = stats[platform.key];
                            const isConnecting = connecting === platform.key;

                            return (
                                <Grid.Col span={6} key={platform.key}>
                                    <IntegrationsCard>
                                        <Icon size={24} />
                                        <div>
                                            <Title order={4}>{platform.displayName}</Title>
                                            <Space h="xs" />
                                            <Pill color={getPillColor(status)}>
                                                {getPillContent(status, statsData)}
                                            </Pill>
                                            {status.summary && status.state === 'CONNECTED' && (
                                                <Text size="xs" c="dimmed" mt={4}>
                                                    {status.summary}
                                                </Text>
                                            )}
                                        </div>
                                        <Button 
                                            className='connect_btn' 
                                            variant="primary"
                                            onClick={() => handleButtonClick(platform.key)}
                                            loading={isConnecting}
                                            disabled={isConnecting || loading}
                                        >
                                            {isConnecting ? 'Connecting...' : getButtonText(status)}
                                        </Button>
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