/* eslint-disable */

import { Controller } from "react-hook-form";
import { Text } from "@mantine/core";

export default function FormField({
  name,
  control,
  Component,
  componentProps,
  inline = false,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const component = (
          <Component
            {...field}
            {...componentProps}
            label={!inline ? componentProps.label : undefined}
            error={error?.message}
            style={inline ? { flex: 1 } : undefined}
          />
        );

        if (inline) {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Text w={120}>{componentProps.label}</Text>
              {component}
            </div>
          );
        }

        return component;
      }}
    />
  );
}
