import { Group, Pagination, Text } from "@mantine/core";

const PaginationBar = ({
  page,
  totalPages,
  totalRecords,
  pageRangeText,
  onPageChange,
  size = "sm",
}) => {
  if (!totalRecords) {
    return null;
  }

  return (
    <Group mt="sm" justify="space-between" align="center" px="sm">
      <Text fz="xs" c="dimmed">
        {pageRangeText}
      </Text>
      <Pagination
        total={totalPages}
        value={page}
        onChange={onPageChange}
        withEdges
        size={size}
      />
    </Group>
  );
};

export default PaginationBar;
