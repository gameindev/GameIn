import { Bell, Info, Settings, Save, RotateCcw } from "lucide-react";
import SectionHeader from "../../../shared/components/SectionHeader";
import { SettingsCard, SettingsWrap } from "../styles/settingStyles";
import { Alert, Checkbox, Group, Pill, Table, Title, Button, Loader, Text } from "@mantine/core";
import { theme } from "../../../shared/styles/theme/customTheme";
import { useNotificationPreferences } from "../hooks/useNotificationPreferences";
import styled from "styled-components";



const Notifications = () => {
    const {
        prefs,
        loading,
        saving,
        error,
        toggle,
        savePreferences,
        resetToDefaults,
    } = useNotificationPreferences();

    return (
        <>
            <SectionHeader text="Notifications" icon={<Bell />} />
            <NotificationsWrap>
                <SettingsCard>
                    <div className="title">
                        <div className="icon">
                            <Settings />
                        </div>
                        <Title tt={"uppercase"} order={4} c="textWhite">
                            Notification Preferences
                        </Title>
                    </div>

                    <div className="notification-table">
                    <Table.ScrollContainer>
                        <Table
                            withColumnBorders
                            horizontalSpacing="md"
                            verticalSpacing="sm"
                        >
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th c={theme.colors.white[0]}>
                                        Notification Type
                                    </Table.Th>
                                    <Table.Th style={{ textAlign: "center" }}>In-App</Table.Th>
                                    <Table.Th style={{ textAlign: "center" }}>Email</Table.Th>
                                    {/* SMS column hidden for now */}
                                    {/* <Table.Th style={{ textAlign: "center" }}>SMS</Table.Th> */}
                                </Table.Tr>
                            </Table.Thead>

                            <Table.Tbody>
                                {loading ? (
                                    <Table.Tr>
                                        <Table.Td colSpan={3} style={{ textAlign: "center", padding: "2rem" }}>
                                            <Loader size="sm" />
                                            <Text size="sm" color="dimmed" mt="sm">
                                                Loading preferences...
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                ) : (
                                    prefs.map(({ key, label, email, mobile, required }) => (
                                        <Table.Tr key={key}>
                                            <Table.Td>
                                                <Group gap="sm">
                                                    <span>{label}</span>
                                                    {required && (
                                                        <Pill size="xs" color="yellow" variant="filled">
                                                            Required
                                                        </Pill>
                                                    )}
                                                </Group>
                                            </Table.Td>
                                            <Table.Td style={{ textAlign: "center" }}>
                                                <Group justify="center" gap={0} style={{ width: "100%" }}>
                                                    <Checkbox
                                                        aria-label={`${label} in-app`}
                                                        checked={true}
                                                        disabled={true}
                                                        title="In-app notifications are always enabled"
                                                    />
                                                </Group>
                                            </Table.Td>
                                            <Table.Td style={{ textAlign: "center" }}>
                                                <Group justify="center" gap={0} style={{ width: "100%" }}>
                                                    <Checkbox
                                                        aria-label={`${label} email`}
                                                        checked={email}
                                                        onChange={() => toggle(key, "email")}
                                                        disabled={required || saving}
                                                    />
                                                </Group>
                                            </Table.Td>
                                            {/* SMS column hidden for now */}
                                            {/* <Table.Td style={{ textAlign: "center" }}>
                                                <Group justify="center" gap={0} style={{ width: "100%" }}>
                                                    <Checkbox
                                                        aria-label={`${label} sms`}
                                                        checked={mobile}
                                                        onChange={() => toggle(key, "mobile")}
                                                        disabled={true}
                                                        title="SMS notifications are currently disabled"
                                                    />
                                                </Group>
                                            </Table.Td> */}
                                        </Table.Tr>
                                    ))
                                )}
                            </Table.Tbody>

                        </Table>
                    </Table.ScrollContainer>
                    </div>

                    <div className="notification-mobile-list">
                        {loading ? (
                            <div className="notification-mobile-empty">
                                <Loader size="sm" />
                                <Text size="sm" c="dimmed">
                                    Loading preferences...
                                </Text>
                            </div>
                        ) : (
                            prefs.map(({ key, label, email, required }) => (
                                <div className="notification-mobile-card" key={key}>
                                    <div className="notification-mobile-head">
                                        <Text fw={700} c={theme.colors.white[0]}>
                                            {label}
                                        </Text>
                                        {required && (
                                            <Pill size="xs" color="yellow" variant="filled">
                                                Required
                                            </Pill>
                                        )}
                                    </div>
                                    <div className="notification-mobile-row">
                                        <div>
                                            <Text size="sm" fw={700} c={theme.colors.white[0]}>
                                                In-App
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                Always enabled
                                            </Text>
                                        </div>
                                        <Checkbox
                                            aria-label={`${label} in-app`}
                                            checked={true}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="notification-mobile-row">
                                        <div>
                                            <Text size="sm" fw={700} c={theme.colors.white[0]}>
                                                Email
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                Receive email updates
                                            </Text>
                                        </div>
                                        <Checkbox
                                            aria-label={`${label} email`}
                                            checked={email}
                                            onChange={() => toggle(key, "email")}
                                            disabled={required || saving}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Action Buttons */}
                    <Group className="notification-actions" justify="flex-end" mt="md" gap="sm">
                        <Button
                            variant="subtle"
                            leftSection={<RotateCcw size={16} />}
                            onClick={resetToDefaults}
                            disabled={loading || saving}
                        >
                            Reset to Defaults
                        </Button>
                        <Button
                            variant="primary"
                            leftSection={<Save size={16} />}
                            onClick={savePreferences}
                            loading={saving}
                            disabled={loading}
                        >
                            Save Preferences
                        </Button>
                    </Group>

                    {error && (
                        <Alert color="red" variant="light" mt="md">
                            {error}
                        </Alert>
                    )}
                </SettingsCard>

                <Alert
                    color="skyblue"
                    variant="light"
                    icon={<Info />}
                    title="Important Notice"
                >
                    Certain notifications cannot be disabled as they are essential for
                    order management and platform communication. These include order
                    messages and order updates.
                </Alert>
            </NotificationsWrap>
        </>
    )
}

const NotificationsWrap = styled(SettingsWrap)`
    min-width: 0;

    .notification-mobile-list {
        display: none;
    }

    @media (max-width: 768px) {
        padding-top: 1rem;

        ${SettingsCard} {
            padding: 1rem;
        }

        .title {
            align-items: flex-start;
            gap: 0.75rem;
        }

        .title .mantine-Title-root {
            font-size: 1rem;
            line-height: 1.25;
        }

        .notification-table {
            display: none;
        }

        .notification-mobile-list {
            display: grid;
            gap: 0.75rem;
        }

        .notification-mobile-empty,
        .notification-mobile-card {
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: ${theme.radius.md};
            background: rgba(0,0,0,0.12);
        }

        .notification-mobile-empty {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            min-height: 6rem;
        }

        .notification-mobile-card {
            padding: 0.9rem;
        }

        .notification-mobile-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 0.75rem;
            padding-bottom: 0.8rem;
            border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .notification-mobile-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding-top: 0.8rem;
        }

        .notification-actions {
            justify-content: stretch !important;
            align-items: stretch;
            flex-direction: column-reverse;
        }

        .notification-actions .mantine-Button-root {
            width: 100%;
        }
    }
`;


export default Notifications;
