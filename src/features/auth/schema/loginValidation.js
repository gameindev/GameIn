import * as yup from "yup";


export const loginValidationSchema = yup.object().shape({
    identifier: yup.string()
        .trim()
        .required("Username or email is required")
        .test(
            "is-username-or-email",
            "Enter a valid email or a username (min 6 chars, no spaces)",
            (value) => {
                if (!value) return false;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const usernameRegex = /^[a-zA-Z0-9_]{6,}$/;
                return emailRegex.test(value) || usernameRegex.test(value);
            }
        ),
    password: yup.string()
        .trim()
        .required("Enter your password")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
            /[^a-zA-Z0-9]/,
            "Password must contain at least one special character"
        ),
});