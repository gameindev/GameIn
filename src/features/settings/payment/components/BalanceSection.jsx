import { Button, Flex, Loader, Pill, Text } from "@mantine/core";
import { IconTrendingDown, IconPlus } from "@tabler/icons-react";
import { BalanceCard } from "../../styles/settingStyles";
import { USERTYPES } from "../../../../shared/enums/userTypesEnum";

function formatMoney(amount, currency = "USD") {
    if (amount == null) return "—";
    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
    }).format(Number(amount));
}

export default function BalanceSection({
    userType,
    balances,
    loading,
    onWithdraw,
    onTopUp,
    withdrawLoading,
}) {
    const isCreator = userType === USERTYPES.CREATOR;
    const currency = balances?.currency ?? "USD";

    if (loading) {
        return (
            <Flex justify="center" py="lg">
                <Loader color="primary" size="sm" />
            </Flex>
        );
    }

    return (
        <BalanceCard>
            <div className="left">
                <Pill size="sm" color="primary" variant="filled">
                    $ Account Balance
                </Pill>
                <div>
                    <div className="amount">{formatMoney(balances?.available ?? 0, currency)}</div>
                    <Text className="sub">
                        {isCreator ? "Available for withdrawal" : "Available balance"}
                    </Text>
                    {isCreator && balances?.pending > 0 ? (
                        <Text size="sm" c="dimmed" mt={4}>
                            Pending: {formatMoney(balances.pending, currency)}
                        </Text>
                    ) : null}
                    {!isCreator && balances?.reserved > 0 ? (
                        <Text size="sm" c="dimmed" mt={4}>
                            Reserved: {formatMoney(balances.reserved, currency)}
                        </Text>
                    ) : null}
                </div>
            </div>
            {isCreator ? (
                <Button
                    leftSection={<IconTrendingDown size={16} />}
                    variant="primary"
                    color="primary"
                    onClick={onWithdraw}
                    loading={withdrawLoading}
                    disabled={(balances?.available ?? 0) <= 0}
                >
                    Withdraw
                </Button>
            ) : (
                <Button
                    leftSection={<IconPlus size={16} />}
                    variant="primary"
                    color="primary"
                    onClick={onTopUp}
                    loading={withdrawLoading}
                >
                    Top Up
                </Button>
            )}
        </BalanceCard>
    );
}
