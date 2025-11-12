import React, { memo } from "react";
import { Controller } from "react-hook-form";
import { Text } from "@mantine/core";
import { useFormDisabled } from "../context/FormDisableContext";

const FormFieldComponent = ({
  name,
  control,
  rules,
  required = false,
  Component,
  componentProps = {},
  inline = false,
  render,
}) => {
  const isDisabled = useFormDisabled();

  return (
    <Controller
      name={name}
      control={control}
      rules={
        rules ||
        (required
          ? { required: `${componentProps.label || name} is required` }
          : undefined)
      }
      render={({ field, fieldState: { error } }) => {
        if (render) {
          return render({ field, error, disabled: isDisabled });
        }
        // console.log(Component?.displayName?.includes("Checkbox"), Component);

        const isCheckbox =
          Component?.displayName?.includes("Checkbox") ||
          Component?.name?.includes("Checkbox");
        // console.log(isCheckbox);

        const commonDisabled =
          componentProps.disabled !== undefined
            ? componentProps.disabled
            : isDisabled;

        const element = isCheckbox ? (
          (() => {
            // console.log("Checkbox value:", field.value);
            return (
              <Component
                {...componentProps}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.currentTarget.checked)}
                disabled={commonDisabled}
                error={error?.message}
              />
            );
          })()
        ) : (
          <Component
            {...field}
            {...componentProps}
            disabled={commonDisabled}
            label={!inline ? componentProps.label : undefined}
            error={error?.message}
            value={field.value ?? ""}
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
};

export default memo(FormFieldComponent);
