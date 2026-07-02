import { DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { Text } from "@mantine/core";
import SectionHeader from "../../../shared/components/SectionHeader";
import { SettingsWrap } from "../styles/settingStyles";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import useWallet from "./hooks/useWallet";
import useWalletLedger from "./hooks/useWalletLedger";
import useWalletFunding from "./hooks/useWalletFunding";
import useWalletPayout from "./hooks/useWalletPayout";
import BalanceSection from "./components/BalanceSection";
import StripeConnectSection from "./components/StripeConnectSection";
import PaymentMethodsSection from "./components/PaymentMethodsSection";
import TransactionHistory from "./components/TransactionHistory";
import TopUpModal from "./components/TopUpModal";
import AddPaymentMethodModal from "./components/AddPaymentMethodModal";

const Payments = () => {
    const user = useAppSelector(currentUser);
    const userType = user?.user_type?.toUpperCase();
    const isCreator = userType === USERTYPES.CREATOR;
    const isBrand = userType === USERTYPES.BRAND;

    const { wallet, balances, loading, refresh } = useWallet();
    const { ledger, loading: ledgerLoading, refresh: refreshLedger } = useWalletLedger();
    const [topUpOpen, setTopUpOpen] = useState(false);
    const [topUpData, setTopUpData] = useState(null);
    const [addMethodOpen, setAddMethodOpen] = useState(false);

    const handleRefreshAll = async () => {
        await Promise.all([refresh(), refreshLedger()]);
    };

    const funding = useWalletFunding(async (data) => {
        setTopUpData(data);
    });

    const payout = useWalletPayout(handleRefreshAll);

    useEffect(() => {
        if (isBrand) {
            funding.loadPaymentMethods();
        }
        if (isCreator) {
            payout.loadConnectStatus();
        }
    }, [isBrand, isCreator]);

    const handleTopUp = async (amount, paymentMethodId) => {
        const data = await funding.topUp(amount, paymentMethodId);
        setTopUpData(data);
        return data;
    };

    return (
        <>
            <SectionHeader text="Payments" icon={<DollarSign />} />
            <Text c="dimmed" mb="lg" size="sm">
                Manage your payment methods and financial settings.
            </Text>
            <SettingsWrap>
                <BalanceSection
                    userType={userType}
                    balances={balances}
                    loading={loading}
                    onWithdraw={() => payout.withdraw()}
                    onTopUp={() => setTopUpOpen(true)}
                    withdrawLoading={payout.loading || funding.loading}
                />

                {isCreator ? (
                    <StripeConnectSection
                        wallet={wallet}
                        connectStatus={payout.connectStatus}
                        loading={payout.loading}
                        onSetup={payout.startOnboarding}
                        onManage={payout.openDashboard}
                    />
                ) : null}

                {isBrand ? (
                    <PaymentMethodsSection
                        methods={funding.paymentMethods}
                        loading={funding.methodsLoading}
                        onAdd={() => setAddMethodOpen(true)}
                        onRemove={funding.removePaymentMethod}
                        actionLoading={funding.loading}
                    />
                ) : null}

                <TransactionHistory ledger={ledger} loading={ledgerLoading} />
            </SettingsWrap>

            {isBrand ? (
                <>
                    <TopUpModal
                        opened={topUpOpen}
                        onClose={() => {
                            setTopUpOpen(false);
                            setTopUpData(null);
                        }}
                        onTopUp={handleTopUp}
                        onConfirmTopUp={funding.confirmTopUp}
                        topUpData={topUpData}
                        onComplete={handleRefreshAll}
                        paymentMethods={funding.paymentMethods}
                    />
                    <AddPaymentMethodModal
                        opened={addMethodOpen}
                        onClose={() => setAddMethodOpen(false)}
                        onCreateSetupIntent={funding.setupPaymentMethod}
                        onComplete={() => funding.loadPaymentMethods()}
                    />
                </>
            ) : null}
        </>
    );
};

export default Payments;
