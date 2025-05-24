/* eslint-disable */

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { saveStepData } from "../lib/redux/slices/formSlice";

export function useFormStep({
  defaultValues,
  schema,
  onNext,
  onPrev,
  onSubmit,
}) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.multiStepForm.formData);

  const {
    register,
    handleSubmit: formHandleSubmit,
    control,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
    setFocus,
  } = useForm({
    resolver: schema ? yupResolver(schema) : undefined,
    mode: "onTouched",
    defaultValues: {
      ...defaultValues,
      ...(onNext ? formData : {}),
    },
  });

  const formValues = watch();

  useEffect(() => {
    if (onNext) {
      Object.entries(defaultValues).forEach(([key]) => {
        if (formData[key] !== undefined) {
          setValue(key, formData[key]);
        }
      });
    }
  }, [formData, defaultValues, setValue, onNext]);

  const handleNextStep = async () => {
    const isValid = await trigger(Object.keys(defaultValues));
    if (!isValid) {
      const firstErrorKey = Object.keys(errors)[0];
      setFocus(firstErrorKey);
    } else {
      dispatch(saveStepData(getValues()));
      console.log("Saving to Redux", getValues());
      onNext?.();
    }
  };

  const handlePrevStep = () => {
    dispatch(saveStepData(getValues()));
    onPrev?.();
  };

  const handleSubmit = onSubmit
    ? formHandleSubmit((data) => {
        const formFields = Object.keys(defaultValues);
        const filteredData = Object.fromEntries(
          Object.entries(data).filter(([key]) => formFields.includes(key))
        );
        return onSubmit(filteredData);
      })
    : formHandleSubmit(handleNextStep);

  return {
    register,
    trigger,
    control,
    errors,
    formValues,
    setValue,
    watch,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
  };
}
