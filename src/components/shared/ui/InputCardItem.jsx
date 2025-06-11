import React from "react";
import {
  Card,
  TextInput,
  Group,
  ActionIcon,
  Box,
  rem,
  Text,
} from "@mantine/core";
import { Plus, X, Check } from "lucide-react";
import { theme } from "../../../styles/theme/customTheme";
import styled from "styled-components";

const CloseIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${rem(10)};
  font-size: ${theme.fontSizes.sm};
  background: ${theme.colors.secondaryGrey[0]};
  border-radius: ${theme.radius.md};
  cursor: pointer;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(2)};
  padding-left: ${rem(4)};
`;

const InputCardItem = ({
  id,
  icon,
  placeholder,
  value,
  onChange,
  added,
  onToggle,
  readOnly = false,
}) => {
  return (
    <Card
      key={id}
      withBorder
      radius={theme.radius.md}
      mb="xs"
      w={"100%"}
      py={10}
      px={14}
      bg={theme.colors.inputBgColor[0]}
    >
      <Group align="center">
        <Box>{icon}</Box>
        {readOnly ? (
          <UserDetails style={{ flexGrow: 1 }}>
            <Text size="sm" fw={500}>
              {value}
            </Text>
          </UserDetails>
        ) : (
          <TextInput
            style={{ flexGrow: 1 }}
            variant="unstyled"
            value={value}
            onChange={(e) => onChange(id, e.currentTarget.value)}
            placeholder={placeholder}
            styles={{
              input: {
                paddingLeft: rem(4),
              },
            }}
          />
        )}

        {/* <ActionIcon variant="subtle" color="teal">
          <Check size={10} />
        </ActionIcon> */}

        <CloseIcon
          style={{
            backgroundColor: added
              ? theme.colors.secondaryGrey[0]
              : theme.colors.primary[0],
          }}
          onClick={() => onToggle(id)}
        >
          {added ? (
            <X size={10} stroke="#EA7171" />
          ) : (
            <Plus size={10} stroke={theme.colors.black[0]} />
          )}
        </CloseIcon>
      </Group>
    </Card>
  );
};

export default InputCardItem;
