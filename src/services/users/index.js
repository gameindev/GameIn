import useApi from "../../hooks/useApi";
import { API_PATHS } from "../endpoints";

function formatDate(dobStr) {
    if (!dobStr) return "";
    const [year, month, day] = dobStr.split("-");
    return `${day}-${month}-${year}`;
}

export const CreateUser = (formData) => {
    const { post, error } = useApi();
    const apiBody = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        userType: formData.role?.toUpperCase() || "USER",
        dateOfBirth: formatDate(formData.dob),
        isActive: true,
        isVerified: false,
    };

    const headers = {
        "Content-Type": "application/json",
        "X-Captcha-Token": formData.captcha || "",
    }

    const { data } = post(API_PATHS.USERS.CREATE, apiBody, headers)


    return { data, error }

}