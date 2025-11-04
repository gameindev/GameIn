import { Box, Container, Stack, Text, Title } from "@mantine/core";
import { theme } from "../../shared/styles/theme/customTheme";

const MaintenancePage = () => {
    const maintenanceMessage = import.meta.env.VITE_MAINTENANCE_MESSAGE || 
        "We're currently performing scheduled maintenance. We'll be back shortly!";
    const estimatedTime = import.meta.env.VITE_MAINTENANCE_ETA || null;

    return (
        <Container 
            size="md" 
            style={{ 
                minHeight: "100vh", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center" 
            }}
        >
            <Box
                style={{
                    textAlign: "center",
                    padding: "2rem",
                    maxWidth: "600px",
                }}
            >
                <Stack gap="xl" align="center">
                    <Title 
                        order={1} 
                        size="3rem" 
                        c={theme.colors.primary?.[0] || "blue"}
                    >
                        Maintenance Mode
                    </Title>
                    
                    <Box
                        style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${theme.colors.primary?.[0] || "#1a73e8"} 0%, ${theme.colors.primary?.[1] || "#4285f4"} 100%)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "2rem auto",
                            animation: "pulse 2s ease-in-out infinite",
                        }}
                    >
                        <Text
                            size="3rem"
                            fw={700}
                            c="white"
                        >
                            ⚙️
                        </Text>
                    </Box>

                    <Text 
                        size="xl" 
                        c="dimmed"
                        style={{ lineHeight: 1.6 }}
                    >
                        {maintenanceMessage}
                    </Text>

                    {estimatedTime && (
                        <Text 
                            size="lg" 
                            c="dimmed"
                            fw={500}
                        >
                            Estimated time: {estimatedTime}
                        </Text>
                    )}

                    <Text 
                        size="sm" 
                        c="dimmed"
                        style={{ marginTop: "2rem" }}
                    >
                        Thank you for your patience!
                    </Text>
                </Stack>

                <style>{`
                    @keyframes pulse {
                        0%, 100% {
                            transform: scale(1);
                            opacity: 1;
                        }
                        50% {
                            transform: scale(1.05);
                            opacity: 0.9;
                        }
                    }
                `}</style>
            </Box>
        </Container>
    );
};

export default MaintenancePage;

