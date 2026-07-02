import { Button, Stack, Text } from "@mantine/core";
import { theme } from "../../../../shared/styles/theme/customTheme";

export const RATING_EMPTY_CTA = {
    title: "Be the first to get rated!",
    copy: "Complete sponsorships to earn ratings from brands you work with.",
    buttonLabel: "Learn More",
};

export default function RatingEmptyCtaPanel({ onLearnMore }) {
    return (
        <Stack className="rating-cta-panel" gap="xs" justify="center">
            <Text fw={700} size="sm" c={theme.colors.white[0]} lh={1.35}>
                {RATING_EMPTY_CTA.title}
            </Text>
            <Text size="xs" c="dimmed" lh={1.55} maw={260}>
                {RATING_EMPTY_CTA.copy}
            </Text>
            {onLearnMore ? (
                <Button
                    variant="default"
                    size="sm"
                    radius="md"
                    onClick={onLearnMore}
                    mt={4}
                    styles={{
                        root: {
                            width: "fit-content",
                            background: "rgba(0, 0, 0, 0.32)",
                            border: "1px solid rgba(255, 255, 255, 0.14)",
                            color: theme.colors.white[0],
                            fontWeight: 500,
                            height: "2rem",
                            paddingInline: "1rem",
                            "&:hover": {
                                background: "rgba(255, 255, 255, 0.06)",
                            },
                        },
                    }}
                >
                    {RATING_EMPTY_CTA.buttonLabel}
                </Button>
            ) : null}
        </Stack>
    );
}
