import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { initializeForm, resetForm, saveStepData } from "../store/formSlice";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import useApi from "../../../shared/hooks/useApi";
import { setUser } from "../store/userSlice";
import { createUserService } from "../../../app/services/user/create-user.service";


export function useFormStep({
    formId,
    defaultValues,
    schema,
    onNext,
    onPrev,
    onSubmit,
    isFinalStep = false,
}) {
    const dispatch = useAppDispatch();
    const formState = useAppSelector((state) => state.multiStepForm.forms?.[formId]);

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

            setIsSubmitting(true);

            // Register user here
            try {
                const userData = await createUserService(completeFormData, post);
                
                if (userData) {
                    showNotificationHelper("Registration successful", "Please verify your mail id");
                    localStorage.removeItem("persist:multiStepForm");
                    dispatch(resetForm({ formId }));
                    dispatch(setUser(userData));
                }
                setIsSubmitting(false);
                return onSubmit(completeFormData);
            } catch (error) {
                showNotificationHelper("Registration failed", error.message, "red");
                setIsSubmitting(false);
                return;
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
