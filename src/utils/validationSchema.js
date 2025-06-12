import * as Yup from "yup";
import { checkEmailAndUsernameExists } from "./api/user";
import { USERTYPES } from "./enum";

// const takenUsernames = [
//     "john_doe",
//     "some.one12",
//     "default_username",
//     "dinisah",
// ];

export const stepOneSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Enter your email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Must be a valid email address"
    )
    .test("email-unique", "Email already in use", async function (value) {
      if (!value) return true;
      try {
        const emailExists = await checkEmailAndUsernameExists({ email: value });
        return !emailExists;
      } catch (error) {
        return error;
      }
    }),
  username: Yup.string()
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
        const usernameExists = await checkEmailAndUsernameExists({
          username: value,
        });
        return !usernameExists;
      } catch (err) {
        return err;
      }
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
    .oneOf([USERTYPES.CREATOR, USERTYPES.BRAND, USERTYPES.COMMUNITY], "Please select a valid role")
    .required("Please choose your role"),
});

export const stepThreeSchema = Yup.object().shape({
  captcha: Yup.string().required("Please complete the captcha verification"),
});

export const OAuthProfile = Yup.object().shape({
  userType: Yup.string()
    .oneOf([USERTYPES.CREATOR, USERTYPES.BRAND, USERTYPES.COMMUNITY], "Please select a valid role")
    .required("Please choose your role"),
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

export const loginSchema = Yup.object().shape({
  identifier: Yup.string()
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
