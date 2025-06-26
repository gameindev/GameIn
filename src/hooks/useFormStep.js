import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { resetForm, saveStepData } from "../stores/slices/form";
import useApi from "./useApi";
import { setUser } from "../stores/slices/user";
import { showNotification } from "../utils/helpers";
import { createUser } from "../services/users";
import { initializeForm } from "../stores/slices/form";

export function useFormStep({
    formId,
    defaultValues,
    schema,
    onNext,
    onPrev,
    onSubmit,
    isFinalStep = false,
}) {
    const dispatch = useDispatch();
    const formState = useSelector((state) => state.multiStepForm.forms?.[formId]);

    const formData = useMemo(
        () => formState?.formData || {},
        [formState?.formData]
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Initialize form with default values and formData

    useEffect(() => {
        if (!formState) {
            dispatch(initializeForm({ formId, initialData: defaultValues }));
        }
    }, [dispatch, formId, formState, defaultValues]);

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
        dispatch(saveStepData({ formId, data: currentStepData }));

        if (isFinalStep && onSubmit) {
            const completeFormData = { ...formData, ...currentStepData };
            return onSubmit(completeFormData);
        }

        onNext?.();
    };

    // Handle previous step
    const handlePrevStep = () => {
        dispatch(saveStepData({ formId, data: getValues() }));
        onPrev?.();
    };

    const { post } = useApi();
    // Handle form submission
    const handleSubmit = onSubmit
        ? formHandleSubmit(async (data) => {
            const currentStepData = Object.fromEntries(
                Object.entries(data).filter(([key]) =>
                    Object.keys(defaultValues).includes(key)
                )
            );

            dispatch(saveStepData({ formId, data: currentStepData }));
            const completeFormData = {
                ...formData,
                ...currentStepData,
            };

            setIsSubmitting(true); // ✅ show loader

            // Refister user here
            const { userData, error } = await createUser(completeFormData, post);
            setIsSubmitting(false); // ✅ hide loader

            if (error) {
                showNotification("Registration failed", error, "red");
                return;
            }

            if (userData) {
                showNotification(
                    "Registration successful",
                    "Please verify your mail id"
                );
                localStorage.removeItem("persist:multiStepForm");
                dispatch(resetForm({ formId }));
                dispatch(setUser(userData));
                // ✅ Proceed to final step only on success
                return onSubmit(completeFormData);
            }
        })
        : formHandleSubmit(handleNextStep);

    return {
        register,
        control,
        errors,
        formValues,
        setValue,
        getValues,
        watch,
        trigger,
        setFocus,
        handleNextStep,
        handlePrevStep,
        handleSubmit,
        isSubmitting,
    };
}
