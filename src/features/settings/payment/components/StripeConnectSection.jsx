import { Button, Flex, Text, Title } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { IntegrationsCard, SettingsCard } from "../../styles/settingStyles";

const STATUS_LABELS = {
    NOT_STARTED: "Setup required",
    PENDING: "Onboarding in progress",
    ACTIVE: "Connected for marketplace payments",
    RESTRICTED: "Account restricted — action required",
};

export default function StripeConnectSection({
    wallet,
    connectStatus,
    loading,
    onSetup,
    onManage,
}) {
    const status = connectStatus?.connectStatus ?? wallet?.connect_status ?? "NOT_STARTED";
    const isActive = status === "ACTIVE" && (connectStatus?.payoutsEnabled ?? wallet?.payouts_enabled);

    return (
        <SettingsCard>
            <Title order={5} mb="md">
                Stripe Integration
            </Title>
            <IntegrationsCard style={{ background: "rgba(99, 91, 255, 0.12)", border: "1px solid rgba(99, 91, 255, 0.35)" }}>
                <Flex direction="column" gap="xs" style={{ flex: 1 }}>
                    <Text fw={600}>Stripe Express Account</Text>
                    <Text size="sm" c="dimmed">
                        {isActive ? STATUS_LABELS.ACTIVE : STATUS_LABELS[status] ?? STATUS_LABELS.NOT_STARTED}
                    </Text>
                    <Text size="xs" c="dimmed" mt={4}>
                        Automatic payment processing for sponsorships
                    </Text>
                </Flex>
                {isActive ? (
                    <Button
                        className="connect_btn"
                        variant="light"
                        leftSection={<IconExternalLink size={16} />}
                        onClick={onManage}
                        loading={loading}
                    >
                        Manage
                    </Button>
                ) : (
                    <Button
                        className="connect_btn"
                        variant="primary"
                        onClick={onSetup}
                        loading={loading}
                    >
                        Complete Setup
                    </Button>
                )}
            </IntegrationsCard>
        </SettingsCard>
    );
}
