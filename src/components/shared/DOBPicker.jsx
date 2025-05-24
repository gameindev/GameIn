import React from "react";
import { Select, Group, Box, Input } from "@mantine/core";
import { Controller } from "react-hook-form";

const DOBPicker = ({ control, error }) => {
  const days = Array.from({ length: 31 }, (_, i) =>
    `${i + 1}`.padStart(2, "0")
  );

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(0, i); // January is 0
    const label = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
    const value = String(i + 1).padStart(2, "0");
    return { label, value };
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => {
    const y = currentYear - i;
    return { label: String(y), value: String(y) };
  });

  return (
    <Box sx={{ position: "relative " }}>
      <Group grow>
        <Controller
          name="dobDay"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Day"
              placeholder="Select day"
              data={days}
              withAsterisk
              error={error ? " " : false}
              allowDeselect={false}
            />
          )}
        />
        <Controller
          name="dobMonth"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Month"
              placeholder="Select month"
              data={months}
              withAsterisk
              error={error ? " " : false}
              allowDeselect={false}
            />
          )}
        />
        <Controller
          name="dobYear"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Year"
              placeholder="Select year"
              data={years}
              withAsterisk
              error={error ? " " : false}
              allowDeselect={false}
            />
          )}
        />
      </Group>
      {error && <Input.Error>{error}</Input.Error>}
    </Box>
  );
};

export default React.memo(DOBPicker);
