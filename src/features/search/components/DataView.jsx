import { Group, SegmentedControl, Text } from "@mantine/core";
import { IconLayoutGrid, IconList, IconTable } from "@tabler/icons-react";

export default function DataView({ viewMode, setViewMode, size = "md" }) {
    const iconProps = {
        style: { display: "block" },
        size: "1em",
    };

    return (
        <Group className="segmentControl">
            <Text size={size}>Select View</Text>
            <SegmentedControl
                withItemsBorders={false}
                value={viewMode}
                onChange={(value) => setViewMode(value)}
                data={[
                    { label: <IconLayoutGrid {...iconProps} />, value: "grid" },
                    { label: <IconList {...iconProps} />, value: "list" },
                    { label: <IconTable {...iconProps} />, value: "table" },
                ]}
            />
        </Group>
    );
}
