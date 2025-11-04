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

                const element = (
                    <Component
                        {...field}
                        {...componentProps}
                        disabled={
                            componentProps.disabled !== undefined
                                ? componentProps.disabled
                                : isDisabled
                        }
                        label={!inline ? componentProps.label : undefined}
                        error={error?.message}
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
    )
}

export default memo(FormFieldComponent);