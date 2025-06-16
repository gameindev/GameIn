import { Text, Grid } from "@mantine/core";
import StatBox from "./../../components/shared/ui/StatBox";
import ReusableModal from "./../../components/shared/modals/modal";
import { useNavigate } from "react-router";
import IconButton from "../../components/shared/ui/IconButton";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <Grid gutter={20}>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <StatBox title={"Profile Bio"} action={<ReusableModal title={"Edit Bio"} />}></StatBox>
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
