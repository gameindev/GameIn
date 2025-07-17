/* eslint-disable */

import React, { memo } from "react";
import { Controller } from "react-hook-form";
import { Text } from "@mantine/core";

function FormFieldComponent({
  name,
  control,
  Component,
  componentProps = {},
  inline = false,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const element = (
          <Component
            {...field}
            {...componentProps}
            label={!inline ? componentProps.label : undefined}
            error={error?.message}
            // style={inline ? { flex: 0 } : undefined}
            value={field.value}
            onChange={field.onChange}
          />
        );

        if (inline) {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "0.625rem",
                justifyContent: "space-between",
              }}
            >
              <Text w={120}>{componentProps.label}</Text>
              {element}
            </div>
          );
        }

        return element;
      }}
    />
  );
}

export default memo(FormFieldComponent);
