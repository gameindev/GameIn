import React from 'react'
import SectionHeader from '../../components/shared/ui/SectionHeader'
import { Instagram, MessageCircle, Music, Plug2, Settings, Twitch, Twitter, Youtube } from 'lucide-react'
import { Button, Grid, Pill, Title } from "@mantine/core";
import { IntegrationsCard, SettingsCard, SettingsWrap } from "../../styles/pages/SettingStyles";

export default function Integrations() {
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
            <Grid.Col span={6}>
              <IntegrationsCard>
                  <Twitter />
                  <div>
                    <Title order={4}>Twitter</Title>
                    <Pill>Not Set</Pill>
                  </div>
                  <Button className='connect_btn' variant="filled">ADD</Button>
              </IntegrationsCard>
            </Grid.Col>
            <Grid.Col span={6}>
              <IntegrationsCard>
                  <Youtube />
                  <div>
                    <Title order={4}>Youtube</Title>
                    <Pill>Not Set</Pill>
                  </div>
                  <Button className='connect_btn' variant="filled">ADD</Button>
              </IntegrationsCard>
            </Grid.Col>
            <Grid.Col span={6}>
              <IntegrationsCard>
                  <Music />
                  <div>
                    <Title order={4}>Tik Tok</Title>
                    <Pill>Not Set</Pill>
                  </div>
                  <Button className='connect_btn' variant="filled">ADD</Button>
              </IntegrationsCard>
            </Grid.Col>
            <Grid.Col span={6}>
              <IntegrationsCard>
                  <Instagram />
                  <div>
                    <Title order={4}>Instagram</Title>
                    <Pill>Not Set</Pill>
                  </div>
                  <Button className='connect_btn' variant="filled">ADD</Button>
              </IntegrationsCard>
            </Grid.Col>
            <Grid.Col span={6}>
              <IntegrationsCard>
                  <Twitch />
                  <div>
                    <Title order={4}>Twitch</Title>
                    <Pill>Not Set</Pill>
                  </div>
                  <Button className='connect_btn' variant="filled">ADD</Button>
              </IntegrationsCard>
            </Grid.Col>
            <Grid.Col span={6}>
              <IntegrationsCard>
                  <MessageCircle />
                  <div>
                    <Title order={4}>Discord</Title>
                    <Pill>Not Set</Pill>
                  </div>
                  <Button className='connect_btn' variant="filled">ADD</Button>
              </IntegrationsCard>
            </Grid.Col>
          </Grid>
        </SettingsCard>
      </SettingsWrap>
    </div>
  )
}
