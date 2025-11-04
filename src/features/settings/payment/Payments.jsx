import { DollarSign, TrendingDown } from "lucide-react"
import SectionHeader from "../../../shared/components/SectionHeader"
import { BalanceCard, SettingsCard, SettingsWrap } from "../styles/settingStyles"
import { Button, Pill, Text } from "@mantine/core"


const Payments = () => {
    return (
        <>
            <SectionHeader text="Payments" icon={<DollarSign />} />
            <SettingsWrap>
                <SettingsCard>
                    <BalanceCard>
                        <div className="left">
                            <Pill size="sm" color="primary" variant="filled">
                                $ Account Balance
                            </Pill>
                            <div>
                                <div className="amount">$2,847.50</div>
                                <Text className="sub">Available for withdrawal</Text>
                            </div>
                        </div>
                        <Button
                            leftSection={<TrendingDown />}
                            variant="primary"
                            color="primary"
                        >
                            Withdraw
                        </Button>
                    </BalanceCard>
                </SettingsCard>
            </SettingsWrap>
        </>
    )
}


export default Payments