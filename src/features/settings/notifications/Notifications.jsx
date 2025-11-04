import { Bell, Info, Settings } from "lucide-react";
import SectionHeader from "../../../shared/components/SectionHeader";
import { SettingsCard, SettingsWrap } from "../styles/settingStyles";
import { Alert, Checkbox, Group, Pill, Table, Title } from "@mantine/core";
import { theme } from "../../../shared/styles/theme/customTheme";
import { useState } from "react";
import { notificationsPrefs } from "../types/notificationPrefs.data";



const Notifications = () => {
    const [prefs, setPrefs] = useState([...notificationsPrefs])


    const toggle = (rowKey, field) => {
        setPrefs((prev) =>
            prev.map((r) => {
                if (r.key !== rowKey) return r;
                if (r.required) return r; // keep required rows fixed
                return { ...r, [field]: !r[field] };
            })
        );
    };

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
                                    <Table.Th style={{ textAlign: "center" }}>Email</Table.Th>
                                    <Table.Th style={{ textAlign: "center" }}>Mobile</Table.Th>
                                </Table.Tr>

                            </Table.Thead>

                            <Table.Tbody>
                                {prefs.map(({ key, label, email, mobile, required }) => (
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
                                                    aria-label={`${label} email`}
                                                    checked={email}
                                                    onChange={() => toggle(key, "email")}
                                                    disabled={required}
                                                />
                                            </Group>
                                        </Table.Td>
                                        <Table.Td style={{ textAlign: "center" }}>
                                            <Group justify="center" gap={0} style={{ width: "100%" }}>
                                                <Checkbox
                                                    aria-label={`${label} mobile`}
                                                    checked={mobile}
                                                    onChange={() => toggle(key, "mobile")}
                                                    disabled={required}
                                                />
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>

                        </Table>
                    </Table.ScrollContainer>


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