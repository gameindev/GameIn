import { useState } from "react";
import {
  Box,
  Center,
  Text,
  Flex,
  Collapse,
  ActionIcon,
  Button,
} from "@mantine/core";
import { theme } from "../../../styles/theme/customTheme";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

export default function StatBox({
  title,
  action,
  background,
  children,
  accordion = false,
  actionCTA = false,
  defaultOpen = true,
  onSponsorClick,
  ...props
}) {
  const [opened, setOpened] = useState(defaultOpen);

  const handleSponsorClick = () => {
    if (onSponsorClick) {
      onSponsorClick();
    }
  };

  return (
    <Box
      w="100%"
      h="100%"
      p="md"
      {...props}
      style={{
        background: background || theme.colors.secondaryGrey[0],
        borderRadius: theme.radius.md,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <Flex justify="space-between" align="center" className="box_header">
          <Text c={theme.colors.white[0]} className="title">
            {title || "Card Title"}
          </Text>

          <Flex align="right" gap="xs">
            {accordion && (
              <ActionIcon
                variant="transparent"
                onClick={() => setOpened((o) => !o)}
                aria-label="Toggle content"
                color="white"
              >
                {opened ? (
                  <IconChevronUp size={18} />
                ) : (
                  <IconChevronDown size={18} />
                )}
              </ActionIcon>
            )}
            {action && <div className="action_cta">{action}</div>}
          </Flex>
        </Flex>

        {accordion ? (
          <Collapse h={"100%"} in={opened}>
            <Box mt="sm">{children}</Box>
          </Collapse>
        ) : (
          <Box style={{ ...props.style }} mt="sm">
            {children}
          </Box>
        )}
      </Box>

      <Box style={{ flexGrow: 1 }} />

      {actionCTA && (
        <Button
          mt="md"
          radius="md"
          variant="primary"
          style={{
            width: "fit-content",
            alignSelf: "flex-end",
          }}
          onClick={handleSponsorClick}
        >
          Sponsor
        </Button>
      )}
    </Box>
  );
}
