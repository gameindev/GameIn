/* eslint-disable */

import { Controller } from "react-hook-form";

export default function FormField({
  name,
  control,
  Component,
  componentProps,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Component {...field} {...componentProps} error={error?.message} />
      )}
    />
  );
}
