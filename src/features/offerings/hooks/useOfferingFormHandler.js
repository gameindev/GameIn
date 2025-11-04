import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


export function useOfferingFormHandler({
    schema,
    defaultValues = {},
    onSubmit,
    onSuccess,
    onError,
}) {
    const isMounted = useRef(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

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
            if (isMounted.current) setIsSubmitting(true);

            const result = await onSubmit?.(data);

            if (isMounted.current) setIsSubmitting(false);

            onSuccess?.(result);
        } catch (err) {
            if (isMounted.current) setIsSubmitting(false);
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
