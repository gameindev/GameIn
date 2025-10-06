/* eslint-disable */
import React, { useEffect, useState } from 'react'
import SectionHeader from '../../components/shared/ui/SectionHeader'
import { Instagram, MessageCircle, Music, Plug2, Settings, Twitch, Twitter, Youtube } from 'lucide-react'
import { Button, Grid, Pill, Title } from "@mantine/core";
import { IntegrationsCard, SettingsCard, SettingsWrap } from "../../styles/pages/SettingStyles";
import { useSocialApi } from './api/socialApi';
import { SocialPlatform } from '../../utils/enum';

export default function Integrations() {
    const { checkAllConnections, connect } = useSocialApi()
    const [connections, setConnections] = useState([])


    useEffect(() => {
        const checkConnections = async () => {
            try {
                const connections = await checkAllConnections()
                setConnections(connections)
                console.log(connections)

            } catch (err) {
                console.error("Error while getting the connections:", err);
            }
        }

        checkConnections()

    }, [])


    const handleConnectIntegration = async (platform) => {
        try {
            const connectionStatus = await connect(platform)
            window.open(connectionStatus.url, '_blank');

        } catch (err) {
            console.error("Error while connecting:", err);
        }
    }

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
                    <Grid>

                        {(() => {
                            // Get the one connection with platform === TWITCH
                            const twitchConnection = connections?.find((c) => c.platform === SocialPlatform.TWITCH);
                            if (twitchConnection) {
                                return (
                                    <Grid.Col span={6}>
                                        <IntegrationsCard>
                                            <Twitch />
                                            <div>
                                                <Title order={4}>Twitch</Title>
                                                <Pill>{twitchConnection.state == 'ADD' ? "Not Set" : twitchConnection.state}</Pill>
                                            </div>
                                            {twitchConnection.state != 'CONNECTED' ? (
                                                <Button className='connect_btn' onClick={() => handleConnectIntegration(SocialPlatform.TWITCH)} variant="filled">ADD</Button>
                                            ): ''}
                                        </IntegrationsCard>
                                    </Grid.Col>
                                );
                            } else {
                                return (
                                    <Grid.Col span={6}></Grid.Col>
                                );
                            }
                        })()}

                        {(() => {
                            // Get the one connection with platform === YOUTUBE
                            const youtubeConnection = connections?.find((c) => c.platform === SocialPlatform.YOUTUBE);
                            if (youtubeConnection) {
                                return (
                                    <Grid.Col span={6}>
                                        <IntegrationsCard>
                                            <Youtube />
                                            <div>
                                                <Title order={4}>Youtube</Title>
                                                <Pill>{youtubeConnection.state == 'ADD' ? "Not Set" : youtubeConnection.state}</Pill>
                                            </div>
                                            {youtubeConnection.state != 'CONNECTED' ? (
                                                <Button
                                                    className='connect_btn'
                                                    onClick={() => handleConnectIntegration(SocialPlatform.YOUTUBE)}
                                                    variant="filled"
                                                >
                                                    ADD
                                                </Button>
                                            ) : ''}
                                        </IntegrationsCard>
                                    </Grid.Col>
                                );
                            } else {
                                return (
                                    <Grid.Col span={6}></Grid.Col>
                                );
                            }
                        })()}

                        {(() => {
                            // Get the one connection with platform === TIKTOK
                            const tiktokConnection = connections?.find((c) => c.platform === SocialPlatform.TIKTOK);
                            if (tiktokConnection) {
                                return (
                                    <Grid.Col span={6}>
                                        <IntegrationsCard>
                                            <Music />
                                            <div>
                                                <Title order={4}>Tik Tok</Title>
                                                <Pill>{tiktokConnection.state == 'ADD' ? "Not Set" : tiktokConnection.state}</Pill>
                                            </div>
                                            {tiktokConnection.state != 'CONNECTED' ? (
                                                <Button
                                                    className='connect_btn'
                                                    onClick={() => handleConnectIntegration(SocialPlatform.TIKTOK)}
                                                    variant="filled"
                                                >
                                                    ADD
                                                </Button>
                                            ) : ''}
                                        </IntegrationsCard>
                                    </Grid.Col>
                                );
                            } else {
                                return (
                                    <Grid.Col span={6}></Grid.Col>
                                );
                            }
                        })()}


                        {(() => {
                            // Get the one connection with platform === INSTAGRAM
                            const instagramConnection = connections?.find((c) => c.platform === SocialPlatform.INSTAGRAM);
                            if (instagramConnection) {
                                return (
                                    <Grid.Col span={6}>
                                        <IntegrationsCard>
                                            <Instagram />
                                            <div>
                                                <Title order={4}>Instagram</Title>
                                                <Pill>{instagramConnection.state == 'ADD' ? "Not Set" : instagramConnection.state}</Pill>
                                            </div>
                                            {instagramConnection.state != 'CONNECTED' ? (
                                                <Button
                                                    className='connect_btn'
                                                    onClick={() => handleConnectIntegration(SocialPlatform.INSTAGRAM)}
                                                    variant="filled"
                                                >
                                                    ADD
                                                </Button>
                                            ) : ''}
                                        </IntegrationsCard>
                                    </Grid.Col>
                                );
                            } else {
                                return (
                                    <Grid.Col span={6}></Grid.Col>
                                );
                            }
                        })()}

                        {(() => {
                            // Get the one connection with platform === TWITTER
                            const twitterConnection = connections?.find((c) => c.platform === SocialPlatform.X);
                            if (twitterConnection) {
                                return (
                                    <Grid.Col span={6}>
                                        <IntegrationsCard>
                                            <Twitter />
                                            <div>
                                                <Title order={4}>X</Title>
                                                <Pill>{twitterConnection.state == 'ADD' ? "Not Set" : twitterConnection.state}</Pill>
                                            </div>
                                            {twitterConnection.state != 'CONNECTED' ? (
                                                <Button
                                                    className='connect_btn'
                                                    onClick={() => handleConnectIntegration(SocialPlatform.X)}
                                                    variant="filled"
                                                >
                                                    ADD
                                                </Button>
                                            ) : ''}
                                        </IntegrationsCard>
                                    </Grid.Col>
                                );
                            } else {
                                return (
                                    <Grid.Col span={6}></Grid.Col>
                                );
                            }
                        })()}


                        {(() => {
                            // Get the one connection with platform === DISCORD
                            const discordConnection = connections?.find((c) => c.platform === SocialPlatform.DISCORD);
                            if (discordConnection) {
                                return (
                                    <Grid.Col span={6}>
                                        <IntegrationsCard>
                                            <MessageCircle />
                                            <div>
                                                <Title order={4}>Discord</Title>
                                                <Pill>{discordConnection.state == 'ADD' ? "Not Set" : discordConnection.state}</Pill>
                                            </div>
                                            {discordConnection.state != 'CONNECTED' ? (
                                                <Button
                                                    className='connect_btn'
                                                    onClick={() => handleConnectIntegration(SocialPlatform.DISCORD)}
                                                    variant="filled"
                                                >
                                                    ADD
                                                </Button>
                                            ) : ''}
                                        </IntegrationsCard>
                                    </Grid.Col>
                                );
                            } else {
                                return (
                                    <Grid.Col span={6}></Grid.Col>
                                );
                            }
                        })()}
                    </Grid>
                </SettingsCard>
            </SettingsWrap>
        </div>
    )
}
