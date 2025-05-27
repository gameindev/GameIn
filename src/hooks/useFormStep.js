import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resetForm, saveStepData } from "../stores/form/formSlice";
import { registerUserAsync } from './../stores/user/user.action';
import { notifications } from "@mantine/notifications";


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
    const [isSubmitting, setIsSubmitting] = useState(false);
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
    const handleSubmit = onSubmit
        ? formHandleSubmit(async (data) => {
            const currentStepData = Object.fromEntries(
                Object.entries(data).filter(([key]) =>
                    Object.keys(defaultValues).includes(key)
                )
            );

            dispatch(saveStepData(currentStepData));
            const completeFormData = {
                ...formData,
                ...currentStepData,
            };

            setIsSubmitting(true); // ✅ show loader
            const result = await dispatch(registerUserAsync(completeFormData));
            setIsSubmitting(false); // ✅ hide loader

            if (result?.success) {
                notifications.show({
                    title: "Registration successful",
                    color: "green",
                    position: "top-right",
                })
                localStorage.removeItem("persist:multiStepForm");
                dispatch(resetForm());
                // ✅ Proceed to final step only on success
                return onSubmit(completeFormData);
            } else {
                notifications.show({
                    title: "Registration failed",
                    message: result?.error,
                    color: "red",
                    position: "top-right",
                })
            }
        })
        : formHandleSubmit(handleNextStep);

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
        isSubmitting
    };
}
