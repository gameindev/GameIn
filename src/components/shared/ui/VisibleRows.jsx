import { Group, Text, TextInput } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export default function VisibleRows({ size }) {
  return (
    <Group>
      <Text size={size}>Visible Rows</Text>
      <TextInput
        size="sm"
        variant="secondaryGrey"
        component="select"
        rightSection={<IconChevronDown />}
        pointer
        defaultValue="1"
      >
        <option value="" disabled>
          Select rows
        </option>
        <option value="1">10</option>
        <option value="2">2</option>
      </TextInput>
    </Group>
  );
}
