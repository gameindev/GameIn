import * as yup from "yup";


export const stepOneValidationSchema = (checkExists) => yup.object().shape({
    email: yup.string()
        .trim()
        .required("Enter your email address")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Must be a valid email address"
        )
        .test("email-unique", "Email already in use", async function (value) {
            if (!value) return true;
            try {
                const emailExists = await checkExists({ email: value });
                console.log("Email check response:", emailExists);
                return !emailExists;
            } catch (error) {
                return error;
            }
        }),
    username: yup.string()
        .trim()
        .required("Enter the valid username")
        .min(6, "Username must be at least 6 characters")
        .matches(
            /^(?:@)?[a-zA-Z0-9._]+$/,
            "Username can only include letters, numbers, dots, underscores, and an optional leading @"
        )
        .test("username-unique", "Username already taken", async function (value) {
            if (!value) return true;
            try {
                const usernameExists = await checkExists({
                    username: value,
                });
                console.log("Username check response:", usernameExists);
                return !usernameExists;
            } catch (err) {
                return err;
            }
        }),
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
    dob: yup.date()
        .required("Date of birth is required")
        .max(
            new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
            "You must be at least 18 years old"
        )
        .min(new Date(1900, 0, 1), "Invalid date of birth"),
    acknowledgement: yup.boolean().oneOf(
        [true],
        "You must acknowledge the terms and conditions"
    ),
});