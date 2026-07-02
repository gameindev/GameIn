import { Box } from "@mantine/core";

export const Separator = () => (
  <Box
    className="sponsorship-separator"
    w={1}
    h={30}
    style={{ borderLeft: "0.063rem dashed #50565a" }}
  />
);

export const EmptySeparator = () => <Box className="sponsorship-separator" w={1} h={30} />;
