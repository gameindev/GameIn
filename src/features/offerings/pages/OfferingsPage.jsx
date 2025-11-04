import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router";
import { currentUser } from "../../auth/store/selector";
import { useState } from "react";
import { Center, Grid, Text } from "@mantine/core";
import Preloader from "../../../shared/components/Preloader";
import StatBox from "../../../shared/components/StatBox";
import SponsorshipOpportunityCard from "../components/SponsorshipOpportunityCard";
import { useOfferings } from "../hooks/useOfferings";
import OfferingCard from "../components/OfferingCard";


export default function OfferingsPage() {
    const navigate = useNavigate();
    const { userProfile, isSelf } = useOutletContext();
    const user = useSelector(currentUser);
    const [showAllVersions, setShowAllVersions] = useState(false);

    const { offerings, loading, error } = useOfferings({
        userId: userProfile?.id,
    });

    
 
    if (loading) return <Preloader />;

    if (error) {
        return (
            <Center mih={200}>
                <Text c="dimmed" fw={500} size="md">
                    Something went wrong while fetching offerings. Please try again later.
                </Text>
            </Center>
        );
    }
   
    if (!loading && offerings.data?.data?.length === 0 && !isSelf) {
        return (
            <Center mih={200}>
                <Text c="dimmed" fw={500} size="md">
                    No offerings found
                </Text>
            </Center>
        );
    }


    return (
        <>
            <Grid gutter={20}>
                {isSelf && (
                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                        <StatBox
                            title="Sponsorships"
                            background={`repeating-linear-gradient(
                                45deg,
                                rgba(255, 255, 255, 0.05),
                                rgba(255, 255, 255, 0.05) 1px,
                                transparent 1px,
                                transparent 10px
                            ), rgba(92, 229, 176, 0.4)`}
                        >
                            <SponsorshipOpportunityCard />
                        </StatBox>
                    </Grid.Col>
                )}

                {offerings && offerings.data?.data?.map((offering) => (
                    <OfferingCard
                        key={offering.id}
                        offering={offering}
                        isSelf={isSelf}
                        userProfile={userProfile}
                        showAllVersions={showAllVersions}
                        navigate={navigate}
                        user={user}
                    />
                ))}
            </Grid>
        </>
    )
}