import { Text, Grid, Button } from "@mantine/core";
import StatBox from "./../../components/shared/ui/StatBox";
import ReusableModal from "./../../components/shared/modals/modal";
import { useNavigate } from "react-router";
import IconButton from "../../components/shared/ui/IconButton";
import { useSelector } from "react-redux";

export default function Dashboard() {
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.auth.accessToken);

    const handleClick = async () => {
        console.log(accessToken);
        try {
            const res = await fetch('http://localhost:3000/api/social-integration/connect?platform=TWITCH', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            const data = await res.json();  // ✅ This now works
            window.location.href = data.data.url;  // redirect to Twitch OAuth
        } catch (error) {
            console.error('Error initiating Twitch connection:', error);
        }
    }

    return (
        <>
            <Grid gutter={20}>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <StatBox title={"Profile Bio"} action={<ReusableModal title={"Edit Bio"} />}>
                        <Button onClick={() => handleClick()}>Twitch Login</Button>
                    </StatBox>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <StatBox
                        title={"Ongoing Sponsorships"}
                        action={<IconButton onClick={() => navigate("/sponsorships")} />}
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
            <div className="dashboard-content">
                <h1>Brand Dashboard</h1>
                <p>
                    Welcome to your dashboard. Here you can manage your brand, view
                    analytics, and more.
                </p>
                {/* Add more components or content as needed */}
            </div>
        </>
    );
}
