import CreatorAggregatedRating from "../../dashboard/components/CreatorAggregatedRating";
import BrandCreatorRatingCard from "./BrandCreatorRatingCard";

/**
 * Profile rating card:
 * - Creator on own profile → aggregated ratings
 * - Brand on creator profile → rate creator CTA
 */
export default function CreatorProfileRatingCard({
    creatorUserId,
    creatorUsername,
    isSelf,
    viewerIsBrand,
}) {
    if (viewerIsBrand && !isSelf) {
        return (
            <BrandCreatorRatingCard
                creatorUserId={creatorUserId}
                creatorUsername={creatorUsername}
            />
        );
    }

    return <CreatorAggregatedRating variant="profile" />;
}
