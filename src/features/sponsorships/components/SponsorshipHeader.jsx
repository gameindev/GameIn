import { Box, Flex } from "@mantine/core";
import { Text } from "@mantine/core";
import { theme } from "../../../shared/styles/theme/customTheme";
import { EmptySeparator } from "../utils/separators";

const SponsorshipHeader = () => {
    return (
        <Flex
            className="sponsorship-table-head"
            p="sm"
            tt="uppercase"
            fz={theme.fontSizes.xs}
            fw={500}
            align="center"
            gap="sm"
        >
            <Box flex={1}>Sponsor</Box>
            <EmptySeparator />
            <Box ta="center" flex={0.75}>
                Type
            </Box>
            <EmptySeparator />
            <Box flex={2}>
                <Flex justify="space-between" align="center">
                    <Text>Offered</Text>
                    <Text>Pending</Text>
                    <Text>Accepted</Text>
                    <Text>Sponsored</Text>
                </Flex>
            </Box>
            <EmptySeparator />
            <Box flex={0.75} ta="center">
                Expiring
            </Box>
            <EmptySeparator />
            <Box flex={0.75} ta="center">
                Starting
            </Box>
            <EmptySeparator />
            <Box ta="center" flex={2}>
                Interact
            </Box>
        </Flex>
    )
}

export default SponsorshipHeader;
