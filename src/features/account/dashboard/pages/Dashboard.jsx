import { Grid } from "@mantine/core";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useAppSelector } from "../../../../app/store/hooks";
import { currentUser } from "../../../auth/store/selector";
import { USERTYPES } from "../../../../shared/enums/userTypesEnum";
import { theme } from "../../../../shared/styles/theme/customTheme";
import StatBox from "../../../../shared/components/StatBox";
import IconButton from "../../../../shared/components/IconButton";
import SponsorshipCompactList from "../../../../shared/components/SponsorshipCompactList";
import OffersCompactList from "../../../../shared/components/OffersCompactList";
import DashboardPerformanceSummary from "../components/DashboardPerformanceSummary";
import CreatorAggregatedRating from "../components/CreatorAggregatedRating";

const CARD_BORDER = "1px solid rgba(255, 255, 255, 0.06)";
const statBoxStyle = {
    background: theme.colors.secondaryGrey[0],
    border: CARD_BORDER,
};

const Dashboard = () => {
    const navigate = useNavigate();
    const user = useAppSelector(currentUser);
    const isCreator = user?.user_type?.toUpperCase() === USERTYPES.CREATOR;
    const goToStats = () => navigate("/stats");

    return (
        <DashboardShell>
            <Grid className="dashboard-grid" gutter={20}>
                <Grid.Col span={{ base: 12, lg: isCreator ? 8 : 12 }}>
                    <DashboardPerformanceSummary />
                </Grid.Col>

                {isCreator && (                    
                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }} className="dashboard-rating-col">
                        <StatBox
                            title="Rating"
                            action={
                                <IconButton
                                    hoverClass="hoverYellow"
                                    aria-label="Sponsorship ratings from brands"
                                />
                            }
                            noFlexFill
                            className="dashboard-rating-box"
                            style={{
                                ...statBoxStyle,
                                minHeight: 220,
                            }}
                        >
                            <CreatorAggregatedRating />
                        </StatBox>
                    </Grid.Col>
                )}

                <Grid.Col span={{ base: 12, md: 6 }}>
                    <StatBox
                        title="Ongoing Sponsorships"
                        action={<IconButton hoverClass="hoverYellow" onClick={goToStats} />}
                        noFlexFill
                        style={statBoxStyle}
                    >
                        <SponsorshipCompactList />
                    </StatBox>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                    <StatBox
                        title="Offers"
                        action={<IconButton hoverClass="hoverYellow" onClick={goToStats} />}
                        noFlexFill
                        style={statBoxStyle}
                    >
                        <OffersCompactList />
                    </StatBox>
                </Grid.Col>
            </Grid>
        </DashboardShell>
    );
};

const DashboardShell = styled.div`
    min-width: 0;
    max-width: 100%;

    .dashboard-grid,
    .mantine-Grid-inner,
    .dashboard-rating-col,
    .dashboard-rating-box,
    .dashboard-rating-box > div {
        min-width: 0;
    }

    .dashboard-rating-box .box_header .title {
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: 0.01em;
    }

    @media (max-width: 768px) {
        .dashboard-grid .mantine-Grid-col {
            flex: 0 0 100% !important;
            max-width: 100% !important;
            width: 100% !important;
        }
    }
`;

export default Dashboard;
