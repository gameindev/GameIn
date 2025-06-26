import { useState } from "react";
import { Box, Center, Text, Flex, Collapse, ActionIcon } from "@mantine/core";
import { theme } from "../../../styles/theme/customTheme";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function StatBox({
  title,
  action,
  background,
  children,
  accordion = false,
  defaultOpen = true,
}) {
  const [opened, setOpened] = useState(defaultOpen);

  return (
    <Box
      w={"100%"}
      h={"100%"}
      p="md"
      bg={background || theme.colors.secondaryGrey[0]}
      style={{ borderRadius: theme.radius.md }}
    >
      <Flex justify="space-between" align="center" className="box_header">
        <Text c={theme.colors.white[0]} className="title">
          {title || "Card Title"}
        </Text>

        <Flex align="center" gap="xs">
          {accordion && (
            <ActionIcon
              variant="transparent"
              onClick={() => setOpened((o) => !o)}
              aria-label="Toggle content"
              color="white"
            >
              {opened ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </ActionIcon>
          )}
          {action && <div className="action_cta">{action}</div>}
        </Flex>
      </Flex>

      {accordion ? (
        <Collapse in={opened}>
          <Box mt="sm">{children}</Box>
        </Collapse>
      ) : (
        <Box mt="sm">{children}</Box>
      )}
    </Box>
  );
}
