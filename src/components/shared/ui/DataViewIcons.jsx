
import { LayoutGrid, List, Table } from "lucide-react";
import { Group, SegmentedControl, Text } from "@mantine/core";

export default function DataView({ viewMode, setViewMode, size="md"}) {

    const iconProps = {
        style: { display: "block" },
        size: '1em',
    };
    
    return (
        <Group className="segmentControl">
            <Text size={size}>Select View</Text>
            <SegmentedControl
                withItemsBorders={false}
                value={viewMode}
                onChange={(value) => setViewMode(value)}
                data={[
                    { label: <LayoutGrid {...iconProps} />, value: "grid" },
                    { label: <List {...iconProps} />, value: "list" },
                    { label: <Table {...iconProps} />, value: "table" },
                ]}
            />
        </Group>
    )
}
