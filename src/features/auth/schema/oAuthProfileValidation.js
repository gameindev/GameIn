import * as yup from "yup";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";

export const oAuthProfileValidationSchema = yup.object().shape({
    user_type: yup.string()
        .oneOf([USERTYPES.CREATOR, USERTYPES.BRAND, USERTYPES.COMMUNITY], "Please select a valid role")
        .required("Please select your role"),
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