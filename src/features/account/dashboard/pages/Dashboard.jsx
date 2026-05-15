import { Grid, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../../app/store/hooks";
import { currentUser } from "../../../auth/store/selector";
import { USERTYPES } from "../../../../shared/enums/userTypesEnum";
import StatBox from "../../../../shared/components/StatBox";
import IconButton from "../../../../shared/components/IconButton";
import DashboardIncomeStats from "../components/DashboardIncomeStats";
import SponsorshipCompactList from "../../../../shared/components/SponsorshipCompactList";
import OffersCompactList from "../../../../shared/components/OffersCompactList";
import CreatorAggregatedRating from "../components/CreatorAggregatedRating";
import SocialMediaStats from "../../../sponsorships/components/SocialMediaStats";

const Dashboard = () => {
    const navigate = useNavigate();
    const user = useAppSelector(currentUser);
    const isCreator = user?.user_type?.toUpperCase() === USERTYPES.CREATOR;

    return (
        <>
            <Grid gutter={20}>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <DashboardIncomeStats />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <StatBox
                        title={"Ongoing Sponsorships"}
                        action={
                            <IconButton
                                hoverClass="hoverYellow"
                                onClick={() => navigate("/stats")}
                            />
                        }
                    >
                        <SponsorshipCompactList />
                    </StatBox>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <StatBox
                        title={"Offers"}
                        action={
                            <IconButton
                                hoverClass="hoverYellow"
                                onClick={() => navigate("/stats")}
                            />
                        }
                    >
                        <OffersCompactList />
                    </StatBox>
                </Grid.Col>

                {isCreator && (
                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                        <StatBox
                            title="Rating"
                            action={
                                <IconButton
                                    hoverClass="hoverYellow"
                                    aria-label="Sponsorship ratings from brands"
                                />
                            }
                        >
                            <CreatorAggregatedRating />
                        </StatBox>
                    </Grid.Col>
                )}

                <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
                    <StatBox
                        title="Social Media Stats"
                        action={<IconButton hoverClass="hoverYellow" />}
                        background={
                            "transparent linear-gradient(45deg, #9d7fef3b 0%, #5ce5b03b 100%) 0% 0% no-repeat"
                        }
                    >
                        <SocialMediaStats />
                    </StatBox>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Dashboard;
