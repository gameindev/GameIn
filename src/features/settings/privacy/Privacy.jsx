import { memo, useCallback, useMemo, useState } from "react";
import { PrivacyRow, SettingsCard, SettingsWrap } from "../styles/settingStyles";
import { Button, Group, Text, Title } from "@mantine/core";
import { SwitchButton } from "../../../shared/components/Switch";
import SectionHeader from "../../../shared/components/SectionHeader";
import { BarChart3, Eye, Shield, Users } from "lucide-react";



const PrefRow = memo(function PrefRow({ title, desc, checked, onToggle }) {
    return (
        <PrivacyRow>
            <div className="details">
                <Text className="title">{title}</Text>
                <Text className="desc">{desc}</Text>
            </div>
            <SwitchButton label="" checked={checked} onClick={onToggle} />
        </PrivacyRow>
    );
});


const Privacy = () => {
    const [toggles, setToggles] = useState({
        visibility: { public: true, stats: false, contact: false },
        sharing: { analytics: false, performance: false, thirdParty: false },
        comm: { dms: false, collab: false, marketing: false },
    });

    const handleToggle = useCallback((section, key) => {
        setToggles((prev) => ({
            ...prev,
            [section]: { ...prev[section], [key]: !prev[section][key] },
        }));
    }, []);


    const sections = useMemo(
        () => ({
            visibility: [
                {
                    key: "public",
                    title: "Public Profile",
                    desc: "Make your profile visible to everyone",
                },
                {
                    key: "stats",
                    title: "Show Statistics",
                    desc: "Display your follower counts and engagement metrics",
                },
                {
                    key: "contact",
                    title: "Show Contact Information",
                    desc: "Allow sponsors to see your contact details",
                },
            ],
            sharing: [
                {
                    key: "analytics",
                    title: "Analytics Sharing",
                    desc: "Share anonymized usage data to improve the platform",
                },
                {
                    key: "performance",
                    title: "Performance Metrics",
                    desc: "Allow GAMEIN to use your performance data for matching",
                },
                {
                    key: "thirdParty",
                    title: "Third-party Integrations",
                    desc: "Share data with connected social media platforms",
                },
            ],
            comm: [
                {
                    key: "dms",
                    title: "Direct Messages",
                    desc: "Allow sponsors to send you direct messages",
                },
                {
                    key: "collab",
                    title: "Collaboration Requests",
                    desc: "Receive collaboration requests from other creators",
                },
                {
                    key: "marketing",
                    title: "Marketing Communications",
                    desc: "Receive promotional emails and updates",
                },
            ],
        }),
        []
    );



    return (
        <>
            <SectionHeader text="Privacy Settings" icon={<Shield />} />
            <SettingsWrap>
                
                {/* Profile Visibility */}
                <SettingsCard>
                    <div className="title">
                        <div className="icon">
                            <Eye />
                        </div>
                        <Title tt="uppercase" order={4} c="textWhite">
                            Profile Visibility
                        </Title>
                    </div>

                    <div>
                        {sections.visibility.map(({ key, title, desc }) => (
                            <PrefRow
                                key={key}
                                title={title}
                                desc={desc}
                                checked={toggles.visibility[key]}
                                onToggle={() => handleToggle("visibility", key)}
                            />
                        ))}
                    </div>
                </SettingsCard>


                {/* Data Sharing */}
                <SettingsCard>
                    <div className="title">
                        <div className="icon">
                            <BarChart3 />
                        </div>
                        <Title tt="uppercase" order={4} c="textWhite">
                            Data Sharing
                        </Title>
                    </div>
                    <div>
                        {sections.sharing.map(({ key, title, desc }) => (
                            <PrefRow
                                key={key}
                                title={title}
                                desc={desc}
                                checked={toggles.sharing[key]}
                                onToggle={() => handleToggle("sharing", key)}
                            />
                        ))}
                    </div>
                </SettingsCard>

                {/* Communication Preferences */}
                <SettingsCard>
                    <div className="title">
                        <div className="icon">
                            <Users />
                        </div>
                        <Title tt="uppercase" order={4} c="textWhite">
                            Communication Preferences
                        </Title>
                    </div>
                    <div>
                        {sections.comm.map(({ key, title, desc }) => (
                            <PrefRow
                                key={key}
                                title={title}
                                desc={desc}
                                checked={toggles.comm[key]}
                                onToggle={() => handleToggle("comm", key)}
                            />
                        ))}
                    </div>
                </SettingsCard>

                {/* Data Management */}
                <SettingsCard>
                    <div className="title">
                        <div className="icon">
                            <Shield />
                        </div>
                        <Title tt="uppercase" order={4} c="textWhite">
                            Data Management
                        </Title>
                    </div>
                    <div>
                        <PrivacyRow>
                            <div className="details">
                                <Text className="title">Download My Data</Text>
                                <Text className="desc">Request a copy of all your data</Text>
                            </div>
                            <Group>
                                <Button variant="primary">Request Download</Button>
                            </Group>
                        </PrivacyRow>
                        <PrivacyRow>
                            <div className="details">
                                <Text className="title">Delete My Data</Text>
                                <Text className="desc">
                                    Permanently delete all your data from GAMEIN
                                </Text>
                            </div>
                            <Group>
                                <Button variant="filled" color="red">
                                    Request Deletion
                                </Button>
                            </Group>
                        </PrivacyRow>
                    </div>
                </SettingsCard>

            </SettingsWrap>
        </>
    )
}


export default Privacy;