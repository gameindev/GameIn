import { API_PATHS } from "./endpoints";
import { formatDate } from "../../utils/helpers";

export const createUser = async (formData, post) => {
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
  };

  try {
    const { data } = await post(API_PATHS.USERS.CREATE, apiBody, headers);
    return { userData: data, error: null };
  } catch (err) {
    return { userData: null, error: err?.message || "Something went wrong" };
  }
};
