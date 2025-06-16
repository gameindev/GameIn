import { Box, Center, Flex } from "@mantine/core";
import { theme } from "../../../styles/theme/customTheme";

export default function StatBox({ title, action, background, children }) {
  return (
    <>
      <Box
        w={"100%"}
        h={"100%"}
        p="md"
        bg={background || theme.colors.secondaryGrey[0]}
        style={{ borderRadius: theme.radius.md }}
      >
        <Flex justify="space-between" align="center" className="box_header">
          <div className="title">{title || "Card Title"}</div>
          <div className="action_cta">{action}</div>
        </Flex>
        <Box>{children}</Box>
      </Box>
    </>
  );
}
