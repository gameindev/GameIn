import { useEffect, useMemo } from "react";
import { Box, Center, Loader, Text, Title } from "@mantine/core";
import { useSocialIntegrations } from "../hooks/useSocialIntegrations";

const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
        status: params.get("status") || "",
        message: params.get("message") || "",
    };
};

const SocialCallback = () => {
    const { handleFetchStats, integrations } = useSocialIntegrations();

    const qp = useMemo(() => getQueryParams(), []);

    useEffect(() => {
        const redirectToIntegrations = () => {
            // Prefer hash routing default
            const target = "#/settings/integrations";
            if (window.location.hash !== target) {
                window.location.hash = target;
            } else {
                // Fallback full navigation (in case router not initialized yet)
                window.location.assign(`${window.location.origin}/#/settings/integrations`);
            }
        };

        // Small delay to let any backend persistence settle and UI to read status
        const timeout = setTimeout(async () => {
            try {
                if (qp.status === "success") {
                    redirectToIntegrations();
                } else {
                    redirectToIntegrations();
                }
            } catch (error) {
                console.error(error);
                redirectToIntegrations();
            }
        }, 1000);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qp.status]);

    return (
        <Center style={{ width: "100%", height: "70vh" }}>
            <Box>
                <Center mb="sm">
                    <Loader size="md" />
                </Center>
                <Title order={4} ta="center">
                        {qp.status === "success" ? "Social connect successful" : "Social connect failed"}
                </Title>
                <Text size="sm" c="dimmed" ta="center" mt={6}>
                    {qp.status === "success" ? "Please wait while we complete the connection and update your integrations." : decodeURIComponent(qp.message)}
                </Text>
            </Box>
        </Center>
    );
};

export default SocialCallback;


