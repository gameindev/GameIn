import { Box } from "@mantine/core";
import { theme } from "../../styles/theme/customTheme";

export default function StatBox({ children }) {
  return (
    <>
      <Box
        w={"100%"}
        h={"100%"}
        p="md"
        bg={theme.colors.secondaryGrey[0]}
        style={{ borderRadius: theme.radius.md }}
      >
        {children}
      </Box>
    </>
  );
}
