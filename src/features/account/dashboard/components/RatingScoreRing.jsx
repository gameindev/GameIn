import { Box, Flex, RingProgress, Text } from "@mantine/core";
import { theme } from "../../../../shared/styles/theme/customTheme";

const SCORE_RING_SIZE = 124;
const RING_TRACK = "rgba(52, 92, 72, 0.95)";

function StarRow({ score = 0, max = 5 }) {
    const filled = Math.min(max, Math.max(0, Math.round(Number(score) || 0)));

    return (
        <Flex gap={5} justify="center" mt={8}>
            {Array.from({ length: max }).map((_, i) => (
                <Box
                    key={i}
                    style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        border: `1px solid ${
                            i < filled ? theme.colors.primary[0] : "rgba(255, 255, 255, 0.28)"
                        }`,
                        background:
                            i < filled ? theme.colors.primary[0] : "rgba(255, 255, 255, 0.04)",
                    }}
                />
            ))}
        </Flex>
    );
}

export default function RatingScoreRing({ score = 0, starScore }) {
    const numeric = Number(score) || 0;
    const display = numeric.toFixed(1);
    const fillPct = Math.min(100, Math.max(0, (numeric / 5) * 100));

    return (
        <Box pos="relative" style={{ width: SCORE_RING_SIZE, height: SCORE_RING_SIZE }}>
            <RingProgress
                size={SCORE_RING_SIZE}
                thickness={11}
                roundCaps={fillPct > 0}
                rootColor={RING_TRACK}
                sections={
                    fillPct > 0
                        ? [{ value: fillPct, color: theme.colors.primary[0] }]
                        : [{ value: 100, color: RING_TRACK }]
                }
            />
            <Flex
                pos="absolute"
                inset={0}
                direction="column"
                align="center"
                justify="center"
                gap={0}
            >
                <Text fw={700} fz={28} c="white" lh={1}>
                    {display}
                </Text>
                <StarRow score={starScore ?? numeric} />
            </Flex>
        </Box>
    );
}
