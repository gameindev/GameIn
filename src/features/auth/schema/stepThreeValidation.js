import * as yup from "yup";

export const stepThreeValidationSchema = yup.object().shape({
    captcha: yup.string().required("Please complete the captcha verification"),
});