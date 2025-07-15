import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

export function useFormHandler({
  schema,
  defaultValues = {},
  onSubmit,
  onSuccess,
  onError,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    trigger,
    reset,
    setFocus,
  } = useForm({
    resolver: schema ? yupResolver(schema) : undefined,
    defaultValues,
    mode: "onSubmit",
  });

  const submit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      const result = await onSubmit?.(data);
      setIsSubmitting(false);
      onSuccess?.(result);
    } catch (err) {
      setIsSubmitting(false);
      onError?.(err);
    }
  });

  return {
    control,
    register,
    handleSubmit: submit,
    errors,
    watch,
    setValue,
    getValues,
    trigger,
    reset,
    setFocus,
    isSubmitting,
  };
}
