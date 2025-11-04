import { formatDateHelper } from "../../shared/utils/helpers/formDate.helper"

export const registerUserRequestMapper = (formData) => { 
    return {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        user_type: (formData.role ? String(formData.role).toUpperCase() : "COMMUNITY"),
        date_of_birth: formatDateHelper(formData.dob),
        is_active: true,
    }
}