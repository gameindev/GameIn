import { Bell, Info, Settings, Save, RotateCcw } from "lucide-react";
import SectionHeader from "../../../shared/components/SectionHeader";
import { SettingsCard, SettingsWrap } from "../styles/settingStyles";
import { Alert, Checkbox, Group, Pill, Table, Title, Button, Loader, Text } from "@mantine/core";
import { theme } from "../../../shared/styles/theme/customTheme";
import { useNotificationPreferences } from "../hooks/useNotificationPreferences";



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
            <SettingsWrap>
                <SettingsCard>
                    <div className="title">
                        <div className="icon">
                            <Settings />
                        </div>
                        <Title tt={"uppercase"} order={4} c="textWhite">
                            Notification Preferences
                        </Title>
                    </div>


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

                    {/* Action Buttons */}
                    <Group justify="flex-end" mt="md" gap="sm">
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
            </SettingsWrap>
        </>
    )
}


export default Notifications;