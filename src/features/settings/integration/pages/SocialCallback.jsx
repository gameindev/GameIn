import { useEffect, useState } from "react";
import { Box, Center, Loader, Text, Title } from "@mantine/core";
import { useAppDispatch } from "../../../../app/store/hooks";
import { fetchAllStatuses, clearSocialStats } from "../store/socialIntegrationSlice";
import { getOAuthCallbackQuery } from "../utils/parseHashOrSearchQuery";

const SocialCallback = () => {
    const dispatch = useAppDispatch();
    const [qp, setQp] = useState(() => getOAuthCallbackQuery());

    useEffect(() => {
        const refresh = () => setQp(getOAuthCallbackQuery());
        refresh();
        window.addEventListener("hashchange", refresh);
        return () => window.removeEventListener("hashchange", refresh);
    }, []);

    useEffect(() => {
        const redirectToIntegrations = () => {
            const target = "#/settings/integrations";
            if (window.location.hash !== target) {
                window.location.hash = target;
            } else {
                window.location.assign(`${window.location.origin}/#/settings/integrations`);
            }
        };

        let cancelled = false;
        const run = async () => {
            try {
                if (qp.status === "success") {
                    dispatch(clearSocialStats());
                    await dispatch(fetchAllStatuses()).unwrap();
                }
            } catch (e) {
                console.error(e);
            } finally {
                if (!cancelled) {
                    setTimeout(redirectToIntegrations, qp.status === "success" ? 400 : 900);
                }
            }
        };

        run();
        return () => {
            cancelled = true;
        };
    }, [dispatch, qp.status]);

    const failMessage = qp.message
        ? (() => {
              try {
                  return decodeURIComponent(qp.message);
              } catch {
                  return qp.message;
              }
          })()
        : "Something went wrong during connection.";

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
                    {qp.status === "success"
                        ? "Updating your integrations — redirecting to Settings."
                        : failMessage}
                </Text>
            </Box>
        </Center>
    );
};

export default SocialCallback;
