import { Flex, Loader, Text, Title } from "@mantine/core";
import { SettingsCard } from "../../styles/settingStyles";

function formatMoney(amount, currency = "USD") {
    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
    }).format(Number(amount));
}

function formatDate(value) {
    if (!value) return "—";
    return new Date(value).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

const TYPE_LABELS = {
    TOP_UP: "Top-up",
    ORDER_PAYMENT: "Sponsorship payment",
    ORDER_EARNING: "Earnings secured",
    RELEASE: "Funds released",
    WITHDRAW: "Withdrawal",
    REFUND: "Refund",
    PLATFORM_FEE: "Platform fee",
};

export default function TransactionHistory({ ledger, loading }) {
    const items = ledger?.items ?? [];

    return (
        <SettingsCard>
            <Title order={5} mb="md">
                Transaction History
            </Title>

            {loading ? (
                <Flex justify="center" py="md">
                    <Loader size="sm" color="primary" />
                </Flex>
            ) : items.length ? (
                items.map((entry) => (
                    <Flex
                        key={entry.id}
                        justify="space-between"
                        align="center"
                        py="sm"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                    >
                        <div>
                            <Text fw={500} size="sm">
                                {entry.description || TYPE_LABELS[entry.entry_type] || entry.entry_type}
                            </Text>
                        <Text size="xs" c="dimmed">
                            {formatDate(entry.created_at)} · {entry.status}
                            {entry.meta_data?.paymentMethod === "card" ? " · Card" : ""}
                            {entry.meta_data?.paymentMethod === "wallet" ? " · Wallet" : ""}
                        </Text>
                        </div>
                        <Text fw={600} c={entry.entry_type?.includes("PAYMENT") || entry.entry_type === "WITHDRAW" ? "red.4" : "teal.4"}>
                            {entry.entry_type === "ORDER_PAYMENT" || entry.entry_type === "WITHDRAW" ? "-" : "+"}
                            {formatMoney(entry.amount, entry.currency)}
                        </Text>
                    </Flex>
                ))
            ) : (
                <Text c="dimmed" size="sm">
                    No transactions yet.
                </Text>
            )}
        </SettingsCard>
    );
}
