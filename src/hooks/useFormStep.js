/* eslint-disable */

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { saveStepData } from "../lib/redux/slices/formSlice";



export function useFormStep({ defaultValues, schema, onNext, onPrev }) {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.multiStepForm.formData);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        trigger,
        getValues,
        setValue,
        watch,
    } = useForm({
        resolver: schema ? yupResolver(schema) : undefined,
        mode: "onTouched",
        defaultValues: {
            ...defaultValues,
            ...formData,
        },
    });

    const formValues = watch();

    useEffect(() => {
        Object.entries(defaultValues).forEach(([key]) => {
            if (formData[key] !== undefined) {
                setValue(key, formData[key]);
            }
        });
    }, [formData, defaultValues, setValue]);

    const handleNextStep = async () => {
        const isValid = await trigger(Object.keys(defaultValues));
        if (isValid) {
            dispatch(saveStepData(getValues()));
            onNext?.();
        }
    };

    const handlePrevStep = () => {
        dispatch(saveStepData(getValues()));
        onPrev?.();
    };

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
    };
}
