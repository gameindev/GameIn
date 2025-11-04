import { Grid, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import StatBox from "../../../../shared/components/StatBox";
import ReusableModal from "../../../../shared/components/Modals";
import IconButton from "../../../../shared/components/IconButton";
import ProfileBioCard from "../../profile/components/ProfileBioCard";


const Dashboard = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <Grid gutter={20}>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <ProfileBioCard />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <StatBox
                        title={"Ongoing Sponsorships"}
                        action={
                            <IconButton
                                hoverClass="hoverYellow"
                                onClick={() => navigate("/sponsorships")}
                            />
                        }
                    ></StatBox>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <StatBox>
                        <Text>Stat</Text>
                    </StatBox>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <StatBox>
                        <Text>Stat</Text>
                    </StatBox>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
                    <StatBox>
                        <Text>Stat</Text>
                    </StatBox>
                </Grid.Col>
            </Grid>
        </>
    )
}

export default Dashboard;