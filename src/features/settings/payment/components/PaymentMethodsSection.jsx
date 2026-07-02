import { Button, Flex, Loader, Text, Title } from "@mantine/core";
import { IconCreditCard } from "@tabler/icons-react";
import { SettingsCard } from "../../styles/settingStyles";

export default function PaymentMethodsSection({
    methods,
    loading,
    onAdd,
    onRemove,
    actionLoading,
}) {
    return (
        <SettingsCard>
            <Flex justify="space-between" align="center" mb="md">
                <Title order={5}>Payment Methods</Title>
                <Button variant="light" size="sm" onClick={onAdd} loading={actionLoading}>
                    Add Method
                </Button>
            </Flex>

            {loading ? (
                <Flex justify="center" py="md">
                    <Loader size="sm" color="primary" />
                </Flex>
            ) : methods?.length ? (
                methods.map((method) => (
                    <Flex
                        key={method.id}
                        justify="space-between"
                        align="center"
                        py="sm"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                    >
                        <Flex align="center" gap="sm">
                            <IconCreditCard size={20} />
                            <div>
                                <Text fw={500} tt="capitalize">
                                    {method.card?.brand ?? "Card"} •••• {method.card?.last4}
                                </Text>
                                <Text size="xs" c="dimmed">
                                    Expires {method.card?.exp_month}/{method.card?.exp_year}
                                </Text>
                            </div>
                        </Flex>
                        <Button variant="subtle" size="xs" onClick={() => onRemove(method.id)}>
                            Remove
                        </Button>
                    </Flex>
                ))
            ) : (
                <Text c="dimmed" size="sm">
                    No payment methods saved yet.
                </Text>
            )}
        </SettingsCard>
    );
}
