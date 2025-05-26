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
  isFinalStep = false,
}) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.multiStepForm?.formData || {});

  // Initialize form with default values and formData
  const {
    register,
    control,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
    setFocus,
    handleSubmit: formHandleSubmit,
  } = useForm({
    resolver: schema ? yupResolver(schema) : undefined,
    mode: "onSubmit",
    defaultValues: { ...defaultValues, ...formData },
  });

  // Watch for changes in form values
  const formValues = watch();

  // Update form values when formData changes
  useEffect(() => {
    Object.entries(defaultValues).forEach(([key]) => {
      if (formData[key] !== undefined) {
        setValue(key, formData[key]);
      }
    });
  }, [formData, defaultValues, setValue]);

  // Handle next step
  const handleNextStep = async () => {
    const isValid = await trigger(Object.keys(defaultValues));
    if (!isValid) {
      const firstErrorKey = Object.keys(errors)[0];
      setFocus(firstErrorKey);
      return;
    }

    const currentStepData = getValues();
    dispatch(saveStepData(currentStepData));

    if (isFinalStep && onSubmit) {
      const completeFormData = { ...formData, ...currentStepData };
      return onSubmit(completeFormData);
    }

    onNext?.();
  };

  // Handle previous step
  const handlePrevStep = () => {
    dispatch(saveStepData(getValues()));
    onPrev?.();
  };

  // Handle form submission
  const handleSubmit = formHandleSubmit((data) => {
    const currentStepData = Object.fromEntries(
      Object.entries(data).filter(([key]) =>
        Object.keys(defaultValues).includes(key)
      )
    );

    dispatch(saveStepData(currentStepData));

    if (onSubmit) {
      return onSubmit(currentStepData);
    }

    console.log("Submitted:", currentStepData);
  });

  return {
    register,
    control,
    errors,
    formValues,
    setValue,
    watch,
    trigger,
    setFocus,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
  };
}
