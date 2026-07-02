import { Box, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import RatingCardSplitLayout from "./RatingCardSplitLayout";
import RatingScoreRing from "./RatingScoreRing";
import RatingEmptyCtaPanel from "./RatingEmptyCtaPanel";

export default function CreatorRatingEmptyState({
    onLearnMore,
    score = 0,
    statusText = "No ratings yet",
}) {
    const navigate = useNavigate();
    const handleLearnMore = onLearnMore ?? (() => navigate("/stats"));

    return (
        <RatingCardSplitLayout>
            <Box className="rating-score-panel">
                <RatingScoreRing score={score} />
                <Text className="rating-status" mt="md" ta="center">
                    {statusText}
                </Text>
            </Box>

            <Box className="rating-divider" aria-hidden="true" />

            <RatingEmptyCtaPanel onLearnMore={handleLearnMore} />
        </RatingCardSplitLayout>
    );
}
