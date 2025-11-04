import { Box, Flex } from "@mantine/core";
import { theme } from "../../../shared/styles/theme/customTheme";
import { EmptySeparator } from "../utils/separators";



const OngoingSponsorshipHeader = () => {
    return (
        <Flex
            p="sm"
            tt="uppercase"
            fz={theme.fontSizes.xs}
            fw={500}
            align="center"
            gap="sm"
        >
            <Box flex={1}>Sponsor</Box>
            <EmptySeparator />
            <Box flex={1} ta="center">
                Type
            </Box>
            <EmptySeparator />
            <Box flex={2.35}>Info</Box>
            <EmptySeparator />
            <Box flex={0.75} ta="right">
                Price (USD)
            </Box>
            <EmptySeparator />
            <Box flex={0.75} ta="center">
                Time
            </Box>
            <EmptySeparator />
            <Box flex={1.65} ta="center">
                Interact
            </Box>
        </Flex>
    )
}

export default OngoingSponsorshipHeader;