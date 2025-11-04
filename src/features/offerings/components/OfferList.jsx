import { useEffect, useMemo, useState } from "react";
import { offeringService } from "../services";
import { List, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";


const OfferList = ({
    offers,
    allOffers,
    showAllVersions = false,
    colorScheme = theme,
    resetFlag = false,
}) => {
    const [resetOffers, setResetOffers] = useState(false);

    useEffect(() => {
        if (resetFlag) {
            setResetOffers(true);
            setTimeout(() => setResetOffers(false), 100);
        }
    }, [resetFlag]);


    const displayOffers = useMemo(
        () =>
            showAllVersions
                ? offeringService.getAllOffers(offers || [])
                : offeringService.getLatestOffers(offers || []),
        [offers, showAllVersions]
    );



    const processedOffers = useMemo(() => {
        // if (resetOffers) {
        //   return displayOffers.map((offer) => ({ ...offer, sizeChanged: false }));
        // }

        return displayOffers.map((offer) => {
            const previousVersions = (allOffers || [])
                .filter(
                    (o) => o.offer_type === offer.offer_type && o.version < offer.version
                )
                .sort((a, b) => b.version - a.version);

            const previousSize = previousVersions[0]?.size;
            const sizeChanged = previousSize && previousSize !== offer.size;

            return {
                ...offer,
                sizeChanged,
            };
        });
    }, [displayOffers, allOffers, resetOffers]);



    return (
        <List
            size="sm"
            spacing="xs"
            pl={0}
            icon={<IconCheck size={14} color={colorScheme.colors.primary[0]} />}
        >
            {processedOffers.map((offer) => (
                <List.Item key={offer.id}>
                    <Text span c={colorScheme.colors.white[0]}>
                        {offer.offer_type}
                    </Text>{" "}
                    – Logo on {offer.platform} for {offer.time_mode} with{" "}
                    <Text
                        span
                        c={
                            offer.sizeChanged
                                ? colorScheme.colors.yellow[0]
                                : colorScheme.colors.white[0]
                        }
                        fw={offer.sizeChanged ? 700 : 400}
                    >
                        {offer.size}
                        {offer.sizeChanged && " (updated)"}
                    </Text>{" "}
                    {showAllVersions && (
                        <Text span c="dimmed">
                            (v{offer.version})
                        </Text>
                    )}
                </List.Item>
            ))}
        </List>
    );
};

export default OfferList;