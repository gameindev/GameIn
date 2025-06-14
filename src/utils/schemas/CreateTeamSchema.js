import * as Yup from "yup";

export const generalInfoSchema = Yup.object().shape({
  displayName: Yup.string()
    .required("Display Name is required")
    .max(50, "Display Name must be at most 50 characters"),
  website: Yup.string()
    .url("Website must be a valid URL")
    .required("Display Name is required"),
  bio: Yup.string()
    .max(300, "Bio must be at most 300 characters")
    .notRequired(),
});
