import * as Yup from "yup";

const takenUsernames = [
  "john_doe",
  "some.one12",
  "default_username",
  "dinisah",
];

export const stepOneSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Enter your email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Must be a valid email address"
    ),
  username: Yup.string()
    .trim()
    .required("Enter the valid username")
    .min(6, "Username must be at least 6 characters")
    .matches(
      /^(?:@)?[a-zA-Z0-9._]+$/,
      "Username can only include letters, numbers, dots, underscores, and an optional leading @"
    )
    .test("is-username-available", "Username is already taken", (value) => {
      if (!value) return false;
      return !takenUsernames.includes(value);
    }),
  password: Yup.string()
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
  dob: Yup.date()
    .required("Date of birth is required")
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
      "You must be at least 18 years old"
    )
    .min(new Date(1900, 0, 1), "Invalid date of birth"),
  acknowledgement: Yup.boolean().oneOf(
    [true],
    "You must acknowledge the terms and conditions"
  ),
});

export const stepTwoSchema = Yup.object().shape({
  role: Yup.string()
    .oneOf(
      ["admin", "creator", "brand", "community"],
      "Please select a valid role"
    )
    .required("Please choose your role"),
});

export const stepThreeSchema = Yup.object().shape({
  captcha: Yup.string().required("Please complete the captcha verification"),
});

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters"),
  password: Yup.string()
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
