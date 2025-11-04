import * as yup from "yup";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";

export const stepTwoValidationSchema = yup.object().shape({
    role: yup.string()
        .oneOf([USERTYPES.CREATOR, USERTYPES.BRAND, USERTYPES.COMMUNITY], "Please select a valid role")
        .required("Please choose your role"),
});